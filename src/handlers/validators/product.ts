import {
  IsInt,
  Length,
  Min,
  Max,
  IsNotEmpty,
  NotContains,
} from "class-validator";

export class Product {
  @IsNotEmpty()
  @Length(2, 50)
  @NotContains("  ")
  title: string;

  @IsNotEmpty()
  @Length(2, 50)
  @NotContains("  ")
  description: string;

  @IsInt()
  @Min(0)
  @Max(10000)
  price: number;

  @IsInt()
  @Min(0)
  @Max(100_000_000)
  count: number;
}
