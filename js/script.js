//*********************************************************************************************************************************
//************************************************* CREACION DE LAS FICHAS Y SUS ESTADOS ******************************************
//*********************************************************************************************************************************
const fichas = []; //genera el array ficha
class Ficha{//Se crea la clase Ficha donde se establece la posicion inicial y los metodos para cambiar la posicion de las mismas
    constructor(id) {
        this.id = id;
        this.posicion = 1;//inicia las fichas en una posicion determinada
        this.seleccionada = false;
    }

    seleccionarFicha() {//metodo para indicar que la ficha esta seleccionada
        if(this.seleccionada === false){ 
            this.seleccionada = true;
        }else{
            this.seleccionada = false;
        }
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
    fichas[i]=new Ficha(i);
}

//*********************************************************************************************************************************
//**************************************************** ROTACION DE LAS FICHAS *****************************************************
//*********************************************************************************************************************************

//para girar una ficha debo seleccionarla, guardar esa ficha en una variable fichaAGirar
//luego con un boton tomar esa variable y con un evento click al mismo llame al metodo girarDerecha o girarIzquierda
//que a su vez gire la imagen de la ficha en el sentido correspondiente.

//SELECCION DE LA FICHA A GIRAR
/* 
let girarFichaNro = 0; //variable que determina la ficha a girar
let sentidoGiro;//variable que determina el sentido de giro

let fichaAGirar = document.getElementById("ficha1");

let seleccionarFicha = () => {
fichas[0].seleccionarFicha();
console.log(`seleccionaste la ficha ${fichas[0].id}`)
} 

fichaAGirar.addEventListener('click',seleccionarFicha);
 */
//let girar = (prompt("Ingrese 'N' si desea finalizar")).toUpperCase();//variable que determina si se debe girar o no una ficha
/* while (girar !="N"){

    do{
        girarFichaNro = Number(prompt("Elija el numero de la ficha que desea mover del 0 al 6"));//Se determina la ficha a girar
    }while(girarFichaNro < 0 || girarFichaNro > 6 )//Se valida que sea una ficha existente (cambiar esta parte del código para que se determine el numero acorde el minimo y maximo indice del array ficha)
    
    do{
        sentidoGiro = (prompt(`inserte "D" para girar para la derecha o "I" para girar a la izquierda`)).toUpperCase();//Consulta sentido de giro de la ficha
    }while(sentidoGiro != "D" && sentidoGiro != "I");//se valida la entrada del usuario - esto es innecesario ya que se hará por medio de un botón    
    
    if(sentidoGiro == "D"){
        fichas[girarFichaNro].girarDerecha();//llamo al metodo que gira la ficha en sentido horario
        }else{
        fichas[girarFichaNro].girarIzquierda()//llamo al metodo que gira la ficha en sentido antihorario
    }
    
    girar = (prompt("Ingrese 'N' si desea finalizar")).toUpperCase();//consulto si se quiere mover otra ficha
}

for(const nroFicha of fichas) {//Recorre los elementos del array ficha.
    console.log(nroFicha); //Muestra los atributos y sus valores de los elementos del array.
} */

//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************


//*********************************************************************************************************************************
//************************************************* CREACION DE MAPAS Y SUS ESTADOS ***********************************************
//*********************************************************************************************************************************
const mapas = []; //genera array mapas
class mapa { //genera la clase constructora de objetos mapa
    constructor(nivel, dificultad, img){
        this.nivel = nivel;
        this.dificultad = dificultad;
        this.img = img;
        this.completo = false;    //estado que indica si el mapa esta completo
        this.habilitado = false;   //estado que indica si el mapa esta habilitado para jugar
        this.seleccionado = false; //estado que indica si es el mapa que se esta jugando
    }

    completarMapa() { //metodo para indicar que el desafío ya fue completado
        this.completo = true;
    }

    habilitarMapa() { //método que indica si el desafío esta habilitado para jugarse
        this.habilitado = true;
    }

    seleccionarMapa() {//metodo que indica si es el mapa que se esta jugando
        if(this.seleccionado === false){
            this.seleccionado = true;
        }else{
        this.seleccionado = false;
        }
    }
}

for(i=0;i<50;i++){
    mapas[i]=new mapa(i,i,`assets/img/nivel${i+1}.jpg`);
}
//console.log(mapas);

//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************


//*********************************************************************************************************************************
//************************************************* REGISTRO Y LOGEO DE USUARIOS **************************************************
//*********************************************************************************************************************************
/* const linkSesion = document.getElementById("sesion");

const usuarios = []; //genera el array usuarios
class Usuario{ //genera la clase constructora de objetos usuario
    constructor(nombreUsuario,passUsuario){
        this.nombreUsuario = nombreUsuario;
        this.passUsuario = passUsuario;
    }
} */

//REGISTRARSE ----------------------------------------------------------------------------------
/* let btnSignIn = document.getElementById("btnSignIn");
let newUser = "";
let newPass = "";

let registrarse = () => {
    newUser = prompt("REGISTRARSE: Ingrese un nuevo nombre de usuario"); 
    newPass = prompt("REGISTRARSE: Ingrese una nueva contraseña");
    const user = new Usuario(newUser,newPass); //creo un objeto usuario y le meto como parametros las variables newUser y newPass    
    usuarios.push(user); //meto el objeto usuario en el array usuarios.
}

btnSignIn.addEventListener('click',registrarse);
 */
//INICIAR SESION -------------------------------------------------------------------------------
/* let btnLogIn = document.getElementById("btnLogIn");
let ingresoUser = "";
let ingresoPass = "";

let iniciarSesion = () => {
    ingresoUser = prompt("INICIAR SESION: Ingrese su nombre de usuario"); //se ingresa el nombreUser
    ingresoPass = prompt("INICIAR SESION: Ingrese su contraseña");
    let index = -1; //establezco let en -1
    
    usuarios.forEach((el, i) => {                                                //recorro cada elemento del array usuarios, y en cada uno,
        if (el.nombreUsuario === ingresoUser && el.passUsuario === ingresoPass){ //comparo los valores nombreUsuario y passUsuario con los datos ingresados
            index = i                                                            //si ambos coinciden, le doy al index el valor del indice de ese objeto
            alert(`Bienvenido ${el.nombreUsuario}`)
            sesion.innerHTML = `${(usuarios[i].nombreUsuario).toUpperCase()}`;
        }
    }); 
    
}
btnLogIn.addEventListener('click',iniciarSesion); */

//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************

//*********************************************************************************************************************************
//**************************************************** CAMBIAR MAPA ***************************************************************
//*********************************************************************************************************************************
let mapaSeleccionado = document.getElementById("mapaSeleccionado");
let btnSiguiente = document.getElementById('btnSiguiente');
let mapaActual = 1;
mapas[0].seleccionado = true;
//MAPA SIGUIENTE
let mapaSiguiente = () => {
    mapaActual++;
    mapaSeleccionado.src=`../assets/img/niveles/nivel${mapaActual}.png`;
    mapas[mapaActual-1].seleccionado = true; //indica al mapa actual como seleccionado.
    mapas[mapaActual-2].seleccionado = false; //indica al mapa anterior como no seleccionado.

}
btnSiguiente.addEventListener('click',mapaSiguiente);

//MAPA ANTERIOR
let btnAnterior = document.getElementById("btnAnterior");
let mapaAnterior = () => {
    mapaActual--;
    mapaSeleccionado.src=`../assets/img/niveles/nivel${mapaActual}.png`;
    mapas[mapaActual-1].seleccionado = true; //indica al mapa actual como seleccionado.
    mapas[mapaActual].seleccionado = false; //indica al mapa anterior como no seleccionado.
}
btnAnterior.addEventListener('click',mapaAnterior);



//*********************************************************************************************************************************
//******************************** CREACION DE LA BARRA DE NAVEGACION POR DOM E ITERACION DE ARRAY ********************************
//*********************************************************************************************************************************
//*************************************************** CODIGO CREADO DESDE HTML ****************************************************
//*********************************************************************************************************************************
/* 
let desafio = document.getElementById("desafios");//Obtiene el nodo donde se van a agregar los nuevos elementos - en este caso en un <ul>
let desafios = ["Inicio","Instrucciones","Mis Puzzles","Comprar","Iniciar Sesión"];//Array con la información a agregar

for (const desafioN of desafios) {//Itera el array con for...of
    let li = document.createElement("li");//Crea un nodo <li> en cada iteración 
    li.innerHTML = `<a href="#">${desafioN}</a>` //asigna a cada nodo el valor correspondiente al elemento de la iteración actual del array desafios
    desafio.appendChild(li); //Se inserta el nuevo nodo al padre en cada ciclo
} 
 */


//*********************************************************************************************************************************
//*********************** CREACION DE LOS CONTENEDORES CON LAS FICHAS POR DOM E ITERACION DE ARRAY ********************************
//*********************************************************************************************************************************
let divFicha = document.getElementById("fichas");//Obtiene el nodo donde se van a agregar los nuevos elementos - en este caso en un <DIV>
for (const divFichaN of fichas) {//Itera el array fichas, con for...of.
    let div = document.createElement("div");//Crea un nodo <div> en cada iteración. 
    div.id = `ficha${divFichaN.id + 1}`;//le asigno al nuevo div el ID ficha"N", donde "N" es el numero de ficha.
    div.className = `ficha`; //le asigno a cada DIV la clase ficha.
    div.innerHTML = `<img src="../assets/img/fichas/ficha${divFichaN.id +1}.png" alt="">` //asigna a cada nodo la etiqueta IMG con el valor correspondiente al elemento de la iteración actual del array fichas
    divFicha.appendChild(div); //Se inserta el nuevo nodo al padre en cada ciclo
} 

//*********************************************************************************************************************************
//************************************************************* FIN ***************************************************************
//*********************************************************************************************************************************

//*********************************************************************************************************************************
//*********************************************************** DESAFIOS ************************************************************
//*********************************************************************************************************************************
//DESAFIO 3

let slot = document.getElementById("slot1");
let slot2 = document.getElementById('slot2');
slot1.style.setProperty("left", "200px");
slot1.style.setProperty("top", "200px");
slot1.style.setProperty("color", "#fff");
/* console.log(slot1.getAttribute("style"));
slot1.innerHTML="HOLA";
slot1.appendChild(div) 
console.log(slotA); */