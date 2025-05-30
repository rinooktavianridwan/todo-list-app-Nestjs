import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiResponse, successResponse } from '../common/api-response';

export interface TodoResponse {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  user: {
    id: number;
    email: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<ApiResponse<TodoResponse[]>> {
    // TODO: Get userId from JWT token when authentication is implemented
    // For now, return all todos
    const todos = await this.todosService.findAll();

    const todoResponses = todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isDone: todo.isDone,
      user: {
        id: todo.user.id,
        email: todo.user.email,
        name: todo.user.name,
      },
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));

    return successResponse('Todos retrieved successfully', todoResponses);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<TodoResponse>> {
    // TODO: Get userId from JWT token when authentication is implemented
    const todo = await this.todosService.findOne(+id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    const todoResponse: TodoResponse = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isDone: todo.isDone,
      user: {
        id: todo.user.id,
        email: todo.user.email,
        name: todo.user.name,
      },
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };

    return successResponse('Todo retrieved successfully', todoResponse);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<ApiResponse<TodoResponse>> {
    // TODO: Get userId from JWT token when authentication is implemented
    // For now, use dummy userId = 1
    const userId = 1;
    const todo = await this.todosService.create(createTodoDto, userId);

    const todoResponse: TodoResponse = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isDone: todo.isDone,
      user: {
        id: todo.user.id,
        email: todo.user.email,
        name: todo.user.name,
      },
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };

    return successResponse('Todo created successfully', todoResponse, 201);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ApiResponse<TodoResponse>> {
    // TODO: Get userId from JWT token when authentication is implemented
    const todo = await this.todosService.update(+id, updateTodoDto);

    const todoResponse: TodoResponse = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isDone: todo.isDone,
      user: {
        id: todo.user.id,
        email: todo.user.email,
        name: todo.user.name,
      },
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };

    return successResponse('Todo updated successfully', todoResponse);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    // TODO: Get userId from JWT token when authentication is implemented
    await this.todosService.remove(+id);

    return successResponse('Todo deleted successfully', null);
  }
}
