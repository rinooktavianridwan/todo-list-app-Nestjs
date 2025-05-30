import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async findAll(userId?: number): Promise<Todo[]> {
    if (userId) {
      return this.todosRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    }
    return this.todosRepository.find({ relations: ['user'] });
  }

  async findOne(id: number, userId?: number): Promise<Todo | null> {
    const where: {
      id: number;
      user?: { id: number };
    } = { id };

    if (userId) {
      where.user = { id: userId };
    }

    return this.todosRepository.findOne({
      where,
      relations: ['user'],
    });
  }

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      user: { id: userId },
    });
    return this.todosRepository.save(todo);
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userId?: number,
  ): Promise<Todo> {
    const todo = await this.findOne(id, userId);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todosRepository.update(id, updateTodoDto);
    const updatedTodo = await this.findOne(id, userId);
    if (!updatedTodo) {
      throw new NotFoundException('Todo not found after update');
    }
    return updatedTodo;
  }

  async remove(id: number, userId?: number): Promise<void> {
    const todo = await this.findOne(id, userId);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    await this.todosRepository.delete(id);
  }
}
