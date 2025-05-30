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
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiResponse, successResponse } from '../common/api-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.entity';

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

interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<TodoResponse[]>> {
    if (!req.user || !req.user.id) {
      throw new NotFoundException('User not found in token');
    }
    const userId = req.user.id;
    console.log('User ID:', userId); // Debugging line to check user ID
    const todos = await this.todosService.findAll(userId);

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
  async findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<TodoResponse>> {
    const userId = req.user.id;
    const todo = await this.todosService.findOne(+id, userId);
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
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<TodoResponse>> {
    const userId = req.user.id;
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
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<TodoResponse>> {
    const userId = req.user.id;
    const todo = await this.todosService.update(+id, updateTodoDto, userId);

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
  async remove(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<null>> {
    const userId = req.user.id;
    await this.todosService.remove(+id, userId);

    return successResponse('Todo deleted successfully', null);
  }
}
