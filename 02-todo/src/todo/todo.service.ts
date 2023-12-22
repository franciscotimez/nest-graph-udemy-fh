import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.dto';
import { UpdateTodoInput } from './dto/inputs/update-todo.dto';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, description: "Piedra del Alma", done: false },
    { id: 2, description: "Piedra del Tiempo", done: true },
    { id: 3, description: "Piedra del Espacio", done: false }
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter(todo => todo.done === true).length;
  }

  get pendingTodos() {
    return this.todos.filter(todo => todo.done === false).length;
  }

  create(createTodoDto: CreateTodoInput) {
    const todo = new Todo();
    todo.id = Math.max(...this.todos.map(todo => todo.id, 0)) + 1;
    todo.description = createTodoDto.description;
    todo.done = false;

    this.todos.push(todo);
    return todo;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined) return this.todos.filter(todo => todo.done === status);
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with #${id} not found`);
    return todo;
  }

  update(updateTodoDto: UpdateTodoInput): Todo {
    const { id, done, description } = updateTodoDto;
    const todo = this.findOne(id);

    if (done !== undefined) todo.done = done;
    if (description) todo.description = description;

    this.todos = this.todos.map(dbTodo => {
      if (dbTodo.id === id) return todo;
      return dbTodo;
    });

    return todo;
  }

  remove(id: number) {
    this.findOne(id);

    this.todos = this.todos.filter(todo => todo.id !== id);

    return true;
  }
}
