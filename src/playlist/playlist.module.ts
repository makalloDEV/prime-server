import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Song } from 'src/song/entities/song.entity';
import { SongToPlaylist } from './entities/playlistSong.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    TypeOrmModule.forFeature([Song]),
    TypeOrmModule.forFeature([SongToPlaylist]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
