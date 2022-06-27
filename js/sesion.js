//*********************************************************************************************************************************
//************************************************* REGISTRO Y LOGEO DE USUARIOS **************************************************
//*********************************************************************************************************************************
const linkSesion = document.getElementById("sesion");

const usuarios = []; //genera el array usuarios
class Usuario{ //genera la clase constructora de objetos usuario
    constructor(nombreUsuario,passUsuario){
        this.nombreUsuario = nombreUsuario;
        this.passUsuario = passUsuario;
    }
}

//REGISTRARSE ----------------------------------------------------------------------------------
const formRegistro = document.getElementById("formRegistro");
const nombreRegistro = document.getElementById("nombreRegistro");
const passRegistro = document.getElementById("passRegistro");
const inputRegistro = document.getElementById("inputRegistro");
let newUser = "";
let newPass = "";

let registrarse = () => { //funcion para registrarse
    newUser = nombreRegistro.value; //tomo el valor del input nombreRegistro y lo guardo en la variable
    newPass = passRegistro.value; //tomo el valor del input passRegistro y lo guardo en la variable
    const user = new Usuario(newUser,newPass); //creo un objeto usuario y le meto como parametros las variables newUser y newPass    
    usuarios.push(user); //meto el objeto usuario en el array usuarios.
}

formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    registrarse();
    localStorage.setItem('nombreRegistro', nombreRegistro.value);
})

//INICIAR SESION -------------------------------------------------------------------------------

const formInicioSesion = document.getElementById("formInicioSesion");
const cuentaUsuario = document.getElementById("nombreInicioSesion");
const cuentaPassword = document.getElementById("passInicioSesion");
const inputInicioSesion = document.getElementById("inputInicioSesion");

let btnLogIn = document.getElementById("inputInicioSesion");
let ingresoUser = "";
let ingresoPass = "";

let inicioSesion = () => {//FUNCION PARA INICIAR SESION
    ingresoUser = cuentaUsuario.value; //se ingresa el nombreUser
    ingresoPass = cuentaPassword.value;
    let index = -1; //establezco let en -1

    usuarios.forEach((el, i) => {                                                //recorro cada elemento del array usuarios, y en cada uno,
        if (el.nombreUsuario === ingresoUser && el.passUsuario === ingresoPass){ //comparo los valores nombreUsuario y passUsuario con los datos ingresados
            index = i                                                            //si ambos coinciden, le doy al index el valor del indice de ese objeto
            alert(`Bienvenido ${el.nombreUsuario}`)
            sesion.innerHTML = `${(usuarios[i].nombreUsuario).toUpperCase()}`;
        }
    });     
}

formInicioSesion.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('nombreUsuario', cuentaUsuario.value);
})

//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************