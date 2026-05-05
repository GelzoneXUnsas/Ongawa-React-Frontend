import { apiFetch } from './api';
import { getFileUrl } from './storageService';

/** Map DynamoDB Artist item → frontend musician shape */
function mapArtist(item) {
  return {
    id: item.PK?.replace('ARTIST#', ''),
    musicianName: item.ArtistName ?? '',
    artistImg: item.ProfilePictureLink ?? null,
    description: item.Bio ?? '',
    totalSongs: item.TotalSongs ?? 0,
    totalPlaycount: item.TotalPlaycount ?? 0,
  };
}

/** Map DynamoDB Album item → frontend album shape */
function mapAlbum(item) {
  return {
    id: item.PK?.replace('ALBUM#', ''),
    albumTitle: item.AlbumName ?? '',
    releaseDate: item.ReleaseDate ?? '',
    albumArt: item.AlbumPictureLink ?? null,
    artistName: item.ArtistName ?? '',
    // embedded song list from DynamoDB: [{SongID, SongTitleUnicode}]
    tracks: (item.Songs ?? []).map((s) => ({
      beatmapId: s.SongID,
      name: s.SongTitleUnicode ?? '',
      duration: '',
    })),
  };
}

export async function listArtists() {
  const items = await apiFetch('/artists');
  const artists = items.map(mapArtist);
  return Promise.all(
    artists.map(async (a) => ({ ...a, artistImg: await getFileUrl(a.artistImg) }))
  );
}

export async function getArtist(artistId) {
  const item = await apiFetch(`/artists/${artistId}`);
  return mapArtist(item);
}

export async function getArtistSongs(artistId) {
  return apiFetch(`/artists/${artistId}/songs`);
}

export async function getArtistAlbums(artistId) {
  const items = await apiFetch(`/artists/${artistId}/albums`);
  return items.map(mapAlbum);
}
