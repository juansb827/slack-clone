import { Module, Global } from '@nestjs/common';
import { ErrorHandler } from './errorHandler';

@Global()
@Module({
    providers: [ErrorHandler],
    
    exports: [ErrorHandler]
})
export class ErrorModule {}
