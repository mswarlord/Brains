//*************************************************************************************************************************
//************************************************************ TAREAS *****************************************************
//*************************************************************************************************************************

/* 
    1: que el titulo y la dificultad cambie en el DOM en cada nivel. -- LISTO
    2: Modificar los botones de siguiente. Listo
    3: borrado
    4: crear un input que permita seleccionar el mapa de forma numerica o por medio de una barra.
    5: crear una pagina de antesala al puzzle que permita llamar de forma grafica al mapa requerido
    6: guardar los datos de los desafios completados en el usuario logueado.
    7: colocar un pop up cuando el usuario presiona el boton de corroborar y el mapa no esta correctamente resuelto. -- LISTO
    8: crear una animacion cuando el usuario complete un desafio correctamente. 
    9: hacer las primeras revisiones del codigo y proceder a la limpieza, quitar codigo basura y sin uso.
    10: colocar animaciones al girar las fichas y colocarlas.
    11: Intentar que entren las fichas en la pantalla
    12: ocultar el boton de siguiente mientras el desafio actual no haya sido completado.
    13: el BOTON de SIGUIENTE debe aparecer solo cuando el desafío esté completo.
    14: guardar el registro del usuario en storage
    15: verificar en la pagina sesion si hay datos de inicio de sesion guardados y que ingrese automaticamente a dicha cuenta

*/

//*************************************************************************************************************************
//************************************************************ VARIABLES **************************************************
//*************************************************************************************************************************
let ficha = [];         // array que guarda los nodos ficha.
let mapaActual = 1;     // Indica cual es el mapa seleccionado.
const fichas = [];      // guarda el array de objetos ficha.
const mapas = [];       // genera el array mapas.
let fichaSeleccionada;  // indica la ficha seleccionada.
let fichaColocada;      // indica la ficha colocada actualmente.
let slots = [];         // array con los slots del DOM y sus estados.
let maxDesafioCompleto; // indica el maximo desafio superado.
let imgFicha;           // Variable que indica la imagen que se debe girar 

//*************************************************************************************************************************
//************************************************************ DOM ********************************************************
//*************************************************************************************************************************

const mapaSeleccionado = document.getElementById("mapaSeleccionado");
const btnSiguiente = document.getElementById('btnSiguiente');
const btnAnterior = document.getElementById("btnAnterior");
const divFicha = document.getElementById("divFichas"); // Obtiene el nodo <DIV> donde se van a agregar los nuevos elementos -
const nroDesafio = document.getElementById("nroDesafio");
const dificultadMapaActual = document.getElementById("dificultadMapaActual");
const btnInformacion = document.getElementById("btnInformacion");

//*************************************************************************************************************************
//*************************************************************** CLASES **************************************************
//*************************************************************************************************************************

//CLASE SLOT ***************************************************************************
class Slot{//Se crea la clase Slot que establece el elemento del DOM y su estado.
    constructor(elementoDOM) {
        this.elementoDOM = elementoDOM;
        this.ocupado = false;//inicia el slot como desocupado.
        this.oculto = false;
        this.fichaColocada;
    }

    ocultarSlot() {
            this.elementoDOM.style.display = "none";
    }

    mostrarSlot() {
            this.elementoDOM.style.display = "";
    }

    ocuparSlot(e) {
        this.ocupado = true;
        this.fichaColocada = e;
    }

    desocuparSlot() {
        this.elementoDOM.innerHTML="";
        this.ocupado = false;
        this.fichaColocada = false;
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
            
            Toastify({
                text: `seleccionaste la ficha ${this.id + 1}`,
                duration: 3000    
            }).showToast();

            fichaSeleccionada = this.id;

            for(let e of fichas){ //Esta iteración deselecciona cualquier ficha que este seleccionada 
                if(e !== this){   //restringiendo al usuario que pueda seleccionar mas de una ficha
                    e.seleccionada = false;
                }
            }

        }else{
            this.seleccionada = false;
            Toastify({
                text: `Deseleccionaste la ficha ${this.id + 1}`,
                duration: 3000    
            }).showToast();

            fichaSeleccionada = -1
        }
    }
}

//CLASE MAPA ***************************************************************************
class mapa { //genera la clase constructora de objetos mapa
    constructor(nivel, img){
        this.nivel = nivel + 1;
        this.dificultad = "";
        this.img = img;
        this.slotsDelMapa = 0;
        this.mapaCompleto = false;   //estado que indica si el mapa esta completo.
        this.mapaHabilitado = false; //estado que indica si el mapa esta habilitado para jugar.
        this.seleccionado = false;   //estado que indica si es el mapa que se esta jugando.
        this.condicionDeVictoria = false;
    }
    establecerDificultad(e) {
        this.dificultad = `${e}`;
    }
    completarMapa() { //metodo para indicar que el desafío ya fue completado.
        this.mapaCompleto = true;
        localStorage.setItem('maxDesafioCompleto', mapaActual);
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

const {mapaHabilitado, mapaCompleto, slotsDelMapa} = mapas; //desestructura los atributos mas usado en mapas

//*************************************************************************************************************************
//********************************************************FUNCIONES********************************************************
//*************************************************************************************************************************
let anguloRotacion = (e) => {
    imgFicha.style.webkitTransform = `rotate(${e}deg)`; 
    imgFicha.style.mozTransform = `rotate(${e}deg)`; 
    imgFicha.style.msTransform = `rotate(${e}deg)`; 
    imgFicha.style.oTransform = `rotate(${e}deg)`; 
    imgFicha.style.transform = `rotate(${e}deg)`; 
}

let mostrarSlots = (mapaActual) => { //funcion que muestra todos los Slots de la zona de juego
    switch(true){
        case mapaActual === 1:
            slots[0].elementoDOM.style.display = "";
            break;
        case mapaActual === 2:
            slots[0].elementoDOM.style.display = "";
            break;
        case mapaActual === 3:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 4:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 5:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 6:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 7:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 8:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 9:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 10:
            slots[1].elementoDOM.style.display = "";
            slots[2].elementoDOM.style.display = "";
            break;
        case mapaActual === 11:
            slots[3].elementoDOM.style.display = "";
            slots[4].elementoDOM.style.display = "";
            slots[5].elementoDOM.style.display = "";
            break;
        case mapaActual === 12:
            slots[0].elementoDOM.style.display = "";
            slots[7].elementoDOM.style.display = "";
            slots[8].elementoDOM.style.display = "";
            break;
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

for(i=0;i<50;i++){ //itera 50 veces
    mapas[i]=new mapa(i,`assets/img/nivel${i+1}.jpg`); //cada iteración crea un objeto mapa dentro del array mapas
    if(mapas[i].nivel < 3) { 
        mapas[i].establecerDificultad('Calentamiento');
        mapas[i].slotsDelMapa = 1; //si el nivel del mapa es < a 3 le coloca 1 slot
    }else if(mapas[i].nivel < 11) {
        mapas[i].establecerDificultad('Calentamiento');
        mapas[i].slotsDelMapa = 2; //si el nivel del mapa es < a 11 le coloca 2 slots
    }else if(mapas[i].nivel < 21){
        mapas[i].establecerDificultad('Jardineando');
        mapas[i].slotsDelMapa = 3; //si el nivel del mapa es < a 21 le coloca 3 slots
    }else if(mapas[i].nivel < 31){
        mapas[i].establecerDificultad('Terreno Peligroso');
        mapas[i].slotsDelMapa = 4; //si el nivel del mapa es < a 31 le coloca 4 slots
    }else if(mapas[i].nivel < 41){
        mapas[i].establecerDificultad('Sólo para expertos');
        mapas[i].slotsDelMapa = 5; //si el nivel del mapa es < a 41 le coloca 5 slots
    }else{
        mapas[i].establecerDificultad('El desafío definitivo');
        mapas[i].slotsDelMapa = 6; //si el nivel del mapa es >= a 41 le coloca 6 slots
    }
}

//*********************************************************************************************************************************
//**************************************** CREACION DE SLOTS PARA LOS MAPAS *******************************************************
//*********************************************************************************************************************************

for(i=0;i<9;i++){ //iteración para la creación de los slots
    slots[i]=new Slot(document.getElementById(`slot${+i+1}`));
}

for(e in slots){ //quita del DOM todos los slots
    slots[e].elementoDOM.style.display = "none";
} 

const clickSlots = (a,b) => {   //toma como parametros el nodo del slot clickeado y el indice de ese slot
    if(fichaSeleccionada >=0 && fichaSeleccionada <7){ //si hay una ficha seleccionada
        colocarFicha(a);    //llama a la funcion que coloca la ficha llevandole el nodo del slot
        slots[b].ocuparSlot(fichas[fichaColocada]); //llama al metodo ocuparSlot del slot clickeado y le guarda la ficha colocada
        slots[b].fichaColocada.posicion = 1; //inicia la posicion de la nueva ficha en 1
    } else if(slots[b].ocupado===true){ //si el slot esta ocupado...
        rotarFicha(b); //llama la funcion que rota la imagen de la ficha y cambia su posicion
    }
}

const mostrarFicha = (a) => {
if(!!a.innerHTML.slice(17,18)){
    ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "";
}else{

}
}

let colocarFicha = (a) => { //funcion que se encarga de colocar la ficha
    if(fichaSeleccionada >= 0 && fichaSeleccionada < 7){ //coloca la ficha si ficha seleccionada esta entre [0;7)
        switch(true){ //compara todos los casos y acciona el que devuelva TRUE
            case fichaSeleccionada === 0:
                mostrarFicha(a);
                a.innerHTML = `<img id="imgFicha1" src="../assets/img/fichas/ficha1.png">`; //coloca la imagen de la ficha en el slot
                ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "hidden";
                fichas[fichaSeleccionada].fichaSeleccionada();//evita conflictos al seleccionar una ficha en un nuevo mapa
                fichaSeleccionada = -1; //deselecciona la ficha seleccionada previamente
                fichaColocada = 0; //indica la ficha que se colocó
                break;
            case fichaSeleccionada === 1:
                mostrarFicha(a);
                a.innerHTML = `<img id="imgFicha2" src="../assets/img/fichas/ficha2.png">`;
                ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "hidden";
                fichas[fichaSeleccionada].fichaSeleccionada();
                fichaSeleccionada = -1;
                fichaColocada = 1;
                break;
            case fichaSeleccionada === 2:
                mostrarFicha(a);
                a.innerHTML = `<img id="imgFicha3" src="../assets/img/fichas/ficha3.png">`;
                ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "hidden";
                fichas[fichaSeleccionada].fichaSeleccionada();
                fichaSeleccionada = -1;
                fichaColocada = 2;
                break;
            case fichaSeleccionada === 3:
                mostrarFicha(a);
                a.innerHTML = `<img id="imgFicha4" src="../assets/img/fichas/ficha4.png">`;
                ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "hidden";
                fichas[fichaSeleccionada].fichaSeleccionada(); 
                fichaSeleccionada = -1;
                fichaColocada = 3;
                break;
            case fichaSeleccionada === 4:
                mostrarFicha(a);
                a.innerHTML = `<img id="imgFicha5" src="../assets/img/fichas/ficha5.png">`;
                ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "hidden";
                fichas[fichaSeleccionada].fichaSeleccionada(); 
                fichaSeleccionada = -1;
                fichaColocada = 4;
                break;
            case fichaSeleccionada === 5:
                mostrarFicha(a);
                a.innerHTML = `<img id="imgFicha6" src="../assets/img/fichas/ficha6.png">`;
                ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "hidden";
                fichas[fichaSeleccionada].fichaSeleccionada(); 
                fichaSeleccionada = -1;
                fichaColocada = 5;
                break;
            case fichaSeleccionada === 6:
                mostrarFicha(a);
                a.innerHTML = `<img id="imgFicha7" src="../assets/img/fichas/ficha7.png">`;
                ficha[(a.innerHTML.slice(17,18)-1)].style.visibility = "hidden";
                fichas[fichaSeleccionada].fichaSeleccionada(); 
                fichaSeleccionada = -1;
                fichaColocada = 6;
                break;
            default:
                break;
        }
    }
}

let rotarFicha = (b) => { //toma como parametro el indice del slot que llama a la funcion
    imgFicha = document.getElementById(`${slots[b].elementoDOM.innerHTML.slice(9,18)}`);
    if(slots[b].fichaColocada.posicion === 1){
        anguloRotacion(90);
        slots[b].fichaColocada.posicion = 2;
    }else if(slots[b].fichaColocada.posicion === 2) {
        anguloRotacion(180);
        slots[b].fichaColocada.posicion = 3;
    }else if(slots[b].fichaColocada.posicion === 3) {
        anguloRotacion(270);
        slots[b].fichaColocada.posicion = 4;
    }else if(slots[b].fichaColocada.posicion === 4) {
        anguloRotacion(0);
        slots[b].fichaColocada.posicion = 1;
    }
}

for(e in slots){  //itera los elementos del array slots
    let i = e;    //crea una variable para meter en slots[i] -- averiguar ¿por que con e no lo toma? ¿mala sintaxis?
    slots[i].elementoDOM.addEventListener('click',function() {clickSlots(slots[i].elementoDOM, i)}); //genera en cada
    //iteración un evento click en cada slot, con la función colocar ficha, y ademas el slot que se está clickeando y el nodo como parámetro.
} 

//*********************************************************************************************************************************
//**************************************************** CAMBIAR MAPA ***************************************************************
//*********************************************************************************************************************************
mapas[0].seleccionado = true;
slots[0].elementoDOM.style.display = ""; //muestra en el DOM el Slot con indice 0 del array

const limpiarMapa = () => {
    for(e in slots){
        slots[e].desocuparSlot();
        if(!!ficha[e]){        
            ficha[e].style.visibility = "";
        }
    }
}


const actualizarEncabezado = () => {
    dificultadMapaActual.innerHTML = `${mapas[mapaActual].dificultad}`;
    nroDesafio.innerText = `${mapaActual}`;
}


//MAPA SIGUIENTE
let mapaSiguiente = () => {
    maxDesafioCompleto = localStorage.getItem('maxDesafioCompleto');
    if(mapas[mapaActual-1].mapaCompleto || maxDesafioCompleto >= mapaActual){
        if(mapaActual>11) {
            Swal.fire({
                icon: 'error',
                title: 'MAPA NO DISPONIBLE',
                text: 'Lo sentimos, ésta es una versión de prueba del juego de mesa de REINER KNIZIA. Para seguir disfrutando de este alucinante juego, por favor cómpralo y asi ayudarás al creador!',
                footer: ''
            })
        } else {
            mapaActual++;
            mapaSeleccionado.src=`../assets/img/niveles/nivel${mapaActual}.png`;
            mapas[mapaActual-1].seleccionado = true; //indica al mapa actual como seleccionado.
            mapas[mapaActual-2].seleccionado = false; //indica al mapa anterior como no seleccionado.
            ocultarSlots(); //oculta todos los slots
            mostrarSlots(mapaActual); //muestra los slots necesarios para el mapa siguiente
            limpiarMapa();
            actualizarEncabezado();
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'MAPA INCOMPLETO',
            text: 'Tienes que completar este nivel para pasar al siguiente',
            footer: ''
        })
    }
}

btnSiguiente.addEventListener('click',mapaSiguiente); //boton que pasa al mapa siguiente

//MAPA ANTERIOR

let mapaAnterior = () => {
    if(mapaActual > 1){
        mapaActual--;
        mapaSeleccionado.src=`../assets/img/niveles/nivel${mapaActual}.png`;
        mapas[mapaActual-1].seleccionado = true; //indica al mapa actual como seleccionado.
        mapas[mapaActual].seleccionado = false; //indica al mapa anterior como no seleccionado.
        ocultarSlots(); //oculta todos los slots
        mostrarSlots(mapaActual); //muestra los slots necesarios para el mapa siguiente
        limpiarMapa();
        actualizarEncabezado();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'MAPA NO DISPONIBLE',
            text: 'Tienes que completar el desafío 49 para pasar al 50',
            footer: ''
        })
    }
}
btnAnterior.addEventListener('click',mapaAnterior); //boton que pasa al mapa anterior

//*********************************************************************************************************************************
//*********************** CREACION DE LOS CONTENEDORES CON LAS FICHAS E ITERACION DE ARRAY ****************************************
//*********************************************************************************************************************************

for (let divFichaN of fichas) {//Itera el array fichas, con for...of.
    let div = document.createElement("div");//Crea un nodo <div> en cada iteración. 
    div.id = `ficha${divFichaN.id + 1}`;//le asigno al nuevo div el ID ficha"N", donde "N" es el numero de ficha.
    div.className = `ficha`; //le asigno a cada DIV la clase ficha.
    div.innerHTML = `<img src="../assets/img/fichas/ficha${divFichaN.id +1}.png" alt="">` //asigna a cada nodo la etiqueta IMG con el valor correspondiente al elemento de la iteración actual del array fichas
    divFicha.appendChild(div); //Se inserta el nuevo nodo DIV al padre en cada ciclo
}

const MOSTRARFICHAS = async () => {
    try{
        for(i=0;i<7;i++){
            ficha[i] = document.getElementById(`ficha${[i+1]}`)//guarda nodos con ID ficha en el array "ficha[]"-No confundir con array "fichas[]"
        }        
    }
    catch{}
}

MOSTRARFICHAS();

//SELECCION DE LA FICHA

let seleccionarFicha = e => {
    fichas[e].fichaSeleccionada();
} 

for(let e in ficha){
    ficha[e].addEventListener('click',function() {seleccionarFicha(e)});
} 
//**************************************************************************************************************************
//****************************************************** CORROBORAR CONDICION DE VITORIA ************************************
//**************************************************************************************************************************

const CORROBORAR = document.getElementById("btnCorroborar");
const msjCompletado = () => {
    Swal.fire({
        icon: 'success',
        title: '¡DESAFÍO COMPLETADO!',
        text: 'Felicitaciones!!! puedes pasar al siguiente desafío',
        footer: ''
    })
}
const msjIncompleto = () => {
    Toastify({
        text: `¡Ups, algo anda mal!`,
        duration: 3000    
    }).showToast();
}
const corroborarVictoria = () => {
    switch(true){
        case mapaActual === 1:
            if (slots[0]?.fichaColocada?.id === 1 && slots[0].fichaColocada.posicion === 2){
                mapas[0].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 2:
            if (slots[0].fichaColocada.id === 4 && slots[0].fichaColocada.posicion === 2){
                mapas[1].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 3:
            if (slots[1].fichaColocada.id === 4 && slots[1].fichaColocada.posicion === 1 && slots[2].fichaColocada.id === 0 && slots[2].fichaColocada.posicion === 1){
                mapas[2].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 4:
            if (slots[1].fichaColocada.id === 0 && slots[1].fichaColocada.posicion === 1 && slots[2].fichaColocada.id === 5 && slots[2].fichaColocada.posicion === 4){
                mapas[3].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 5:
            if (slots[1].fichaColocada.id === 1 && slots[1].fichaColocada.posicion === 2 && slots[2].fichaColocada.id === 2 && slots[2].fichaColocada.posicion === 3){
                mapas[4].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 6:
            if (slots[1].fichaColocada.id === 5 && slots[1].fichaColocada.posicion === 4 && slots[2].fichaColocada.id === 4 && slots[2].fichaColocada.posicion === 2){
                mapas[5].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 7:
            if (slots[1].fichaColocada.id === 4 && slots[1].fichaColocada.posicion === 1 && slots[2].fichaColocada.id === 3 && slots[2].fichaColocada.posicion === 2){
                mapas[6].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 8:
            if (slots[1].fichaColocada.id === 3 && slots[1].fichaColocada.posicion === 3 && slots[2].fichaColocada.id === 5 && slots[2].fichaColocada.posicion === 2){
                mapas[7].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 9:
            if (slots[1].fichaColocada.id === 5 && slots[1].fichaColocada.posicion === 1 && slots[2].fichaColocada.id === 6 && slots[2].fichaColocada.posicion === 3){
                mapas[8].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 10:
            if (slots[1].fichaColocada.id === 1 && slots[1].fichaColocada.posicion === 2 && slots[2].fichaColocada.id === 6 && slots[2].fichaColocada.posicion === 2){
                mapas[9].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 11:
            if (slots[3].fichaColocada.id === 0 && slots[3].fichaColocada.posicion === 1 && slots[4].fichaColocada.id === 6 && slots[4].fichaColocada.posicion === 2 && slots[5].fichaColocada.id === 4 && slots[5].fichaColocada.posicion === 2){
                mapas[10].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
        case mapaActual === 12:
            if (slots[0].fichaColocada.id === 5 && slots[0].fichaColocada.posicion === 3 && slots[7].fichaColocada.id === 6 && slots[7].fichaColocada.posicion === 3 && slots[8].fichaColocada.id === 2 && slots[8].fichaColocada.posicion === 2){
                mapas[10].completarMapa();
                msjCompletado();
            }else{
                msjIncompleto();
            }
            break;
    }
}

CORROBORAR.addEventListener('click',corroborarVictoria);

const mostrarInformacion = (texto, gravedad, posicion, delay) => {
setTimeout( function () {
    Toastify({
        className: "info",
        text: `${texto}`,
        duration: 4000,
        gravity: `${gravedad}`, 
        position: `${posicion}`,
        style: {background: "linear-gradient(to right, #00b09b, #96c93d)"}
}).showToast();
},delay)
}

let llamarInfo = () => {
    mostrarInformacion(
        `Selecciona una de las fichas de la parte inferior`,
        `bottom`,
        `center`,
        0
    )
    mostrarInformacion(
        `Luego haz click en el slot donde quieras colocarla`,
        `top`,
        `center`,
        4000
    )
    mostrarInformacion(
        `Haz click sobre la ficha colocada para rotarla`,
        `top`,
        `center`,
        8000
    )
    mostrarInformacion(
        `Cuando creas que esté completo, presiona el boton CORROBORAR a tu derecha`,
        `top`,
        `center`,
        12000
    )
    mostrarInformacion(
        `La perseverancia hace al maestro! EXITOS!`,
        `left`,
        `center`,
        16000
    )
}

btnInformacion.addEventListener("click",llamarInfo)