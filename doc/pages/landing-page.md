[← Volver al README principal](/README.md)

# *Landing Page* (`index.html`)

> **Acceso rápido**: [Ver código fuente del archivo]()

### Descripción detallada
La ***Landing Page***, primera página accesible al entrar en el sitio, funciona como eje central. Su diseño permite 
al usuario explorar libremente y de forma sencilla. Los objetivos principales de esta página son:
- **Acceso Rápido**: Facilitar el acceso a la barra de búsqueda para mantener al máximo número de usuarios.
- **Descubrimiento**: Exponer una selección de restaurantes destacados para incentivar la exploración.

---

### ️ Vista Previa y Composición
![Captura de la landing page](/doc/images/pages/index.jpg)

---

### Templates Implementados
Para construir esta vista, se han ensamblado los siguientes módulos:

| Template              | Propósito en esta página                                                                                                  |
|:----------------------|:--------------------------------------------------------------------------------------------------------------------------|
| `Header`              | Cabecera de la página, a partir de la cual se puede buscar un restaurante.                                                |
| `Restaurant Carousel` | Muestra una serie de restaurantes seleccionados para ser ubicados en la página principal según distintos criterios.       |
| `Restaurant Item`     | *Template* dentro de un carrousel. Representa a un restaurante, con su información esencial.                              |
| `User Score`          | Para cada restaurante, muestra la puntuación media que le ha sido otorgada.                                               |
| `Footer`              | Pie de la página, contendrá enlaces e información de contacto, así como el enlace al formulario de registro de afiliados. |

> **Arquitectura de *Templates***: Esta página está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/templates.md).