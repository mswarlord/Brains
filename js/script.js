//BRAINS -- Proyecto
//CREACION DE LAS FICHAS Y SUS ESTADOS*********************************************************************************************
/* 
const ficha = [];
class Ficha{//Se crea la clase Ficha donde se establece la posicion inicial y los metodos para cambiar la posicion de las mismas
    constructor(id) {
        this.id = id;
        this.posicion = 1;//inicia las fichas en una posicion determinada
    }
    
    girarIzquierda() {//Método para girar la ficha en sentido antihorario
        if(this.posicion===1){ 
            this.posicion=4;
        }else{
            this.posicion--
        }
        console.log(`Ha girado la ficha ${this.id} en sentido antihorario`);
    }

    girarDerecha() {//Método para girar la ficha en sentido horario
        if(this.posicion===4){ 
            this.posicion=1;
        }else{
            this.posicion++
        }
        console.log(`Ha girado la ficha ${this.id} en sentido horario`);
    }
}

  for(i=0;i<7;i++){ //iteración para la creación de las fichas
    ficha[i]=new Ficha(i);
}

let girarFichaNro = 0; //variable que determina la ficha a girar

let sentidoGiro;//variable que determina el sentido de giro

let girar = (prompt("Ingrese 'N' si desea finalizar")).toUpperCase();//variable que determina si se debe girar o no una ficha
while (girar !="N"){

    do{
        girarFichaNro = Number(prompt("Elija el numero de la ficha que desea mover del 0 al 6"));//Se determina la ficha a girar
    }while(girarFichaNro < 0 || girarFichaNro > 6 )//Se valida que sea una ficha existente (cambiar esta parte del código para que se determine el numero acorde el minimo y maximo indice del array ficha)
    
    do{
        sentidoGiro = (prompt(`inserte "D" para girar para la derecha o "I" para girar a la izquierda`)).toUpperCase();//Consulta sentido de giro de la ficha
    }while(sentidoGiro != "D" && sentidoGiro != "I");//se valida la entrada del usuario - esto es innecesario ya que se hará por medio de un botón    
    
    if(sentidoGiro == "D"){
        ficha[girarFichaNro].girarDerecha();//llamo al metodo que gira la ficha en sentido horario
        }else{
        ficha[girarFichaNro].girarIzquierda()//llamo al metodo que gira la ficha en sentido antihorario
    }
    
    girar = (prompt("Ingrese 'N' si desea finalizar")).toUpperCase();//consulto si se quiere mover otra ficha
}

for(const nroFicha of ficha) {//Recorre los elementos del array ficha.
    console.log(nroFicha); //Muestra los atributos y sus valores de los elementos del array.
} */

//DOM
let sesion = document.querySelector('#sesion');

//REGISTRO Y LOGEO DE USUARIOS ******************************************************************************************************

const usuarios = []; 
class Usuario{
    constructor(nombreUsuario,passUsuario){
        this.nombreUsuario = nombreUsuario;
        this.passUsuario = passUsuario;
        this.online = false;
    }

    iniciarSesion() {
        if(this.online===false){ 
            this.online=true;
        }
        alert(`Bienvenido ${this.nombreUsuario}`);
    }
    cerrarSesion() {
        if(this.online===true){ 
            this.online=false;
        }
        alert(`Adios ${this.nombreUsuario}!`);
    }
    
}

//registros desde codigo Hardcode
usuarios[0]=new Usuario("Mati","mati123"); //creo un elemento en el array usuarios
usuarios[1]=new Usuario("Rodri","Ro123");
usuarios[2]=new Usuario("Lucio","Lu123");
usuarios.push(new Usuario("German","Gerco123")); //creo otro elemento con push

//console.log(usuarios);//muestro el array usuarios.

//registro ingresado por usuario
let newUser = prompt("REGISTRO: Ingrese su nombre de usuario"); //tomo el nombre de usuario que registra el usuario y lo guardo en la variable

let newPass = prompt("REGISTRO: Ingrese su contraseña"); //tomo la pass que registra el usuario y la guardo en la variable

const user = new Usuario(newUser,newPass); //creo un objeto usuario y le meto como parametros las variables newUser y newPass    

usuarios.push(user); //meto el objeto usuario en el array usuarios.

//console.log(usuarios);//muestro el array usuarios.

//Inicio de sesion
let ingresoUser = prompt("Ingreso: Ingrese su nombre de usuario"); //se ingresa el nombreUser
let ingresoPass = prompt("Ingreso: Ingrese su contraseña")

let index = -1; //establezco let en -1

usuarios.forEach((el, i) => {                                                //recorro cada elemento del array usuarios, y en cada uno,
    if (el.nombreUsuario === ingresoUser && el.passUsuario === ingresoPass){ //comparo los valores nombreUsuario y passUsuario con los datos ingresados
        index = i                                                            //si ambos coinciden, le doy al index el valor del indice de ese objeto
        usuarios[i].iniciarSesion();
        sesion.innerText = el.nombreUsuario;//modifico el link de iniciar sesion con el nombre del usuario que ya ingresó
    }
});

