import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongService } from 'src/song/song.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly songService: SongService,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumRepository.save({
      title: createAlbumDto.title,
      createdBy: createAlbumDto.createdBy,
      imgUrl: createAlbumDto.imgUrl,
    });

    for (const song of createAlbumDto.songs) {
      await this.songService.createToAlbum(
        song,
        createAlbumDto.imgUrl,
        createAlbumDto.createdBy,
        +album.id,
      );
    }
  }

  async findAll(): Promise<Album[]> {
    const album = await this.albumRepository.find();

    if (!album) {
      throw new BadRequestException('Found nothing!');
    }

    return album;
  }

  async findOne(albumId: number): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },
    });

    if (!album) {
      throw new BadRequestException('Found nothing!');
    }

    return album;
  }

  async findAlbumsByTitle(albumTitle: string): Promise<Album[]> {
    const albums = await this.albumRepository.find({
      where: {
        title: albumTitle,
      },
    });

    if (!albums) {
      return [];
    }

    return albums;
  }

  async updateAlbum(
    albumId: number,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> {
    const song = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },
    });
    if (!song) {
      throw new BadRequestException('Found nothing!');
    }

    await this.albumRepository.update(albumId, updateAlbumDto);
    const updatedAlbum = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },
    });
    return updatedAlbum;
  }

  async deleteAlbum(albumId: number): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: {
        id: albumId,
      },
    });

    if (!album) {
      throw new BadRequestException('Found nothing!');
    }

    await this.albumRepository.delete(albumId);
    return album;
  }
}
