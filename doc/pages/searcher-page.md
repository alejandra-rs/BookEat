[← Volver al README principal](/README.md)

# *Búsqueda de restaurantes* (`searcher-page.html`)

> **Acceso rápido**: [Ver código fuente del archivo]()

### Descripción detallada
La página de ***Búsqueda de restaurantes*** es el motor de exploración principal de la plataforma. Permite a los usuarios acotar sus opciones basándose en sus preferencias exactas. Los objetivos principales de esta página son:
- **Filtrado Avanzado**: Ofrecer herramientas precisas para refinar los resultados.
- **Visualización Clara**: Mostrar un listado limpio de los restaurantes que coinciden con la búsqueda, facilitando una rápida comparación.

---

### Vista Previa y Composición
![Captura del buscador](/doc/images/pages/searcher.jpg)

---

### Templates Implementados
Para construir esta vista, se han ensamblado los siguientes módulos:

| Template   | Propósito en esta página                                                                                                  |
|:-----------|:--------------------------------------------------------------------------------------------------------------------------|
| `Header`   | Cabecera de la página, a partir de la cual se puede buscar un restaurante.                                                |
| `Overview` | Contenedor principal que agrupa y muestra una entrada del resultado de la búsqueda.                                       |
| `Footer`   | Pie de la página, contendrá enlaces e información de contacto, así como el enlace al formulario de registro de afiliados. |

> **Arquitectura de *Templates***: Esta página está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/templates.md).