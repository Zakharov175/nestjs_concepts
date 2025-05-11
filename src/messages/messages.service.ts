import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { skip } from 'node:test';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly peopleService: PeopleService,
  ) {}

  throwNotFoundError(): never {
    throw new NotFoundException('Message not found');
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    return await this.messageRepository.find({
      take: limit,
      skip: offset,
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
    if (message) return message;
    this.throwNotFoundError();
  }

  async create(createMessageDto: CreateMessageDto) {
    const { fromId, toId } = createMessageDto;
    const from = await this.peopleService.findOne(fromId);
    const to = await this.peopleService.findOne(toId);
    const newMessage = {
      text: createMessageDto.text,
      from,
      to,
      read: false,
      date: new Date(),
    };
    const createdMessage = await this.messageRepository.create(newMessage);
    await this.messageRepository.save(createdMessage);
    return {
      ...createdMessage,
      from: { id: createdMessage.from.id },
      to: { id: createdMessage.to.id },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);
    message.text = updateMessageDto?.text ?? message?.text;
    message.read = updateMessageDto.read ?? message?.read;

    await this.messageRepository.save(message);
    return message;
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
