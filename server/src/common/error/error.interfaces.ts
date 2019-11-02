import { ValidationError } from 'class-validator';
import { Error as ErrorResponse } from '../../graphql.schema';

export class ValidationErrors {
    
    errors: ValidationError[];
    constructor(errors) {
        this.errors = errors;
    }
}

export class ClientError {
    errors: ErrorResponse[]
    constructor(errors: ErrorResponse[]) {
        this.errors = [...errors];
    }


}