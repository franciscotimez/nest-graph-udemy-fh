
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: "ToDo id" })
  id: number;

  @Field(() => String, { description: "ToDo description", nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { description: "ToDo status", nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
