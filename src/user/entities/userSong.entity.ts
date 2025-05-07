import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Song } from 'src/song/entities/song.entity';

@Entity()
export class SongToUser {
  @PrimaryGeneratedColumn()
  public songToUserId: number;

  @Column()
  public userId: number;

  @Column()
  public songId: number;

  @CreateDateColumn()
  public createdAt: Date;

  @ManyToOne(() => Song, (song) => song)
  public song: Song;

  @ManyToOne(() => User, (user) => user)
  public user: User;
}
