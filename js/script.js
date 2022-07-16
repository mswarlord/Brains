let ficha = []; //array que guarda los nodos ficha
let mapaActual = 1; //Indica cual es el mapa seleccionado
const fichas = []; //guadrda el array de objetos ficha
const mapas = []; //genera el array mapas
let fichaSeleccionada; // indica la ficha seleccionada
let fichaColocada; //indica la ficha colocada actualmente

/* const slots = [ //pasar este array luego a JSON
    document.getElementById("slot1"),
    document.getElementById("slot2"),
    document.getElementById("slot3"),
    document.getElementById("slot4"),
    document.getElementById("slot5"),
    document.getElementById("slot6"),
    document.getElementById("slot7"),
    document.getElementById("slot8"),
    document.getElementById("slot9")
]
 */
let slots = [];
class Slot{//Se crea la clase Slot que establece el elemento del DOM y su estado.
    constructor(elementoDOM) {
        this.elementoDOM = elementoDOM;
        this.ocupado = false;//inicia el slot como desocupado.
    }

    ocuparSlot() {
        this.ocupado = true;
    }

    desocuparSlot() {
        this.ocupado = false;
    }
}



window.onload = function() {
    //*********************************************************************************************************************************
    for(i=0;i<9;i++){ //iteración para la creación de las fichas
    
        slots[i]=new Slot(document.getElementById(`slot${+i+1}`));
    }
//************************************************* CREACION DE LAS FICHAS Y SUS ESTADOS ******************************************
//*********************************************************************************************************************************
class Ficha{//Se crea la clase Ficha donde se establece la posicion inicial y los metodos para cambiar la posicion de las mismas
    constructor(id) {
        this.id = id    ;
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

for(i=0;i<7;i++){ //iteración para la creación de las fichas
    fichas[i]=new Ficha(i);
}

//*********************************************************************************************************************************
//************************************************* CREACION DE MAPAS Y SUS ESTADOS ***********************************************
//*********************************************************************************************************************************

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

const {mapaHabilitado, mapaCompleto, slotsDelMapa} = mapas; //desestructura los atributos mas usado en mapas

for(i=0;i<50;i++){
    mapas[i]=new mapa(i,i,`assets/img/nivel${i+1}.jpg`);
    if(mapas[i].nivel < 3) {
        mapas[i].slotsDelMapa = 1;
    }else if(mapas[i].nivel < 11) {
        mapas[i].slotsDelMapa = 2;
    }else if(mapas[i].nivel < 21){
        mapas[i].slotsDelMapa = 3;
    }else if(mapas[i].nivel < 31){
        mapas[i].slotsDelMapa = 4;
    }else if(mapas[i].nivel < 41){
        mapas[i].slotsDelMapa = 5;
    }else{
        mapas[i].slotsDelMapa = 6;
    }
}

//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************

//*********************************************************************************************************************************
//**************************************** CREACION DE SLOTS PARA LOS MAPAS *******************************************************
//*********************************************************************************************************************************

/* 
    En esta seccion se buscará crear el algoritmo que genere los slots al elegir un mapa.
    La cantidad de slots dependerá del atributo slotsDelMapa del objeto mapas. 
    Luego hay que determinar que ficha va en cada slot y en que posición para que el mapa esté completo...
*/

for(e in slots){ //quita del DOM todos los slots
    slots[e].elementoDOM.style.display = "none";
} 

slots[0].elementoDOM.style.display = ""; //muestra en el DOM el Slot con indice 0 del array

/* 
    EN ESTE PUNTO TENGO QUE TOMAR EL VALOR DE LA POSICION QUE TOMA LA FICHA AL MOMENTO QUE ES GIRADA
    Y LUEGO ROTAR LA IMAGEN 90° 180° O 270°. PARA ELLO TENGO QUE LLAMAR AL METODO GIRARFICHA
    Y LUEGO TOMAR EL VALOR DE DICHA POSICION.
*/

const clickSlots = () => {
    if(!!fichaColocada){

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


/*
for(let e of slot){
    slot1.addEventListener('click',function() {colocarFicha(slot1)});
}; */

slot1.addEventListener('click',function() {colocarFicha(slot1,0)});
slot2.addEventListener('click',function() {colocarFicha(slot2,1)});
slot3.addEventListener('click',function() {colocarFicha(slot3,2)});
slot4.addEventListener('click',function() {colocarFicha(slot4,3)});
slot5.addEventListener('click',function() {colocarFicha(slot5,4)});
slot6.addEventListener('click',function() {colocarFicha(slot6,5)});
slot7.addEventListener('click',function() {colocarFicha(slot7,6)});
slot8.addEventListener('click',function() {colocarFicha(slot8,7)});
slot9.addEventListener('click',function() {colocarFicha(slot9,8)});

//CODIGO PARA LA CREACION DE SLOTS MODIFICANDO EL DOM POR JS
/* 
let divSlot = document.getElementById("slots");//Obtiene el nodo donde se van a agregar los nuevos elementos - en este caso en un <DIV>

let generarSlots = () => { //funcion que genera los slots de cada mapa
    for( i=0; i < mapas[mapaActual].slotsDelMapa;i++) { //itera tantas veces como el valor slotsDelMapa tenga mapaActual
        let div = document.createElement("div");//Crea un nodo <div> en cada iteración. 
        div.id = `slot${i+1}`;
        div.className = `slots`;
        div.innerHTML = ``;
        divSlot.appendChild(div);
    }
}    

let resetearSlots = () => { //funcion que elimina los Slots creados en el mapa anterior
divSlot.remove();
divSlot = document.getElementById("slots");
}  */

//*********************************************************************************************************************************
//*********************************************************************************************************************************
//*********************************************************************************************************************************

//*********************************************************************************************************************************
//**************************************************** CAMBIAR MAPA ***************************************************************
//*********************************************************************************************************************************
let mapaSeleccionado = document.getElementById("mapaSeleccionado");
let btnSiguiente = document.getElementById('btnSiguiente');
mapas[0].seleccionado = true;

//MAPA SIGUIENTE
let mapaSiguiente = () => {
    mapaActual++;
    mapaSeleccionado.src=`../assets/img/niveles/nivel${mapaActual}.png`;
    mapas[mapaActual-1].seleccionado = true; //indica al mapa actual como seleccionado.
    mapas[mapaActual-2].seleccionado = false; //indica al mapa anterior como no seleccionado.
    resetearSlots();
    generarSlots(); //VER SECCION GENERAR SLOTS
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
//*********************** CREACION DE LOS CONTENEDORES CON LAS FICHAS E ITERACION DE ARRAY ****************************************
//*********************************************************************************************************************************

let divFicha = document.getElementById("divFichas");//Obtiene el nodo donde se van a agregar los nuevos elementos - en este caso en un <DIV>

for (const divFichaN of fichas) {//Itera el array fichas, con for...of.
    let div = document.createElement("div");//Crea un nodo <div> en cada iteración. 
    div.id = `ficha${divFichaN.id + 1}`;//le asigno al nuevo div el ID ficha"N", donde "N" es el numero de ficha.
    div.className = `ficha`; //le asigno a cada DIV la clase ficha.
    div.innerHTML = `<img src="../assets/img/fichas/ficha${divFichaN.id +1}.png" alt="">` //asigna a cada nodo la etiqueta IMG con el valor correspondiente al elemento de la iteración actual del array fichas
    divFicha.appendChild(div); //Se inserta el nuevo nodo al padre en cada ciclo
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




}
