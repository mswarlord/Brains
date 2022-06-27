let ficha = []; //array con los nodos ficha
let mapaActual = 1; //Indica cual es el mapa seleccionado
const fichas = []; //genera el array de objetos ficha
const mapas = []; //genera array mapas

window.onload = function() {
//*********************************************************************************************************************************
//************************************************* CREACION DE LAS FICHAS Y SUS ESTADOS ******************************************
//*********************************************************************************************************************************
class Ficha{//Se crea la clase Ficha donde se establece la posicion inicial y los metodos para cambiar la posicion de las mismas
    constructor(id) {
        this.id = id;
        this.posicion = 1;//inicia las fichas en una posicion determinada
        this.seleccionada = false; //indica si la ficha esta seleccionada
    }

    fichaSeleccionada() {//metodo para cambiar el estado de seleccion de la ficha y deselecciona el resto de las fichas seleccionadas
        if(this.seleccionada === false){ 
            this.seleccionada = true;
            console.log(`selecionaste la ficha ${this.id}`)
            for(let e of fichas){ //Esta iteración deselecciona cualquier ficha que este seleccionada 
                if(e !== this){   //restringiendo al usuario que pueda seleccionar mas de una ficha
                    e.seleccionada = false;
                }
            }
        }else{
            this.seleccionada = false;
            console.log(`Deselecionaste la ficha ${this.id}`)
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
        this.completo = false;     //estado que indica si el mapa esta completo
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
//console.log(mapas);

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
//*********************** CREACION DE LOS CONTENEDORES CON LAS FICHAS CON DOM E ITERACION DE ARRAY ********************************
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
//*********************************************************** DESAFIOS ************************************************************
//*********************************************************************************************************************************
//DESAFIO 3
/*
let slot1 = document.getElementById("slot1");
let slot2 = document.getElementById('slot2');
slot1.style.setProperty("left", "200px");
slot1.style.setProperty("top", "200px");
slot1.style.setProperty("color", "#fff");
slot2.style.setProperty("color","#fff");
*/


//*********************************************************************************************************************************
//**************************************************** ROTACION DE LAS FICHAS *****************************************************
//*********************************************************************************************************************************

//para girar una ficha debo seleccionarla, guardar esa ficha en una variable fichaAGirar
//luego con un boton tomar esa variable y con un evento click al mismo llame al metodo girarDerecha o girarIzquierda
//que a su vez gire la imagen de la ficha en el sentido correspondiente.

//SELECCION DE LA FICHA A GIRAR

/* let seleccionarFicha = () => {
    fichas[0].fichaSeleccionada();
}  */

let seleccionarFicha1 = () => {
    fichas[0].fichaSeleccionada();
}
let seleccionarFicha2 = () => {
    fichas[1].fichaSeleccionada();
}
let seleccionarFicha3 = () => {
    fichas[2].fichaSeleccionada();
}
let seleccionarFicha4 = () => {
    fichas[3].fichaSeleccionada();
}
let seleccionarFicha5 = () => {
    fichas[4].fichaSeleccionada();
}
let seleccionarFicha6 = () => {
    fichas[5].fichaSeleccionada();
}
let seleccionarFicha7 = () => {
    fichas[6].fichaSeleccionada();
}

for(i=0;i<7;i++){
    ficha[i] = document.getElementById(`ficha${[i+1]}`)//guarda nodos con ID ficha en el array "ficha[]"-No confundir con array "fichas[]"
}

ficha[0].addEventListener('click',seleccionarFicha1); //Agrego a cada elemento del array ficha el evento para seleccionarlas
ficha[1].addEventListener('click',seleccionarFicha2);
ficha[2].addEventListener('click',seleccionarFicha3);
ficha[3].addEventListener('click',seleccionarFicha4);
ficha[4].addEventListener('click',seleccionarFicha5);
ficha[5].addEventListener('click',seleccionarFicha6);
ficha[6].addEventListener('click',seleccionarFicha7);


/* 
let seleccionarFicha = (e) => {
    console.log(`se selecciono la ficha ${e}`);
    console.log(e);
}

for(i=0;i<7;i++){
    ficha[i].addEventListener('click',`${seleccionarFicha}`);
    console.log(`Se agrego el evento click a la ficha ${i+1}`)
} 

//fichas[0].addEventListener('click',seleccionarFicha);
fichas[1].addEventListener('click',`${fichas[1].fichaSeleccionada()}`);
fichas[2].addEventListener('click',`${fichas[2].fichaSeleccionada()}`);
fichas[3].addEventListener('click',`${fichas[3].fichaSeleccionada()}`);
fichas[4].addEventListener('click',`${fichas[4].fichaSeleccionada()}`);
fichas[5].addEventListener('click',`${fichas[5].fichaSeleccionada()}`);
fichas[6].addEventListener('click',`${fichas[6].fichaSeleccionada()}`); */
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
//*********************************************************************************************************************************
//*********************************************************************************************************************************
}