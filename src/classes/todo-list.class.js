import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        //this.todos = []; //senvia al cargar
        this.cargarLocalStorage();
    };

    //Agregamos un todo a la lista
    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    };


    eliminarTodo(id){
        //elimina filtrando todos menos el eliminado y asignandoel resultado al mismo arrays
        this.todos = this.todos.filter((todo)=>todo.id!=id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for(const todo of this.todos){
            //comparacíon solo con dos por que se evalua un numero y un texto
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    //Se filtran los no completedos para asignarlos al mismo, eliminanado lo completado
    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }       

    //guardar el arreglo de todo como JSON en el local storage
    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo'))
                        ? JSON.parse(localStorage.getItem('todo')) 
                        : [];
        //sopn iguales las siguientes
        this.todos = this.todos.map(Todo.fromJson);
        //this.todos = this.todos.map(obj=>Todo.fromJson(obj));

    }
}


//***************************/
//manejo de local storage
//***************************/
/*
localStorage.setItem('mi-Key','mi-valora');
//eliminar valor cada segundo y medio
setTimeout(()=>{
    localStorage.removeItem('mi-Key');
}, 1500)
*/

//***************************/
//manejo de local storage
//***************************/
/*
sessionStorage.setItem('mi-Ke','mi-valor');
//eliminar valor cada segundo y medio
setTimeout(()=>{
    sessionStorage.removeItem('mi-Ke');
}, 1500)
*/