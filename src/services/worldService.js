import { apiFetch } from './api';
import { getFileUrl } from './storageService';

/** Map DynamoDB World item → frontend world shape */
function mapWorld(item) {
  return {
    id: item.PK?.replace('WORLD#', ''),
    title: item.WorldsTitleUnicode ?? '',
    image: item.WorldPictureLink ?? null,
    artist: item.ArtistName ?? '',
    artistBio: item.ArtistBio ?? '',
    artistQuote: item.ArtistQuote ?? '',
    albumId: item.AlbumID ?? null,
    // discography is populated by the worlds Lambda via batch-get
    discography: (item.discography ?? []).map(mapSongToDiscographyEntry),
  };
}

function mapSongToDiscographyEntry(item) {
  return {
    id: item.PK?.replace('SONG#', ''),
    title: item.SongTitleUnicode ?? '',
    artist: item.ArtistName ?? '',
    image: item.SongCoverLink ?? null,
    bpm: item.BPM?.toString() ?? '',
    duration: formatDuration(item.Duration),
    plays: item.TotalPlays ?? 0,
    likes: item.TotalLikes ?? 0,
  };
}

function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

async function resolveWorldImages(world) {
  const discographyImageUrls = await Promise.all(
    world.discography.map((d) => getFileUrl(d.image))
  );
  return {
    ...world,
    image: await getFileUrl(world.image),
    discography: world.discography.map((d, i) => ({ ...d, image: discographyImageUrls[i] })),
  };
}

export async function listWorlds() {
  const items = await apiFetch('/worlds');
  return Promise.all(items.map(mapWorld).map(resolveWorldImages));
}

export async function getWorld(worldId) {
  const item = await apiFetch(`/worlds/${worldId}`);
  return resolveWorldImages(mapWorld(item));
}
