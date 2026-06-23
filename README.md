# Sanos y Salvos - Plataforma de Gestión y Reporte de Mascotas Perdidas 🐾

![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=githubactions)
![AWS ECS](https://img.shields.io/badge/Infrastructure-AWS%20ECS%20Fargate-orange?logo=amazonaws)
![Java](https://img.shields.io/badge/Backend-Java%2017%20%2F%20Maven-red?logo=openjdk)

Este repositorio contiene la configuración de infraestructura, contenedores y pipelines de automatización para la plataforma **Sanos y Salvos**, diseñada para mitigar la problemática de la pérdida de mascotas centralizando reportes estructurados para dueños, clínicas veterinarias, refugios y municipalidades.

---

## 1. Arquitectura del Sistema e Infraestructura

El sistema está diseñado bajo una arquitectura de microservicios e implementado sobre una infraestructura productiva, escalable y tolerante a fallos en la nube de **Amazon Web Services (AWS)** utilizando servicios serverless.

### Componentes de la Aplicación
* **Frontend:** Interfaz de usuario construida en tecnología SPA (React/Angular/Vue.js) que se expone públicamente al usuario final.
* **BFF (Backend For Frontend):** Capa intermedia que gestiona y agrega los datos optimizados para el consumo del Frontend.
* **Microservicio de Gestión de Mascotas:** Encargado del registro estructurado de los animales, características físicas y almacenamiento de fotografías.
* **Microservicio de Geolocalización:** Procesa las coordenadas geográficas y ejecuta el motor algorítmico de coincidencias.

### Infraestructura en AWS (Networking & Compute)
* **AWS Virtual Private Cloud (VPC):** Segmentación lógica de la red distribuida en dos Zonas de Disponibilidad (AZs) para garantizar redundancia y alta disponibilidad.
  * **Subredes Públicas:** Alojan el balanceador de carga externo.
  * **Subredes Privadas:** Aíslan de forma segura las tareas de cómputo y las bases de datos para evitar exposición directa a internet.
* **AWS Application Load Balancer (ALB):** Actúa como API Gateway unificado. Recibe el tráfico del Frontend en puertos estándar (80/443) y enruta las peticiones de forma inteligente mediante *Target Groups* hacia el BFF o los microservicios internos.
* **AWS ECS Cluster (Fargate):** Orquestador de contenedores en modalidad *Serverless*. Se encarga de levantar y mantener la cantidad de réplicas necesarias de los microservicios sin necesidad de administrar servidores EC2 subyacentes.

---

## 2. Automatización del Pipeline (CI/CD con GitHub Actions)

El ciclo de vida del software está completamente automatizado a través de GitHub Actions mediante el workflow localizado en `.github/workflows/deploy.yml`. Cada interacción o integración en la rama principal (`main`) gatilla el flujo automático dividiéndose en dos etapas principales (*Jobs*):

### Flujo de Trabajo (Jobs)
1. **Integración Continua (CI) & Calidad (`test-and-validate`):**
   * Realiza el checkout de código.
   * Configura el entorno virtual con JDK 17 (Temurin) optimizado mediante caché de Maven.
   * Ejecuta de forma automática las **Pruebas Unitarias** (`mvn test`) garantizando que no se libere código defectuoso y validando el umbral de cobertura requerido.
2. **Despliegue Continuo (CD) en AWS (`build-and-deploy`):**
   * Se ejecuta únicamente si la etapa de CI finaliza con éxito (`needs: test-and-validate`).
   * Autentica el pipeline en AWS de manera temporal haciendo uso de credenciales/tokens de sesión del entorno del laboratorio.
   * Inicia sesión en **Amazon ECR (Elastic Container Registry)**.
   * Compila y empaqueta la solución utilizando `Docker Buildx` con estrategias avanzadas de caché distribuida (`type=gha`), reduciendo los tiempos de compilación de 6 a 1.5 minutos.
   * Sube la imagen dockerizada al repositorio ECR correspondiente etiquetada con el SHA del commit de Git.
   * Actualiza la **Definición de Tarea (Task Definition)** e instruye al clúster de AWS ECS para realizar un despliegue controlado.

### Estrategia de Liberación (Rolling Update)
AWS ECS está configurado para mantener un mínimo de 100% de la capacidad operativa activa del servicio mientras levanta progresivamente los nuevos contenedores (hasta un 200%). El ALB monitoriza constantemente mediante *Health Checks* la salud de las nuevas réplicas; en caso de fallo (ej. errores de conexión interna o de JPA), el despliegue se detiene automáticamente y se ejecuta un *rollback* transparente sin impacto ni tiempo de inactividad para el usuario final (*Zero Downtime*).

---

## 3. Alta Disponibilidad, Escalado y Monitoreo

### Políticas de Auto Scaling
Para responder ágilmente ante picos críticos de tráfico de la comunidad (por ejemplo, ante alertas masivas por contingencias de mascotas perdidas en una comuna específica), las tareas de ECS cuentan con políticas de **Target Tracking**:
* **Umbral de Activación:** Si el uso promedio de CPU o Memoria RAM de las tareas activas supera el **70%**, el clúster aprovisiona e integra automáticamente nuevas réplicas de los contenedores.
* **Validación:** El comportamiento del escalado horizontal y la recuperación se monitorizan visualmente a través del monitoreo de métricas nativas y simulación de estrés de carga.

### Gestión de Logs y Trazabilidad
Todos los contenedores inyectan sus logs de consola de forma centralizada hacia **AWS CloudWatch Logs**. Esto facilita la auditoría operativa, análisis de excepciones y medición de tiempos de respuesta del pipeline directo desde el panel de control de AWS o mediante comandos CLI utilizando `kubectl logs` / `aws logs`.

---

## 4. Gestión de Seguridad y Configuración de Secrets

En cumplimiento con las buenas prácticas de DevSecOps, **ninguna credencial, llave de acceso o parámetro confidencial de base de datos se encuentra incrustado en el código fuente**. 

* **GitHub Secrets:** Las variables críticas de despliegue se configuran en el panel privado de *Settings -> Secrets and variables -> Actions* del repositorio:
  * `AWS_ACCESS_KEY_ID`: Identificador de la llave de acceso del entorno de AWS.
  * `AWS_SECRET_ACCESS_KEY`: Clave de acceso secreta de AWS.
  * `AWS_SESSION_TOKEN`: Token de sesión temporal proporcionado por el entorno de laboratorio académico.
  * `ECR_REPOSITORY`: Ruta del repositorio de imágenes en Amazon ECR.
* **Inyección en Tiempo de Ejecución:** El contenedor lee estas variables de entorno sensibles en un entorno cifrado al momento de levantarse en AWS, previniendo riesgos críticos de exposición pública en repositorios compartidos.

---

## 5. Instrucciones de Uso y Despliegue Local

Si deseas clonar este proyecto e iniciar el microservicio de forma local para desarrollo, sigue estos pasos:

### Prerrequisitos
* Java 17 instalado (JDK).
* Apache Maven 3.8+.
* Docker Desktop operativo.
* Git.

### Pasos para Ejecución

1. **Clonar el repositorio:**
```bash
   git clone [https://github.com/gevg14/SANOSYSALVOS_DEVOPS2.git](https://github.com/gevg14/SANOSYSALVOS_DEVOPS2.git)
   cd SANOSYSALVOS_DEVOPS2
