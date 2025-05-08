import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  //encontra todos as messages
  // /messages/
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    return this.messagesService.findAll();
    // return this.messagesService.findAll();
    //return 'This route return all messages';
  }
  //Encontra uma message
  // message/1/
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    //return `This route return message ID ${id}`;
    return this.messagesService.findOne(id);
  }
  @Post()
  //   create(@Body() body: any) {
  //create(@Body('message') body: any) {
  //console.log(body);
  //return `This route create one message`;
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() body: any) {
  //   return {
  //     id,
  //     ...body,
  //   };
  // }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
    // console.log(
    //   updateMessageDto.constructor.name,
    //   updateMessageDto instanceof UpdateMessageDto,
    // );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //return `This is route remove message with Id ${id}`;
    return this.messagesService.remove(+id);
  }
}
