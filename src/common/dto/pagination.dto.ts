import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @Max(50)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset: number;
}
