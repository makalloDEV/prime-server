import { Song } from 'src/song/entities/song.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SongToPlaylist } from './playlistSong.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  createdBy: string;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToMany(() => SongToPlaylist, (songToPlaylist) => songToPlaylist.song)
  songToPlaylist: SongToPlaylist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
