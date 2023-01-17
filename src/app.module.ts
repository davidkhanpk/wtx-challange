import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptors';
import { TruckScoreModule } from './truck-score/truck-score.module';
import { TruckModule } from './truck/truck.module';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';
import { ErrorMessages } from './utilities/error-messages';
import { TruckFactorModule } from './truck-factor/truck-factor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      
    }),
    
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST || 'localhost',
    //   port: parseInt(<string>process.env.POSTGRES_PORT) || 5432,
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DB,
    //   autoLoadEntities: true,
    //   synchronize: process.env.NODE_ENV !== 'production',
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('POSTGRES_HOST') || 'localhost',
          port: parseInt(config.get<string>('POSTGRES_PORT')) || 5432,
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DB'),
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== 'production',
        }
      }
    }),
    TruckModule,
    TruckScoreModule,
    TruckFactorModule,
    CommandModule,
  ],
  providers: [
    ErrorMessages,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
      scope: Scope.REQUEST
    }
  ]
})
export class AppModule {}
