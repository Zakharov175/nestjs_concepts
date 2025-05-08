import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Message not found');
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });
    if (message) return message;
    this.throwNotFoundError();
  }

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
      date: new Date(),
    };
    const savedMessage = await this.messageRepository.create(newMessage);
    return this.messageRepository.save(savedMessage);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateMessageDto = {
      read: updateMessageDto.read,
      text: updateMessageDto.text,
    };
    const updatedMessage = await this.messageRepository.preload({
      id,
      ...partialUpdateMessageDto,
    });
    if (!updatedMessage) {
      return this.throwNotFoundError();
    }
    await this.messageRepository.save(updatedMessage);
    return updatedMessage;
  }

  async remove(id: number) {
    const messageForDelete = await this.messageRepository.findOneBy({
      id,
    });
    console.log(messageForDelete);
    if (messageForDelete) {
      return this.messageRepository.remove(messageForDelete);
    }
    this.throwNotFoundError();
  }

  hello() {
    return 'Hello word';
  }
}
