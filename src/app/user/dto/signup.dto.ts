import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto{
  @ApiProperty({
    example: "test user",
  })
  username: string;

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

  @ApiProperty({
    example: "admin",
    required: true,
  })
  role: string;


  @ApiProperty({
    example: "admin", 
  })
  license_num: string;
}
