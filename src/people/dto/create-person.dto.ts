import { IsEmail, IsStrongPassword, IsString, IsNotEmpty } from 'class-validator';

export class CreatePersonDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial',
    },
  )
  password: string;

  @IsString()
  name: string;
}
