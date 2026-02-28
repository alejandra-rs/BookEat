[← Volver al README principal](/README.md)

# *Reseñas del restaurante* (`restaurant-reviews-page.html`)

> **Acceso rápido**: [Ver código fuente del archivo](/src/pages/restaurant-reviews-page)

### Descripción detallada
La página de ***Reseñas del Restaurante*** actúa como medio de comunicación entre los clientes. Está dedicada a analizar el *feedback* que estos proporcionan. Los objetivos principales de esta página son:
- **Puntuación General**: Desglosar la puntuación general para visualizar la distribución de las calificaciones.
- **Personalización de Búsqueda**: Permitir al usuario filtrar reseñas por palabras clave (*Tags*) o clasificarlas (*"Más recientes primero"*).
- **Reseñas Detalladas**: Mostrar reseñas completas con elementos visuales, pros, contras y puntuación individual.

---

### Vista Previa y Composición
![Captura de las reseñas del restaurante](/doc/images/pages/restaurant-reviews.jpg)

---

### Templates Implementados
Para construir esta vista, se han ensamblado los siguientes módulos:

| Template          | Propósito en esta página                                                                                                  |
|:------------------|:--------------------------------------------------------------------------------------------------------------------------|
| `Header`          | Cabecera global con opciones de navegación.                                                                               |
| `Restaurant Info` | Resumen del local en la parte superior para mantener el contexto.                                                         |
| `User Review`     | Tarjeta detallada de la opinión del cliente, preparada para soportar texto e imágenes.                                    |
| `User Score`      | Muestra la puntuación que le ha sido otorgada al restaurante.                                                             |
| `Footer`          | Pie de la página, contendrá enlaces e información de contacto, así como el enlace al formulario de registro de afiliados. |

> **Arquitectura de *Templates***: Esta página está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/templates.md).