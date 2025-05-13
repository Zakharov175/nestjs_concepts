import {
  Module,
  // MiddlewareConsumer,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from 'src/people/people.module';
import { simpleMiddleware } from 'src/common/middlewares/simple.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'ie7nBC5*5m8iHYm',
      autoLoadEntities: true,
      synchronize: true, //cuidado, não usar local
    }),
    MessagesModule,
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(simpleMiddleware).forRoutes({
//       path: '*' , // or path:'messages'
//       method: RequestMethod.ALL,
//     });
//   }
// }
