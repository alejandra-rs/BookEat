[← Volver al README principal](/README.md)

# *Perfil del local* (`restaurant-page.html`)

> **Acceso rápido**: [Ver código fuente del archivo]()

### Descripción detallada
La página de ***Perfil del local*** es la cara pública de cada establecimiento. Su diseño está pensado para ofrecer toda la información necesaria para que el usuario tome la decisión de reservar. Los objetivos principales de esta página son:
- **Información Completa**: Mostrar detalles clave como la descripción del restaurante, servicios y una galería visual atractiva.
- **Reseñas**: Destacar la puntuación media y las opiniones de otros clientes.
- **Reservar una Mesa**: Facilitar el acceso rápido a reservar (`Book`) desde la propia información del local.

---

### Vista Previa y Composición
![Captura del perfil del restaurante](/doc/images/pages/restaurant-page.jpg)

---

### Templates Implementados
Para construir esta vista, se han ensamblado los siguientes módulos:

| Template          | Propósito en esta página                                                                                                  |
|:------------------|:--------------------------------------------------------------------------------------------------------------------------|
| `Header`          | Cabecera global con opciones de navegación.                                                                               |
| `Restaurant Info` | Resumen detallado del local. Desde él se puede pasar a reservar una mesa.                                                 |
| `User Review`     | Tarjeta detallada de la opinión de un cliente sobre el restaurante, preparada para soportar texto e imágenes.             |
| `User Score`      | Muestra la puntuación que le ha sido otorgada al restaurante.                                                             |
| `Footer`          | Pie de la página, contendrá enlaces e información de contacto, así como el enlace al formulario de registro de afiliados. |

> **Arquitectura de *Templates***: Esta página está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/templates.md).