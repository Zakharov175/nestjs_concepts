import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const dataPerson = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      };

      const newPerson = this.personRepository.create(dataPerson);
      await this.personRepository.save(newPerson);
      return newPerson;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email ja está cadastrado');
      }
    }
  }

  async findAll() {
    const people = this.personRepository.find({
      order: {
        id: 'desc',
      },
    });
    return people;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personForUpdate = {
      name: updatePersonDto?.name,
      passwordHash: updatePersonDto?.password
    };
    const updatedPerson = await this.personRepository.preload({
      id,
      ...personForUpdate,
    });
    if (!updatedPerson) {
      throw new NotFoundException('Person not found');
    }
    return this.personRepository.save(updatedPerson);
  }

  async remove(id: number) {
    const personForDelete = await this.personRepository.findOneBy({
      id,
    });
    if (!personForDelete) {
      throw new NotFoundException('Person not found');
    }
    return this.personRepository.remove(personForDelete);
  }
}
