import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: "test@gmail.com",
    required: true,
  })
  email: string;

  @ApiProperty({
    example: "123456789",
    required: true,
    minLength: 6,
  })
  password: string;
}
