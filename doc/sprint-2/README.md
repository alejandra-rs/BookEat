# *BookEat* - Sprint 2
**Subgrupo 42.2:** José Marcial Galván, Alejandra Rodríguez, Cristina Santana

> ***BookEat*** es una solución web ideada para el sector de la restauración, con el fin de facilitar una conexión fluida
> y eficiente entre comensales y establecimientos. Para lograrlo, el proyecto se apoya en tres ejes funcionales:
> - **Descubrimiento y Búsqueda**: Consulta detallada de perfiles de restaurantes con filtros avanzados para encontrar el lugar ideal.
> - **Gestión Inteligente de Reservas**: Control de disponibilidad de mesas en tiempo real y confirmaciones online, eliminando las esperas telefónicas.
> - **Interacción mediante Reseñas**: Sistema de reseñas que garantiza la transparencia y ayuda a mejorar la calidad del servicio.
>
> En definitiva, BookEat unifica en una sola interfaz intuitiva todas las herramientas necesarias para que el cliente disfrute de su reserva y el restaurante optimice su flujo diario de trabajo.
>
> _Para conocer más sobre el proyecto, consulta la [documentación del sprint 1](doc/sprint-1/README.md) y la [documentación del sprint 2](doc/sprint-2/README.md)_

En este tercer _sprint_, **BookEat** ha sido reimplementada para utilizar tecnologías más profesionales. Concretamente,
se ha migrado la aplicación a **Angular** en el _frontend_, y a **Firebase** en el _backend_.

---

## Migración a Angular

En esta primera parte del _sprint_, se ha adaptado la web implementada en _sprints_ anteriores usando **Angular** como
_framework_ para desarrollo web.

### Servicios
La interacción entre componentes de Angular y el backend se ha realizado, siguiendo las buenas prácticas de Angular, a
través de modelos y servicios.
<br>
Los modelos, ubicados en la carpeta [`models/`](bookeat/src/app/models), componen una interfaz común sobre la que interactúan
tanto servicios como componentes. En estos, se definen las entidades utilizadas por la aplicación así como los campos que
contienen.
<br>
Los modelos son utilizados por los servicios, ubicados en la carpeta [`services/`](bookeat/src/app/services). De esta forma,
los servicios pueden gestionar la lógica de acceso a los datos de forma centralizada, y siguiendo la interfaz definida por los
modelos.
<br>
A continuación, se incluyen los servicios implementados así como los modelos asociados (haga clic en el nombre de un fichero para
acceder a su definición):

| Servicio | Modelo | Descripción |
|:---------|:------:|:------------|
|          |        |             |



### Formularios Nativos

(...)

### Integración con Bootstrap

Para simplificar la aplicación de estilos a los componentes de la web, se han utilizado clases e iconos de Bootstrap. De
esta forma, se han reducido considerablemente los ficheros CSS. Se han mantenido únicamente las directivas específicas de
esta aplicación, como pueden ser las variables de los distintos colores utilizados.
<br>
También se ha mantenido (y reducido) el fichero genérico styles.css, pues sigue permitiendo una simplificación de los estilos
individuales de cada componente.

---

## Backend con Firebase

Tras migrar el frontend a Angular, la siguiente etapa de este _sprint_ ha consistido en modificar los servicios, ya implementados
con JSON Server, para pasar a utilizar Firebase.

Para ello, en primer lugar se definió el proyecto de Firebase _bookeat-pwm_ gracias a la herramienta de angular
`ng add @angular/fire`. Se añadió Firestore y Storage al proyecto, y se almacenaron las claves del proyecto creado en el
directorio [`environments/`](bookeat/src/environments). Una vez inicializado el proyecto, se ha procedido con la reimplementación
de los servicios utilizando Firebase. Para ello se han tenido en cuenta una serie de elementos, como la autenticación de
usuarios, la subida de imágenes o la propia carga de datos desde esta plataforma.

### Gestión de Usuarios
(...)

### Carga de Datos desde Firebase
(...)

### Subida de Imágenes
(...)

## Tech Stack - Otros
- Se debe usar `npm install` para instalar las dependencias de la aplicación (_Bootstrap_, _FlatPickr_, _JsonServer_, _Panzoom_ y _Proj4_).

<br>
<div style="display: flex; justify-content: center">
    <div style="display: inline-block; padding: 10px; border-radius: 20px; ">
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg" alt="trello"/></a>
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"  alt="figma"/></a>
        <a href="https://skillicons.dev"><img width="100" src="https://skillicons.dev/icons?i=github"  alt="github"/></a>
        <a href="https://github.com/devicons/devicon/"><img width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"  alt="html5"/></a>
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"  alt="css3"/></a>
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="javascript"/></a>
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" alt="bootstrap"/></a>
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg" alt="JSON"/></a>
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" alt="Angular"/></a>
        <a href="https://github.com/devicons/devicon/"><img width=100 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" alt="Firebase"/></a>
   </div>
</div>
<br>