import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TeamModule } from './team/team.module';
import { MessageModule } from './message/message.module';
import { ChannelModule } from './channel/channel.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
    }),
    CommonModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => { console.log('Type ORM********') ;return configService.getTypeORMConfig()},
      inject: [ConfigService]
    }),
    UserModule,
    TeamModule,
    MessageModule,
    ChannelModule,
    
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {
  
}
