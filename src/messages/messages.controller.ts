import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
