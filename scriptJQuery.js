//escript para gener el rfc de la persona 
$(document).ready(function() {
    $('#generar').click(function() {
        var nombre = $('input[type="nombre"]').val().trim();
        var apellidoP = $('input[type="apellidop"]').val().trim();
        var apellidoM = $('input[type="apellidom"]').val().trim();
        var fecha = $('#fecha').val();
        
        if (nombre === "" || apellidoP === "" || apellidoM === "" || fecha === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // extrae las iniciales 
        var iniciales = apellidoP.charAt(0) + apellidoM.charAt(0) + nombre.charAt(0);
        var fechaArr = fecha.split("-");
        var añio = fechaArr[0].substr(2, 2);
        var mes = fechaArr[1];
        var dia = fechaArr[2];

        // genera el formarto de rfc
        var rfc = iniciales.toUpperCase() + añio + mes + dia;
        //mandamos a imprimir el resultado a la variable 'resultado' que es una caja de texto
        $('#resultado').val(rfc);
    });
});

//script para comsumir el apiRest y obtener los datos para mostrarlos en pantalla

$(document).ready(function () {
    let usuarios = []; // Array para almacenar los usuarios obtenidos de la API
    let indice = 0; // Índice para mostrar un usuario a la vez

    $('#consultarApi').click(function () {
        if (usuarios.length === 0) {
            // Si no hemos cargado los usuarios, hacemos la petición a la API
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/users',
                method: 'GET',
                success: function (data) {
                    usuarios = data; // Guardamos los usuarios en el array
                    mostrarUsuario(); // Mostramos el primer usuario
                },
                error: function () {
                    alert('Error al consultar la API.');
                }
            });
        } else {
            // Si ya tenemos los usuarios, mostramos el siguiente
            mostrarUsuario();
        }
    });

    // Función para mostrar un usuario en los cuadros de texto
    function mostrarUsuario() {
        if (indice < usuarios.length) {
            // Obtenemos el usuario actual del array
            const usuario = usuarios[indice];
            // Mostramos el nombre y el correo en los cuadros de texto
            $('#nombre').val(usuario.name);
            $('#correo').val(usuario.email);
            // Incrementamos el índice para el siguiente clic
            indice++;
        } else {
            // Si ya mostramos todos los usuarios, reiniciamos el índice
            alert('Se han mostrado todos los usuarios.');
            indice = 0;
        }
    }
});
