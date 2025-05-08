import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from 'src/messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from 'src/people/people.module';

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
      synchronize: true,//cuidado, não usar local
    }),
    MessagesModule,
    PeopleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
