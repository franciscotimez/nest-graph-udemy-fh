import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

  @Query(() => String, {
    name: "hello",
    description: "Retorna Hola mundo"
  })
  helloWorld(): string {
    return "Hola mundo";
  }

  @Query(() => Float, {
    name: "randomNumber",
    description: "Retorna un numero aleatorio"
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: "randomFromZeroTo",
    description: "Retorna un numero entero aleatorio desde cero."
  })
  getRandomFromZeroTo(@Args('to', {
    type: () => Int,
    defaultValue: 10,
    nullable: true
  }) to: number): number {
    return Math.floor(Math.random() * to);
  }
}
