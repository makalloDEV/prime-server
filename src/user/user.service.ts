import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Song } from 'src/song/entities/song.entity';
import { SongToUser } from './entities/userSong.entity';
import { CreatedSongToUser } from './entities/userCreatedSong.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
    @InjectRepository(SongToUser)
    private readonly songToUserRepository: Repository<SongToUser>,
    @InjectRepository(SongToUser)
    private readonly CreatedSongToUserRepository: Repository<CreatedSongToUser>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isExist = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (isExist) {
      throw new BadRequestException(
        'Username is already taken. Try another username.',
      );
    }

    const user = await this.userRepository.save({
      username: createUserDto.username,
      password: await argon2.hash(createUserDto.password),
    });

    return user;
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async getSongsFromUserCollection(userId: number): Promise<SongToUser[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const songs = await this.songToUserRepository.find({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!songs) {
      return [];
    }

    return songs;
  }

  async addSongToUserCollection(userId: number, songId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const song: Song | null = await this.songRepository.findOne({
      where: {
        id: songId,
      },
    });

    const userSongs = await this.songToUserRepository.find({
      where: {
        userId: userId,
      },
    });

    if (!user || !song) {
      throw new BadRequestException('User or song not found!');
    }

    if (userSongs.some((s) => s.songId === song.id)) {
      throw new BadRequestException('Song already in user collection!');
    }

    await this.songToUserRepository.save({
      userId: userId,
      songId: songId,
    });
  }

  async getCreatedSongs(userId: number): Promise<CreatedSongToUser[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const songs = await this.CreatedSongToUserRepository.find({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!songs) {
      return [];
    }

    return songs;
  }
}
