import { Module } from '@nestjs/common';
import { Message } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    providers: [MessageResolver, MessageService]
})
export class MessageModule {}
