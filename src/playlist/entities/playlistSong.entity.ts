import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/song/entities/song.entity';

@Entity()
export class SongToPlaylist {
  @PrimaryGeneratedColumn()
  public songToPlaylistId: number;

  @Column()
  public playlistId: number;

  @Column()
  public songId: number;

  @Column()
  public songPlaylistNumber: number;

  @CreateDateColumn()
  public createdAt: Date;

  @ManyToOne(() => Song, (song) => song)
  public song: Song;

  @ManyToOne(() => Playlist, (playlist) => playlist)
  public playlist: Playlist;
}
