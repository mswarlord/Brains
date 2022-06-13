//BRAINS -- Proyecto
//CREACION DE LAS FICHAS Y SUS ESTADOS*********************************************************************************************

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
}

//codigo agregado para la presentacion del desafio complementario
//agregar alguna propiedad o metodo de los arrays
console.log(`El total de elementos dentro de ficha es: ${ficha.length}`);//devuelve la cantidad de elementos dentro del arrays = 7

let fichaSlice = ficha.slice(1,3);//muestro los elementos que estan entre los indices del conjunto: [1;3).
console.log(fichaSlice);

let fichaSplice = ficha.splice(2,3)//tomo desde el indice 2 un total de 3 elementos y los guardo en fichaSplice
console.log(fichaSplice);
//fin codigo para desafio complementario