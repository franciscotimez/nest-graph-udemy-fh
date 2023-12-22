import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoInput } from './inputs/create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoInput) {

  done?: boolean;
}
