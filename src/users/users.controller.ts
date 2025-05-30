import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Patch,
  Body,
  Delete,
  ValidationPipe,
  UsePipes,
  ConflictException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, successResponse } from '../common/api-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<ApiResponse<UserResponse[]>> {
    const users = await this.usersService.findAll();
    // Remove password from response
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result as UserResponse;
    });

    return successResponse(
      'Users retrieved successfully',
      usersWithoutPassword,
    );
  }

  @Get('profile')
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<UserResponse>> {
    const user = req.user;

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return successResponse(
      'Profile retrieved successfully',
      result as UserResponse,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<UserResponse>> {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return successResponse(
      'User retrieved successfully',
      result as UserResponse,
    );
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponse>> {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if email already exists (if email is being updated)
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersService.findByEmail(
        updateUserDto.email,
      );
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedUser = await this.usersService.update(+id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = updatedUser;

    return successResponse('User updated successfully', result as UserResponse);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersService.remove(+id);

    return successResponse('User deleted successfully', null);
  }
}
