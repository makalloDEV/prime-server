import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SongToPlaylist } from './entities/playlistSong.entity';
import { Song } from 'src/song/entities/song.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(SongToPlaylist)
    private readonly songToPlaylistRepository: Repository<SongToPlaylist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto, user: IUser) {
    const songs = this.songRepository.find({
      where: {
        id: In(createPlaylistDto.songs),
      },
    });

    if (!songs) {
      throw new BadGatewayException('One or more songs are not exists');
    }

    const playlist = await this.playlistRepository.save({
      title: createPlaylistDto.title,
      imageUrl: createPlaylistDto.imageUrl,
      userId: user.id,
      createdBy: user.username,
    });

    const songsToPlaylist = createPlaylistDto.songs.map((songId) => ({
      playlistId: playlist.id,
      songId: +songId,
      songPlaylistNumber: 1,
    }));

    const result: InsertResult =
      await this.songToPlaylistRepository.insert(songsToPlaylist);
  }

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
