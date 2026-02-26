[← Volver al README principal](/README.md)

# *Ajustes de Perfil* (`modify-profile-page.html`)

> **Acceso rápido**: [Ver código fuente del archivo]()

### Descripción detallada
La página de ***Ajustes de Perfil*** es el centro de control de la cuenta. Permite la gestión de datos personales, preferencias y seguridad. Los objetivos principales de esta página son:
- **Gestión de la Cuenta**: Proveer una interfaz clara para actualizar información sensible (email, contraseñas, teléfonos).
- **Renderizado Dinámico**: Cargar los datos mostrados dinámicamente según el tipo de usuario autenticado (cliente estándar o restaurante).

---

### Vista Previa y Composición

| Sin seleccionar fecha                     | Tras seleccionar fecha                    |
|:------------------------------------------|:------------------------------------------|
| ![](/doc/images/pages/edit-profile-1.jpg) | ![](/doc/images/pages/edit-profile-2.jpg) |
<sub>*Izquierda: Vista para un Usuario Cliente. Derecha: Vista para un Restaurante Afiliado.*</sub>

---

### Templates Implementados
Para construir esta vista, se han ensamblado los siguientes módulos:

| Template        | Propósito en esta página                                                                                                  |
|:----------------|:--------------------------------------------------------------------------------------------------------------------------|
| `Header`        | Cabecera de la página, a partir de la cual se puede buscar un restaurante.                                                |
| `Edit Button`   | Botón junto a una propiedad que permite modificar un dato de la cuenta del usuario.                                       |
| `Edit Property` | *Template* de un registro de propiedad completa lista para ser modificada.                                                |
| `Footer`        | Pie de la página, contendrá enlaces e información de contacto, así como el enlace al formulario de registro de afiliados. |

> **Arquitectura de *Templates***: Esta página está construida utilizando *templates*. Para consultar
> el desglose técnico de cada uno de estos, consulta nuestra [Guía Detallada de Templates](/doc/templates.md).