

export class Todo{

    //metodo estatico que permite convertir un objeto(guardado en el local storage) a una instancia de Todo
    //Se usa la desestructuración del objetos para los parametros de entrada
    static fromJson({id, tarea,completado,creado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;
        return tempTodo;
    }

    constructor(tarea){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date().getTime();
    };

    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}