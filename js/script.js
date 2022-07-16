//*************************************************************************************************************************
//************************************************************ VARIABLES **************************************************
//*************************************************************************************************************************
let ficha = []; //array que guarda los nodos ficha.
let mapaActual = 1; //Indica cual es el mapa seleccionado.
const fichas = []; //guadrda el array de objetos ficha.
const mapas = []; //genera el array mapas.
let fichaSeleccionada; // indica la ficha seleccionada.
let fichaColocada; //indica la ficha colocada actualmente.
let slots = []; //array con los slots del DOM y sus estados.


//*************************************************************************************************************************
//*************************************************************** CLASES **************************************************
//*************************************************************************************************************************

//CLASE SLOT ***************************************************************************
class Slot{//Se crea la clase Slot que establece el elemento del DOM y su estado.
    constructor(elementoDOM) {
        this.elementoDOM = elementoDOM;
        this.ocupado = false;//inicia el slot como desocupado.
        this.oculto = false;
    }
    
    ocultarSlot() {
            this.elementoDOM.style.display = "none";
    }

    mostrarSlot() {
            this.elementoDOM.style.display = "";
    }
    
    ocuparSlot() {
        this.ocupado = true;
    }

    desocuparSlot() {
        this.ocupado = false;
    }
}

//CLASE FICHA **************************************************************************
class Ficha{//Se crea la clase Ficha donde se establece la posicion inicial y los metodos para cambiar la posicion de las mismas
    constructor(id) {
        this.id = id;
        this.posicion = 1;//inicia las fichas en una posicion determinada
        this.seleccionada = false; //indica si la ficha esta seleccionada
    }

    fichaSeleccionada() {//metodo para cambiar el estado de seleccion de la ficha y deselecciona el resto de las fichas seleccionadas
        if(this.seleccionada === false){ 
            this.seleccionada = true;
            console.log(`seleccionaste la ficha ${this.id}`);
            fichaSeleccionada = this.id;

            for(let e of fichas){ //Esta iteración deselecciona cualquier ficha que este seleccionada 
                if(e !== this){   //restringiendo al usuario que pueda seleccionar mas de una ficha
                    e.seleccionada = false;
                }
            }

        }else{
            this.seleccionada = false;
            console.log(`Deseleccionaste la ficha ${this.id}`)
            fichaSeleccionada = -1
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

//CLASE MAPA ***************************************************************************
class mapa { //genera la clase constructora de objetos mapa
    constructor(nivel, dificultad, img){
        this.nivel = nivel + 1;
        this.dificultad = dificultad;
        this.img = img;
        this.slotsDelMapa = 0;
        this.mapaCompleto = false;   //estado que indica si el mapa esta completo
        this.mapaHabilitado = false; //estado que indica si el mapa esta habilitado para jugar
        this.seleccionado = false;   //estado que indica si es el mapa que se esta jugando
    }

    completarMapa() { //metodo para indicar que el desafío ya fue completado
        this.mapaCompleto = true;
    }

    habilitarMapa() { //método que indica si el desafío esta habilitado para jugarse
        this.mapaHabilitado = true;
    }

    seleccionarMapa() {//metodo que indica si es el mapa que se esta jugando
        if(this.seleccionado === false){
            this.seleccionado = true;
        }else{
        this.seleccionado = false;
        }
    }
}

//*************************************************************************************************************************
//********************************************************FUNCIONES********************************************************
//*************************************************************************************************************************

let mostrarSlots = () => { //funcion que oculta los Slots de la zona de juego
    for(let e in slots){
        slots[e].mostrarSlot();
    }
}

let ocultarSlots = () => { //funcion que oculta los Slots de la zona de juego
    for(let e in slots){
        slots[e].ocultarSlot();
    }
}

//*********************************************************************************************************************************
//************************************************* CREACION DE LAS FICHAS Y SUS ESTADOS ******************************************
//*********************************************************************************************************************************

for(i=0;i<7;i++){ //iteración para la creación de las fichas
    fichas[i]=new Ficha(i);
}

//*********************************************************************************************************************************
//************************************************* CREACION DE MAPAS Y SUS ESTADOS ***********************************************
//*********************************************************************************************************************************

const {mapaHabilitado, mapaCompleto, slotsDelMapa} = mapas; //desestructura los atributos mas usado en mapas

for(i=0;i<50;i++){ //itera 50 veces
    mapas[i]=new mapa(i,i,`assets/img/nivel${i+1}.jpg`); //cada iteración crea un objeto mapa dentro del array mapas
    if(mapas[i].nivel < 3) { 
        mapas[i].slotsDelMapa = 1; //si el nivel del mapa es < a 3 le coloca 1 slot
    }else if(mapas[i].nivel < 11) {
        mapas[i].slotsDelMapa = 2; //si el nivel del mapa es < a 11 le coloca 2 slots
    }else if(mapas[i].nivel < 21){
        mapas[i].slotsDelMapa = 3; //si el nivel del mapa es < a 21 le coloca 3 slots
    }else if(mapas[i].nivel < 31){
        mapas[i].slotsDelMapa = 4; //si el nivel del mapa es < a 31 le coloca 4 slots
    }else if(mapas[i].nivel < 41){
        mapas[i].slotsDelMapa = 5; //si el nivel del mapa es < a 41 le coloca 5 slots
    }else{
        mapas[i].slotsDelMapa = 6; //si el nivel del mapa es >= a 41 le coloca 6 slots
    }
}

//*********************************************************************************************************************************
//**************************************** CREACION DE SLOTS PARA LOS MAPAS *******************************************************
//*********************************************************************************************************************************

/* 
    En esta seccion se buscará crear el algoritmo que genere los slots al elegir un mapa.
    La cantidad de slots dependerá del atributo slotsDelMapa del objeto mapas. 
    Luego hay que determinar que ficha va en cada slot y en que posición para que el mapa esté completo...
*/
for(i=0;i<9;i++){ //iteración para la creación de los slots
    slots[i]=new Slot(document.getElementById(`slot${+i+1}`));
}

for(e in slots){ //quita del DOM todos los slots
    slots[e].elementoDOM.style.display = "none";
} 



/* 
    EN ESTE PUNTO TENGO QUE TOMAR EL VALOR DE LA POSICION QUE TOMA LA FICHA AL MOMENTO QUE ES GIRADA
    Y LUEGO ROTAR LA IMAGEN 90° 180° O 270°. PARA ELLO TENGO QUE LLAMAR AL METODO GIRARFICHA
    Y LUEGO TOMAR EL VALOR DE DICHA POSICION.
*/

const clickSlots = () => {
    if(!!fichaSeleccionada){
        colocarFicha();
    }else if(!!slots[e].ocupado){ 
        rotarFicha();
    }
}


let imgFicha;
//corregir que ficha gira
let rotarFicha = (e,n) => {

    if(!!fichas[fichaColocada]){
        //imgFicha = document.getElementById(`imgFicha${+n}`);
        if(fichas[fichaColocada].posicion === 1){
            imgFicha.style.rotate = "90deg";
            fichas[fichaColocada].posicion = 2;
        }else if(fichas[fichaColocada].posicion === 2) {
            imgFicha.style.rotate = "180deg";
            fichas[fichaColocada].posicion = 3;
        }else if(fichas[fichaColocada].posicion === 3) {
            imgFicha.style.rotate = "270deg";
            fichas[fichaColocada].posicion = 4;
        }else if(fichas[fichaColocada].posicion === 4) {
            imgFicha.style.rotate = "0deg";
            fichas[fichaColocada].posicion = 1;
        }}
}

let colocarFicha = (e,n) => {
    if(fichaSeleccionada >= 0 && fichaSeleccionada < 7){
        switch(true){
            case fichaSeleccionada === 0:
                e.innerHTML = `<img src="../assets/img/fichas/ficha1.png" id="imgFicha1">`;
                imgFicha = document.getElementById("imgFicha1");
                fichaSeleccionada = -1;
                fichaColocada = 0;
                break;
            case fichaSeleccionada === 1:
                e.innerHTML = `<img src="../assets/img/fichas/ficha2.png" id="imgFicha2">`;
                imgFicha = document.getElementById("imgFicha2");
                fichaSeleccionada = -1;
                fichaColocada = 1;
                break;
            case fichaSeleccionada === 2:
                e.innerHTML = `<img src="../assets/img/fichas/ficha3.png" id="imgFicha3">`;
                imgFicha = document.getElementById("imgFicha3");
                fichaSeleccionada = -1;
                fichaColocada = 2;
                break;
            case fichaSeleccionada === 3:
                e.innerHTML = `<img src="../assets/img/fichas/ficha4.png" id="imgFicha4">`;
                imgFicha = document.getElementById("imgFicha4");
                fichaSeleccionada = -1;
                fichaColocada = 3;
                break;
            case fichaSeleccionada === 4:
                e.innerHTML = `<img src="../assets/img/fichas/ficha5.png" id="imgFicha5">`;
                imgFicha = document.getElementById("imgFicha5");
                fichaSeleccionada = -1;
                fichaColocada = 4;
                break;
            case fichaSeleccionada === 5:
                e.innerHTML = `<img src="../assets/img/fichas/ficha6.png" id="imgFicha6">`;
                imgFicha = document.getElementById("imgFicha6");
                fichaSeleccionada = -1;
                fichaColocada = 5;
                break;
            case fichaSeleccionada === 6:
                e.innerHTML = `<img src="../assets/img/fichas/ficha7.png" id="imgFicha7">`;
                imgFicha = document.getElementById("imgFicha7");
                fichaSeleccionada = -1;
                fichaColocada = 6;
                break;
            default:
                break;
        }
    }else{
        rotarFicha(e,n);
    }
}

for(e in slots){              //itero los elementos del array slots
    let i = e;                //crea una variable para meter en slots[i] -- creo la variable i para solucionar un error
    slots[e].elementoDOM.addEventListener('click',function() {colocarFicha(slots[i].elementoDOM,e)}); //genera en cada
    //iteración un evento click en cada slot, con la función colocar ficha y el slot que se está clickeando como parámetro.
    //ademas meto otro parámetro que por ahora no estoy usando. borrar antes de la entrega
} 

//*********************************************************************************************************************************
//**************************************************** CAMBIAR MAPA ***************************************************************
//*********************************************************************************************************************************
//DOM
let mapaSeleccionado = document.getElementById("mapaSeleccionado");
let btnSiguiente = document.getElementById('btnSiguiente');
let btnAnterior = document.getElementById("btnAnterior");
//
mapas[0].seleccionado = true;
slots[0].elementoDOM.style.display = ""; //muestra en el DOM el Slot con indice 0 del array

//MAPA SIGUIENTE
let mapaSiguiente = () => {
    if(mapas[mapaActual].mapaCompleto){
    mapaActual++;
    mapaSeleccionado.src=`../assets/img/niveles/nivel${mapaActual}.png`;
    mapas[mapaActual-1].seleccionado = true; //indica al mapa actual como seleccionado.
    mapas[mapaActual-2].seleccionado = false; //indica al mapa anterior como no seleccionado.
    ocultarSlots(); //oculta todos los slots
    //mostrarSlots(); //muestra los slots necesarios para el mapa siguiente
    }else{
        alert("Tienes que completar este nivel para pasar al siguiente");
    }
}

btnSiguiente.addEventListener('click',mapaSiguiente); //boton que pasa al mapa siguiente

//MAPA ANTERIOR

let mapaAnterior = () => {
    mapaActual--;
    mapaSeleccionado.src=`../assets/img/niveles/nivel${mapaActual}.png`;
    mapas[mapaActual-1].seleccionado = true; //indica al mapa actual como seleccionado.
    mapas[mapaActual].seleccionado = false; //indica al mapa anterior como no seleccionado.
}
btnAnterior.addEventListener('click',mapaAnterior); //boton que pasa al mapa anterior

//*********************************************************************************************************************************
//*********************** CREACION DE LOS CONTENEDORES CON LAS FICHAS E ITERACION DE ARRAY ****************************************
//*********************************************************************************************************************************

//DOM
let divFicha = document.getElementById("divFichas");//Obtiene el nodo <DIV> donde se van a agregar los nuevos elementos - 
//
for (let divFichaN of fichas) {//Itera el array fichas, con for...of.
    let div = document.createElement("div");//Crea un nodo <div> en cada iteración. 
    div.id = `ficha${divFichaN.id + 1}`;//le asigno al nuevo div el ID ficha"N", donde "N" es el numero de ficha.
    div.className = `ficha`; //le asigno a cada DIV la clase ficha.
    div.innerHTML = `<img src="../assets/img/fichas/ficha${divFichaN.id +1}.png" alt="">` //asigna a cada nodo la etiqueta IMG con el valor correspondiente al elemento de la iteración actual del array fichas
    divFicha.appendChild(div); //Se inserta el nuevo nodo DIV al padre en cada ciclo
}

//*********************************************************************************************************************************
//********************************* FIN CREACION DE LOS CONTENEDORES CON LAS FICHAS  **********************************************
//*********************************************************************************************************************************


//*********************************************************************************************************************************
//**************************************************** ROTACION DE LAS FICHAS *****************************************************
//*********************************************************************************************************************************

//para girar una ficha debo seleccionarla, guardar esa ficha en una variable fichaAGirar
//luego con un boton tomar esa variable y con un evento click al mismo llame al metodo girarDerecha o girarIzquierda
//que a su vez gire la imagen de la ficha en el sentido correspondiente.

//DOM
const MOSTRARFICHAS = async () => {
    try{
        for(i=0;i<7;i++){
            ficha[i] = document.getElementById(`ficha${[i+1]}`)//guarda nodos con ID ficha en el array "ficha[]"-No confundir con array "fichas[]"
        }        
    }
    catch{}
}
MOSTRARFICHAS();
//SELECCION DE LA FICHA A GIRAR

let seleccionarFicha = e => {
    fichas[e].fichaSeleccionada();
} 

for(let e in ficha){
ficha[e].addEventListener('click',function() {seleccionarFicha(e)});
} 

/*
let girarFichaNro = 0; //variable que determina la ficha a girar
let sentidoGiro;//variable que determina el sentido de giro

let fichaAGirar = document.getElementById("ficha1");

fichas.addEventListener('click',seleccionarFicha);
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
//******************************************************* POSICIONAR LAS FICHAS ***************************************************
//*********************************************************************************************************************************



//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************
