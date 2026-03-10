[← Volver al README principal](/README.md)

# *Reservar una mesa* (`book-table-page.html`)

> **Acceso rápido**: [Ver código fuente del archivo](/src/pages/book-table-page)

### Descripción detallada
La página de ***Reservar una mesa*** es la interfaz final de la lógica de **BookEat**. Los objetivos principales de esta página son:
- **Selección de Turnos**: Mostrar una cuadrícula clara con los tramos horarios disponibles para el establecimiento.
- **Interactividad en Tiempo Real**: Visualizar dinámicamente un mensaje o el mapa de mesas actualizado según la selección de la franja horaria.
- **Asignación Espacial**: Permitir la elección de la mesa física según su capacidad directamente sobre el plano del local.

---

### 🖼️ Vista Previa y Composición

| Sin seleccionar fecha                   | Tras seleccionar fecha                  |
|:----------------------------------------|:----------------------------------------|
| ![](/doc/sprint-1/images-1/images/pages/book-table-1.jpg) | ![](/doc/sprint-1/images-1/images/pages/book-table-2.jpg) | 
  <sub>*El mapa de mesas (derecha) permanece oculto tras el mensaje instruccional hasta que se interactúa con el selector horario (izquierda).*</sub>

---

### Templates Implementados
Para construir esta vista, se han ensamblado los siguientes módulos:

| Template      | Propósito en esta página                                                                                                  |
|:--------------|:--------------------------------------------------------------------------------------------------------------------------|
| `Header`      | Cabecera y botón de retroceso integrado (`< Currently booking...`) para volver a la página del local.                     |
| `Hour Table`  | Panel contenedor que agrupa las franjas horarias disponibles.                                                             |
| `Hour Button` | Botón interactivo que representa una franja horaria específica (indica estados de disponibilidad y selección).            |
| `Table Map`   | Componente interactivo que dibuja el plano del local y muestra mesas seleccionables basadas en la hora escogida.          |
| `Footer`      | Pie de la página, contendrá enlaces e información de contacto, así como el enlace al formulario de registro de afiliados. |

> **Arquitectura de *Templates***: Esta página está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/sprint-1/templates.md).