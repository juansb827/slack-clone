import { ValidationError } from 'class-validator';

export class ValidationErrors {

    constructor(errors) {
        this.errors = errors;
    }
    errors: ValidationError[];
}