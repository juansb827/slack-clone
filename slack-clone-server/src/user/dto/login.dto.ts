import { LoginInput } from '../../graphql.schema';
import { Min, IsEmail } from 'class-validator';

export class LoginDto extends LoginInput {
    // Add some validations
    @IsEmail({}, {
        message: 'Invalid email'  
      })
    email: string;
}