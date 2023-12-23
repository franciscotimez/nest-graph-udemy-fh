import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {

  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float, { description: 'Example field (placeholder)' })
  @IsPositive()
  quantity: number;

  @Field(() => String, { description: 'Example field (placeholder)', nullable: true })
  @IsString()
  @IsOptional()
  quantityUnits?: string;
}
