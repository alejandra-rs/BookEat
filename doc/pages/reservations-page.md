[← Volver al README principal](/README.md)

# *Mis reservas* (`reservations-page.html`)

> **Acceso rápido**: [Ver código fuente del archivo]()

### Descripción detallada
La página de ***Mis reservas*** es el panel de control donde se gestiona el flujo de reservas. Los objetivos principales de esta página son:
- **Filtrado Temporal**: Utilización de un selector de rango de fechas para acotar la búsqueda de reservas.
- **Interfaz Adaptativa**: El *template* `Overview` se modifica dinámicamente y se adapta según el tipo de usuario (Cliente vs. Restaurante) y el estado de la reserva (Pasada vs. Vigente).
- **Acciones Contextuales**: Dependiendo del tipo de reserva , se habilitan botones específicos (ej. "Cancelar Reserva" vs. "Escribir Reseña").

---

### Vista Previa y Composición

|                   | Usuario Estándar                          | Usuario restaurante                       |
|:------------------|:------------------------------------------|:------------------------------------------|
| Reservas pasadas  | ![](/doc/images/pages/reservations-1.jpg) | ![](/doc/images/pages/reservations-3.jpg) |
| Reservas vigentes | ![](/doc/images/pages/reservations-2.jpg) | ![](/doc/images/pages/reservations-4.jpg) |

<sub>*El layout del listado cambia según el tipo de usuario y el estado de las reservas.*</sub>

---

### Templates Implementados
Para construir esta vista, se han ensamblado los siguientes módulos:

| Template              | Propósito en esta página                                                                                                         |
|:----------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| `Header`              | Cabecera del sistema que mantiene activa la barra de búsqueda y navegación.                                                      |
| `Range Date Selector` | Herramienta de calendario interactiva para establecer una fecha de inicio y de fin en la consulta de reservas.                   |
| `Overview`            | Contenedor dinámico principal. Muestra tarjetas con datos de restaurantes (si eres cliente) o datos de clientes (si eres local). |
| `Footer`              | Pie de la página, contendrá enlaces e información de contacto, así como el enlace al formulario de registro de afiliados.        |

> **Arquitectura de *Templates***: Esta página está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/templates.md).