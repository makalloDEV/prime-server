import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AddSongToAlbumDto } from './dto/add-to-album.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}
  async create(createSongDto: CreateSongDto) {
    const song = await this.songRepository.save({
      title: createSongDto.title,
      audioUrl: createSongDto.audioUrl,
      imageUrl: createSongDto.imgUrl,
      createdBy: createSongDto.createdBy,
    });
  }

  async createToAlbum(
    addSongToAlbumDto: AddSongToAlbumDto,
    img: string,
    createdBy: string,
    albumId: number,
  ) {
    const song = await this.songRepository.save({
      title: addSongToAlbumDto.title,
      albumNumber: addSongToAlbumDto.albumNumber,
      audioUrl: addSongToAlbumDto.audioUrl,
      imageUrl: img,
      createdBy: createdBy,
      albumId: albumId,
    });
  }

  async findOne(songId: number): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: {
        id: songId,
      },
    });

    if (!song) {
      throw new BadRequestException('Found nothing!');
    }

    return song;
  }

  async findAll(): Promise<Song[]> {
    const song = await this.songRepository.find();

    if (!song) {
      throw new BadRequestException('Found nothing!');
    }

    return song;
  }

  async findSongsByTitle(albumTitle: string): Promise<Song[]> {
    const songs = await this.songRepository.find({
      where: {
        title: albumTitle,
      },
    });

    if (!songs) {
      return [];
    }

    return songs;
  }

  async deleteSong(songId: number): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: {
        id: songId,
      },
    });

    if (!song) {
      throw new BadRequestException('Found nothing!');
    }

    await this.songRepository.delete(songId);
    return song;
  }

  async updateSong(
    songId: number,
    updateSongDto: UpdateSongDto,
  ): Promise<Song | null> {
    const song = await this.songRepository.findOne({
      where: {
        id: songId,
      },
    });

    if (!song) {
      throw new BadRequestException('Found nothing!');
    }

    await this.songRepository.update(songId, updateSongDto);
    const updatedSong = await this.songRepository.findOne({
      where: {
        id: songId,
      },
    });
    return updatedSong;
  }
}
