Apuntes adicionales:

// Almacenamiento de los datos
-Los datos de los usuarios se guardan como objetos en las cookies y las imagenes de perfil en el localStorage
-Para conocer el usuario actual y cargar su informacion se usa una cookie con el usuario actual

//Signup
-Todas las comprobaciones se realizan en tiempo real.
-Se añade un check en la carga de la imagen.
-Mensajes para usuario duplicado, email y texto incorrecto

//Login
-Mensajes diferentes para usuario no encontrado y contraseña incorrecta

//Opciones
-El boton de opcions cambia al pulsarse y cierra el menu al volverse a pulsarse
-Se añade otro boton de cierre en el desplegable

//Filtrado de experiencias
-Se reordenan  dinamicamente las experiencias filtradas para respetar el diseño
-Se añade un indicador que muestra la palabra usada para la busqueda y un boton de borrado
-La busqueda no diferencia entre mayuculas y minusculas para lograr precision
-Si al pulsar el boton el texto esta vacio de muestran de nuevo todas las experiencias

// Mi perfil
-Los cambios se producen instantaneamente y llevan asociados mensajes de confirmacion

//Mensajes
- Se muestran siempre en el centro de la pantalla hasta su cierre

// Notas para las pruebas
-La web no presenta ningun problema si se ejecuta mediante la extension liveServer de VS Code y cualquier navegador.
-Los links del mapa principal dejan de funcionar en la version local de todos los navegadores dado que no se permite 
el acceso a window.parent desde el svg por problemas de falta de dominio.