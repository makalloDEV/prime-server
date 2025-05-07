import { Album } from 'src/album/entities/album.entity';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Song } from 'src/song/entities/song.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SongToUser } from './userSong.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Album, (album) => album.users)
  @JoinTable()
  albums: Album[];

  @OneToMany(() => SongToUser, (songToUser) => songToUser.user)
  songToUser: SongToUser[];

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  @JoinTable()
  createdPlaylists: Playlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
