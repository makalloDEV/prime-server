import { AddSongToAlbumDto } from 'src/song/dto/add-to-album.dto';
import { CreateSongDto } from 'src/song/dto/create-song.dto';

export class CreateAlbumDto {
  title: string;
  createdBy: string;
  imgUrl: string;
  songs: AddSongToAlbumDto[];
}
