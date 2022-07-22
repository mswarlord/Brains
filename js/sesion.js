//*********************************************************************************************************************************
//************************************************* REGISTRO Y LOGEO DE USUARIOS **************************************************
//*********************************************************************************************************************************

//DOM
const cuenta = document.getElementById("cuenta"); //toma la etiqueta con ID cuenta y lo guarda en la variable cuenta. 
const formRegistro = document.getElementById("formRegistro"); //guarda la etiqueta del formulario de registro
const nombreRegistro = document.getElementById("nombreRegistro"); //guarda el input para el nombre de usuario al registrarse
const passRegistro = document.getElementById("passRegistro"); //guarda el pinput para la contraseña que se registra
const formInicioSesion = document.getElementById('formInicioSesion'); //guarda en la variable la etiqueta con ID formInicioSesion
const nombreInicioSesion = document.getElementById('nombreInicioSesion'); //guarda en la variable la etiqueta con ID nombreInicioSesion
const cuentaPassword = document.getElementById('passInicioSesion'); //guarda en la variable la etiqueta con ID passInicioSesion
const iniciarSesion = document.getElementById("iniciarSesion"); //guarda la etiqueta con id iniciarSesion
const contenedorCuenta = document.getElementById("contenedorCuenta"); //guarda la etiqueta con id contenedorCuenta
const nombreCuenta = document.getElementById("nombreCuenta");////guarda la etiqueta con id contenedorCuenta
const btnCerrarSesion = document.getElementById('cerrarSesion');
const inputInicioSesion = document.getElementById('inputInicioSesion');

//VARIABLES
let inicioExitoso = false; //indica si el intento de inicio de sesión fue fallido o no.
let inicioError = 0; //contador de intentos fallidos de sesión.
const usuarios = []; //genera el array usuarios.
let timer = 0; //contador que reinicia el intervalo de los intentos de inicio de sesion.
let newUser = ""; //variable que va a tomar el nombre ingresado por el usuario al registrarse.
let newPass = ""; //variable que va a tomar la contraseña ingresada por el usuario al registrarse.
let usuariosRegistrados; //guarda el array con los usuarios guardados en localStore
let ingresoUser = localStorage.getItem('nombreUsuario'); //guarda en la variable el valor guardado en localStorage de la key ingresoUser.
let ingresoPass = localStorage.getItem('passUsuario'); //guarda en la variable el valor guardado en localStorage de key ingresoPass.

class Usuario{ //genera la clase constructora de objetos usuario
    constructor(nombreUsuario,passUsuario){
        this.nombreUsuario = nombreUsuario;
        this.passUsuario = passUsuario;
    }
}

//REGISTRARSE ----------------------------------------------------------------------------------------------------------------------
//LO QUE ME COSTÓ PENSAR ESTOOOOOOOOOOOOO!
if(!!JSON.parse(localStorage.getItem("Usuarios"))){  //itera cada elemento de los usuarios guardados en localStorage
    for(e of JSON.parse(localStorage.getItem("Usuarios"))){ //toma los datos de usuarios ya registrados, y previamente guardados en storage 
        usuarios.push(e) //y los pushea en la variable usuarios iniciando la variable cada vez que se actualiza con los usuarios ya registrados!
    }
}

//FUNCIONES
let registrarse = () => { //funcion para registrar un usuario
    newUser = nombreRegistro.value; //toma el valor del input nombreRegistro y lo guarda en la variable
    newPass = passRegistro.value; //toma el valor del input passRegistro y lo guarda en la variable
    const user = new Usuario(newUser,newPass); //crea un objeto usuario y le mete como parametros las variables newUser y newPass    
    usuarios.push(user); //mete el objeto usuario en el array usuarios.
    localStorage.setItem("Usuarios",JSON.stringify(usuarios)); //guarda en la variable el valor guardado en localStorage de la key ingresoUser.
}

//EVENTOS
formRegistro.addEventListener('submit', (e) => { //Evento para ejecutar la funcion que registra al usuario
    e.preventDefault(); //evento para que no se recargue la pagina
    if (!!nombreRegistro.value && !!passRegistro.value){ //si existe usuario y contraseña...
        localStorage.setItem('usuarioRegistrado', nombreRegistro.value); //Guarda en storage el valor de la etiqueta que se guardo en nombreInicioSesion
        localStorage.setItem('passUsuarioRegistrado', passRegistro.value);
        registrarse(); //...llama a la funcion registrarse
    }
}) 

//INICIAR SESION -------------------------------------------------------------------------------------------------------------------
//FUNCIONES
let inicioSesion = () => {//FUNCION PARA INICIAR SESION

    ingresoUser = nombreInicioSesion.value; //guarda en la variable, el valor de la etiqueta nombreInicioSesion. 
    ingresoPass = cuentaPassword.value; //guarda en la variable, el valor de la etiqueta cuentaPassword. 

    usuarios.forEach((el, i) => {                                                //recorre cada elemento del array usuarios, y en cada uno,
        let index = -1; //establece index en -1                                   
        if(el.nombreUsuario === ingresoUser && el.passUsuario === ingresoPass){ //compara los valores nombreUsuario y passUsuario con los datos ingresados
            index = i                                                            //si ambos coinciden, le da al index el valor del indice de ese objeto
            cuenta.innerHTML = `${(usuarios[i].nombreUsuario).toUpperCase()}`; //modifica el titulo en el navegador
            inicioExitoso = true; 
            inicioError = 0;
            ocultarFormularios();
        }
    });

    if(!inicioExitoso){ //ingresa si el inicio de sesion fue erróneo
        inicioError++; //aumenta en uno los intentos fallidos
        if(inicioError === 3){ //si hubo 3 intentos fallidos ingresa
            let contador = setInterval( //activa una funcion a intervalos de 1 segundo
                function() {
                    timer++; //suma 1 al timer
                    inputInicioSesion.disabled = true;  //desabilita el boton de inicio
                    if (timer >= 30){ // si el timer llega a 30 segundos ingresa
                        clearInterval(contador); //corta el intervalo
                        timer = 0; //reinicio el timer
                        inicioError = 0; //reinicia los intentos fallidos
                        inputInicioSesion.disabled = false; //habilita el boton de inicio
                    }
                },1000)
        }

            Swal.fire({
            icon: 'error',
            title: 'Datos de usuario incorrectos',
            text: `Corrobore los datos ingresados. ${3 - inicioError} intento/s restante/s`,
        })
    }
}

//FUNCION INICIO DE SESION
formInicioSesion.addEventListener('submit', (e) => { //Evento que llama a la funcion para iniciar sesion
    e.preventDefault(); //metodo para que no se recargue la pagina
    localStorage.setItem('nombreUsuario', nombreInicioSesion.value); //Guarda en storage el valor de la etiqueta que se guardo en nombreInicioSesion
    localStorage.setItem('passUsuario', cuentaPassword.value);
    usuariosRegistrados = JSON.parse(localStorage.getItem("Usuarios"));
    inicioSesion(); //Funcion para el inicio de sesion
})

//*************************************************************************************************************************
//********************************************************** CUENTA USUARIO ***********************************************
//*************************************************************************************************************************

contenedorCuenta.style.display = "none";//oculta contenedorCuenta por defecto

//FUNCION OCULTAR FORMULARIO
const ocultarFormularios = () => { //funcion que oculta los formularios de inicio y registro y muestra el contenedor de informacion del usuario
    iniciarSesion.style.display = "none"; //oculta la etiqueta con id iniciarSesion
    contenedorCuenta.style.display = "contents"; //muestra la etiqueta con id contenedorCuenta
    contenedorCuenta.style = "true"; //muestra los estilos de la stylesheet de la etiqueta en contenedorCuenta
    nombreCuenta.innerText = localStorage.getItem("nombreUsuario").toUpperCase();
}

!!ingresoUser && !!ingresoPass && ocultarFormularios();//llama a la funcion ocultarFormularios si ambas condiciones existen.

//FUNCION CERRAR SESION
btnCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem("nombreUsuario"); //elimina el usuario logeado en local store
    localStorage.removeItem("passUsuario"); //elimina el pass logeado en local store
    window.location.reload(); //actualiza la pagina para cerrar la sesion
})
