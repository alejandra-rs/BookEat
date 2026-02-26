# *BookEat* - Sprint 1
**Subgrupo 42.2:** José Marcial Galván, Alejandra Rodríguez, Cristina Santana

> ***BookEat*** es una solución web ideada para el sector de la restauración, con el fin de facilitar una conexión fluida
> y eficiente entre comensales y establecimientos. Para lograrlo, el proyecto se apoya en tres ejes funcionales:
> - **Descubrimiento y Búsqueda**: Consulta detallada de perfiles de restaurantes con filtros avanzados para encontrar el lugar ideal.
> - **Gestión Inteligente de Reservas**: Control de disponibilidad de mesas en tiempo real y confirmaciones online, eliminando las esperas telefónicas.
> - **Interacción mediante Reseñas**: Sistema de reseñas que garantiza la transparencia y ayuda a mejorar la calidad del servicio.
> 
> En definitiva, BookEat unifica en una sola interfaz intuitiva todas las herramientas necesarias para que el cliente disfrute de su reserva y el restaurante optimice su flujo diario de trabajo.

---

## Funcionalidad del proyecto - Requisitos

Hay 3 tipos de usuarios, temporal, registrado y restaurante. Usuario temporal es el base, al que se le añaden
funcionalidades en los usuarios registrados y restaurante:

### Usuario Temporal (Vista Pública)
- **Consulta de catálogo**: Acceso completo a la información del restaurante (carta, imágenes...).
- **Transparencia**: Lectura de valoraciones de otros clientes.
- **Estado en tiempo real**: Visualización en tiempo real de la ocupación de los establecimientos.

### Usuario Registrado
- **Reserva de mesas**: Selección de mesa específica y gestión de fechas.
- **Registro personal**: Histórico con reservas pendientes y pasadas.
- **Sistema de Feedback**: Capacidad para crear reseñas y puntuar los servicios.

### Usuario Restaurante
- **Estimación de afluencia**: Herramientas para el control de flujo de clientes.
- **Gestión de reseñas**: Panel para consultar, responder y analizar el *feedback* de los comensales.

> Para más información acerca de la funcionalidad y el alcance del proyecto, así como la lista completa de requisitos,
> consulta nuestro [Documento de Requisitos](/doc/BookEat_Requisitos.pdf).

---

## Diseño
### Mockups
Hemos desarrollado un prototipo que simula la navegación real de la aplicación, desde la búsqueda inicial 
hasta la confirmación de la mesa, pasando por la gestión del restaurante.<br></br>
[![Pagina principal Figma](/doc/images/figma.png)](https://www.figma.com/proto/Ele6klzfFfdvQzFIwlkU7Q/Trabajo-de-PWM?node-id=95-1205&t=bd29kPqtCef37EQB-1)
<sub>*[Acceder al Prototipo Interactivo en Figma ↑](https://www.figma.com/proto/Ele6klzfFfdvQzFIwlkU7Q/Trabajo-de-PWM?node-id=95-1205&t=bd29kPqtCef37EQB-1)*</sub>

### Storyboard
Representación visual del flujo de uso de la aplicación, desde la necesidad del cliente hasta su resolución.

|                     Usuario Temporal                     |                      Usuario Registrado                      |                      Usuario Restaurante                       |
|:--------------------------------------------------------:|:------------------------------------------------------------:|:--------------------------------------------------------------:|
| ![Temporal](/doc/images/storyboard/usuario_temporal.png) | ![Registrado](/doc/images/storyboard/usuario_registrado.png) | ![Restaurante](/doc/images/storyboard/usuario_restaurante.png) |

<sub>*[Acceder al storyboard ↑](/doc/images/storyboard)*</sub>

---

## Estructura del proyecto

```bash
├── src                             # Recursos estáticos: iconos, imágenes
│   ├── assets
│   │   ├── icons
│   │   └── img 
│   ├── templates                   # Templates, componentes reutilizables
│   │   ├── template1
│   │   │   ├── template1.html      # Estructura del template
│   │   │   ├── template1.css       # Estilos específicos
│   │   │   └── template1.js        # Animaciones, carga dinámica incluida en el módulo
│   │   └── ...
│   ├── pages                       # Páginas, vistas completas
│   ├── css                         # Estilos globales
│   └── js                          # Lógica JavaScript genérica
├── index.html                      # Punto de entrada a la aplicación
└── styles.css
```

- `assets/`: Repositorio de recursos estáticos. Contiene iconos en SVG (`icons/`) e imágenes (`img/`).
- `templates/`: El núcleo de la interfaz de usuario. Cada subcarpeta contiene un *template* independiente, permitiendo un desarrollo modular y desacoplado.
- `pages/`: Páginas, archivos HTML finales. Ensamblan los distintos *templates* para conformar las distintas vistas.
- `css/` y `js/`: Lógica de comportamiento y estilos que afectan a toda la aplicación

---

## Páginas e identificación de *templates*

La aplicación se compone de 8 páginas principales, construidas mediante el ensamblaje de *templates*:

- [**`index.html` (Landing Page)**](/doc/pages/landing-page.md): Puerta de acceso a **BookEat**. 
- [**`searcher-page.html` (Exploración)**](/doc/pages/searcher-page.md): Motor de búsqueda de restaurantes con distintos filtros.
- [**`restaurant-page.html` (Perfil del local)**](/doc/pages/restaurant-page.md): Vista detallada de un establecimiento, incluyendo servicios, carta y galería de imágenes.
- [**`restaurant-reviews-page.html` (Reseñas)**](/doc/pages/restaurant-reviews-page.md): Comunidad para compartir el *feedback* de los clientes.
- [**`book-table-page.html` (Reservar una mesa)**](/doc/pages/book-table-page.md): Interfaz para la selección de ubicación de la mesa.
- [**`reservations-page.html` (Mis reservas)**](/doc/pages/reservations-page.md): Consulta y gestión de reservas activas y pasadas.
- [**`modify-profile-page.html` (Ajustes de Perfil)**](/doc/pages/modify-profile-page.md): Gestión de datos personales, preferencias, seguridad de la cuenta.
- [**`become-an-affiliate-page.html` (Portal Afiliado)**](/doc/pages/become-an-affiliate-page.md): Página de registro y captación de nuevos restaurantes.

> **Arquitectura de *Templates***: Cada una de estas páginas está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/templates.md).

---

## Consideraciones técnicas

- **Calendarios**: Utilizamos la api de [*FlatPickr*](https://github.com/flatpickr/flatpickr) para proporcionar una selección de fechas ligera y personalizable.
- **JavaScript**: numerosos componentes usan javascript a modo de animación (ir a templates para chequear)

---

## Otros
[Icons](https://www.svgrepo.com/collection/smoothie-line-icons/2)

Para instalar los paquetes que usaremos en nuestra app debemos hacer antes un `npm install`.
