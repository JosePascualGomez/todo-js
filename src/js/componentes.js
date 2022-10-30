import '../css/componentes.css'
import { Todo } from "../classes";
import { todoList } from "../index";

//referencias en html para
const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const btnLimpiaCompletado = document.querySelector('.clear-completed');
//listener de la clase filtered
const ulFiltros = document.querySelector('.filters');
//listado de objetos de botones
const anchorFiltros = document.querySelectorAll('.filtro');

//Metodo que crea la item lista en el html
export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    //para queno incluya el div sino solo el li
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

//eventos

//al digitar si es enter se guardar la tarea
inputNewTodo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && inputNewTodo.value.length > 0) {
        const nuevoTarea = new Todo(inputNewTodo.value);
        todoList.nuevoTodo(nuevoTarea);
        crearTodoHtml(nuevoTarea);
        inputNewTodo.value = "";
    }
});

//evento al seleccionar el check de cada lista primer if
//else para la x de elimiar
divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
})

//evento para elñ boton de eliminar, no recibe el evento pues no se usa la referencia del botton
btnLimpiaCompletado.addEventListener('click', () => {
    //se elimina del objeto
    todoList.eliminarCompletados();
    //se reflesca el elemento html haciendo un for inverso desde el último hasta el inicio
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        //Se evalua si se tiene la clase completed y se elimina
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) {
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    //Propiedad al boton que cliquea
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        //elimina la clase hidden del listado
        elemento.classList.remove('hidden');
        //mira cuales son completados para poner la clase hidden
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
            default:
                break;
        }
    }
})