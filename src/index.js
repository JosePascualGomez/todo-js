import './styles.css' 

import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";

export const todoList = new TodoList();

//const tarea = new Todo('Aprender JavaScript');

//estas dos formas son iguales, funciona solo por que la funci{on recibe un solo argumento y es el objeto del foreach
todoList.todos.forEach( crearTodoHtml);
//todoList.todos.forEach( todo => crearTodoHtml(todo));


//const newTodo = new Todo('Tarea como clase para ver que las del storage son objetos no instancias de clase');
//todoList.nuevoTodo(newTodo);
//No funciona si no se parsean los objetos recuperados desde el localstorage a Todo
//todoList.todos[0].imprimirClase();
console.log('todos', todoList.todos);