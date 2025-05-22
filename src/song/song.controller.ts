import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songService.findOne(+id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.songService.deleteSong(+id);
  }

  @Patch(':id')
  patchOne(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.updateSong(+id, updateSongDto);
  }
}
