import { AddSongToPlaylistDto } from 'src/song/dto/add-to-playlist.dto';

export class CreatePlaylistDto {
  title: string;
  createdBy: string;
  imageUrl: string;
  songs: AddSongToPlaylistDto[];
}
