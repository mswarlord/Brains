//*********************************************************************************************************************************
//************************************************* REGISTRO Y LOGEO DE USUARIOS **************************************************
//*********************************************************************************************************************************
const cuenta = document.getElementById("cuenta"); //toma la etiqueta con ID cuenta y lo guarda en la variable cuenta. 

const usuarios = []; //genera el array usuarios
class Usuario{ //genera la clase constructora de objetos usuario
    constructor(nombreUsuario,passUsuario){
        this.nombreUsuario = nombreUsuario;
        this.passUsuario = passUsuario;
    }
}

//REGISTRARSE ----------------------------------------------------------------------------------------------------------------------
//VARIABLE DOM
const formRegistro = document.getElementById("formRegistro"); //guarda la etiqueta del formulario de registro
const nombreRegistro = document.getElementById("nombreRegistro"); //guarda la etiqueta para el nombre de usuario al registrarse
const passRegistro = document.getElementById("passRegistro"); //guarda la etiqueta para la contraseña que se registra
const inputRegistro = document.getElementById("inputRegistro"); //guarda la etiqueta del boton con el evento para registrarse

let newUser = ""; //variable que va a tomar el nombre ingresado por el usuario al registrarse
let newPass = ""; //variable que va a tomar la contraseña ingresada por el usuario al registrarse

//FUNCIONES
let registrarse = () => { //funcion para registrar un usuario
    newUser = nombreRegistro.value; //toma el valor del input nombreRegistro y lo guarda en la variable
    newPass = passRegistro.value; //toma el valor del input passRegistro y lo guarda en la variable
    const user = new Usuario(newUser,newPass); //crea un objeto usuaria y le mete como parametros las variables newUser y newPass    
    usuarios.push(user); //mete el objeto usuario en el array usuarios.
}

//EVENTOS
formRegistro.addEventListener('submit', (e) => { //Evento para ejecutar la funcion para registrar un usuario
    e.preventDefault(); //evento para que no se recargue la pagina
    registrarse(); //lama a la funcion registrarse
})

//INICIAR SESION -------------------------------------------------------------------------------------------------------------------
//VARIABLES DOM
const formInicioSesion = document.getElementById('formInicioSesion'); //guarda en la variable la etiqueta con ID formInicioSesion
const nombreInicioSesion = document.getElementById('nombreInicioSesion'); //guarda en la variable la etiqueta con ID nombreInicioSesion
const cuentaPassword = document.getElementById('passInicioSesion'); //guarda en la variable la etiqueta con ID passInicioSesion
const inputInicioSesion = document.getElementById('inputInicioSesion'); //guarda en la variable la etiqueta con ID inputInicioSesion
const btnLogIn = document.getElementById('inputInicioSesion'); //guarda en la variable la etiqueta con ID inputInicioSesion
let ingresoUser = localStorage.getItem('nombreUsuario'); //guarda en la variable el valor guardado en localStorage de la key ingresoUser.
let ingresoPass = localStorage.getItem('passUsuario'); //guarda en la variable el valor guardado en localStorage de key ingresoPass.

//FUNCIONES
let inicioSesion = () => {//FUNCION PARA INICIAR SESION

    ingresoUser = nombreInicioSesion.value; //guarda en la variable, el valor de la etiqueta nombreInicioSesion. 
    ingresoPass = cuentaPassword.value; //guarda en la variable, el valor de la etiqueta cuentaPassword. 

    usuarios.forEach((el, i) => {                                                //recorre cada elemento del array usuarios, y en cada uno,
        let index = -1; //establece index en -1                                   
        if (el.nombreUsuario === ingresoUser && el.passUsuario === ingresoPass){ //compara los valores nombreUsuario y passUsuario con los datos ingresados
            index = i                                                            //si ambos coinciden, le da al index el valor del indice de ese objeto
            cuenta.innerHTML = `${(usuarios[i].nombreUsuario).toUpperCase()}`;
            ocultarFormularios();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Datos de usuario incorrectos',
                text: 'Corrobore que los datos ingresados corresponden a un usuario registrado',
                footer: '<a href="faq.html">¿Por qué tengo este problema?</a>'
            })
        }
    });
}

//EVENTOS
formInicioSesion.addEventListener('submit', (e) => { //Evento que llama a la funcion para iniciar sesion
    e.preventDefault(); //metodo para que no se recargue la pagina
    localStorage.setItem('nombreUsuario', nombreInicioSesion.value); //Guarda en storage el valor de la etiqueta que se guardo en nombreInicioSesion
    localStorage.setItem('passUsuario', cuentaPassword.value);
    inicioSesion(); //Funcion para el inicio de sesion
})

//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************

//UNA VEZ QUE EL USUARIO SE LOGUEA SE ELIMINA EL FORMULARIO DE INICIO DE SESION Y A SU VEZ 
//APARECE UN MENU CON OPCIONES E INFORMACION DE LA CUENTA DEL USUARIO.-

//VARIABLE DOM
const iniciarSesion = document.getElementById("iniciarSesion"); //guarda la etiqueta con id iniciarSesion
const contenedorCuenta = document.getElementById("contenedorCuenta"); //guarda la etiqueta con id contenedorCuenta
const nombreCuenta = document.getElementById("nombreCuenta");////guarda la etiqueta con id contenedorCuenta

//Aca voy a tratar de armar toda la seccion de la cuenta del usuario --- EN CONSTRUCCION
contenedorCuenta.style.display = "none";//oculta contenedorCuenta por defecto

//FUNCIONES
const ocultarFormularios = () => { //funcion que oculta los formularios de inicio y registro y muestra el contenedor de informacion del usuario
    iniciarSesion.style.display = "none"; //oculta la etiqueta con id iniciarSesion
    contenedorCuenta.style.display = "contents"; //muestra la etiqueta con id contenedorCuenta
    contenedorCuenta.style = "true"; //muestra los estilos de la stylesheet de la etiqueta en contenedorCuenta
    nombreCuenta.innerText = localStorage.getItem("nombreUsuario").toUpperCase();
}

/* if(!!ingresoUser && !!ingresoPass) {
    ocultarFormularios();
} */
!!ingresoUser && !!ingresoPass && ocultarFormularios();//realiza la misma operacion que lo comentado ut supra, pero usando el operador &&.

//CERRAR SESION
let btnCerrarSesion = document.getElementById('cerrarSesion');

btnCerrarSesion.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload()
})

//ALMACENAR OBJETOS CON JSON

const persona = { //crea el objeto persona
    nombre: 'Facu',
    apellido: 'Cantero',
    edad: 33,
    usuario: "MsWarLord",
    pass: "N0t4L4m3r"
};

const _persona = JSON.stringify(persona)
localStorage.setItem('objeto persona', _persona);

const _personaParsed = JSON.parse(localStorage.getItem('objeto persona'));
console.log(_personaParsed);