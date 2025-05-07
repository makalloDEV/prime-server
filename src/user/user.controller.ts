import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('add/song/:songId')
  @UseGuards(JwtAuthGuard)
  addSong(@Param('songId') songId: string, @Req() req) {
    return this.userService.addSongToUserCollection(+req.user.id, +songId);
  }

  @Get('songs')
  @UseGuards(JwtAuthGuard)
  getSongs(@Req() req) {
    return this.userService.getSongsFromUserCollection(+req.user.id);
  }
}
