import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { SongService } from 'src/song/song.service';
import { Album } from './entities/album.entity';
import { Song } from 'src/song/entities/song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from 'src/song/song.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), SongModule],
  controllers: [AlbumController],
  providers: [AlbumService, SongService],
})
export class AlbumModule {}
