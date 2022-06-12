//BRAINS -- Proyecto
//CREACION DE LAS FICHAS Y SUS ESTADOS*********************************************************************************************

const ficha = [];
class Ficha{//creo la clase Ficha donde se establece el estado inicial y los metodos para cambiar el estado de las fichas
    constructor() {
        this.estado = 1;//inicia las fichas en una posicion determinada
    }
    
    girarIzquierda() {//Método para girar la ficha en sentido antihorario
        if(this.estado===1){ 
            this.estado=4;
        }else{
            this.estado--
        }
    }

    girarDerecha() {//Método para girar la ficha en sentido horario
        if(this.estado===4){ 
            this.estado=1;
        }else{
            this.estado++
        }
    }
}

  for(i=0;i<7;i++){ //iteración para la creación de las fichas
    ficha[i]=new Ficha();
}

let girarFichaNro = 0; //variable que determina la ficha a girar

let sentidoGiro;//variable que determina el sentido de giro

let girar = (prompt("Ingrese 'S' si desea mover una ficha o 'N' si desea finalizar")).toUpperCase();//variable que determina si se debe girar o no una ficha
while (girar !="N"){
    do{
        girarFichaNro = Number(prompt("Elija el numero de la ficha que desea mover del 0 al 6"));//Se determina la ficha a girar
    }while(girarFichaNro < 0 && girarFichaNro > 6 );//Se valida que sea una ficha existente (cambiar esta parte del código para que se determine el numero acorde el minimo y maximo indice del array ficha)
    
    do{
        sentidoGiro = (prompt(`inserte "D" para girar para la derecha o "I" para girar a la izquierda`)).toUpperCase();//Consulta sentido de giro de la ficha
    }while(sentidoGiro != "D" && sentidoGiro != "I");//se valida la entrada del usuario - esto es innecesario ya que se hará por medio de un botón    
    
    if(sentidoGiro == "D"){
        ficha[girarFichaNro].girarDerecha();//llamo al metodo que gira la ficha en sentido horario
        }else{
        ficha[girarFichaNro].girarIzquierda()//llamo al metodo que gira la ficha en sentido antihorario
    }
    
    girar = (prompt("Ingrese 'S' si desea mover una ficha o 'N' si desea finalizar")).toUpperCase();//consulto si se quiere mover otra ficha
}

for( const nroFicha of ficha ){//Recorre los valores array ficha.
    console.log(nroFicha);; //Muestra los atributos de cada objeto.
}