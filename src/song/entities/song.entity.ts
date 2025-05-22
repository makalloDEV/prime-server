import { User } from 'src/user/entities/user.entity';
import { SongToUser } from 'src/user/entities/userSong.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  audioUrl: string;

  @Column({ nullable: true, type: 'integer' })
  albumNumber: number | null;

  @Column({ nullable: true, type: 'integer' })
  playlistNumber: number | null;

  @OneToMany(() => SongToUser, (songToUser) => songToUser.song)
  songToUser: SongToUser[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
