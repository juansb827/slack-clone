import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql']
    }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => configService.getTypeORMConfig(),
      inject: [ConfigService]
    }),
    RecipesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
