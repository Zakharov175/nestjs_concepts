import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metada: ArgumentMetadata) {
    if (metada.type !== 'param' || metada.data !== 'id') {
      return value;
    }
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Validation failed: "${value}" is not a valid integer.`,
      );
    }

    if (parsedValue < 0) {
      throw new BadRequestException(
        'Validation failed: value must be greater than or equal to zero.',
      );
    }
    return parsedValue;
  }
}
