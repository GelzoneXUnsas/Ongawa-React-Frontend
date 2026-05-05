import { apiFetch } from './api';
import { getFileUrl } from './storageService';

/** Map DynamoDB Song item → frontend beatmap shape */
function mapSong(item) {
  return {
    id: item.PK?.replace('SONG#', ''),
    title: item.SongTitleUnicode ?? item.Title ?? '',
    artist: item.ArtistName ?? '',
    image: item.SongCoverLink ?? null,
    bpm: item.BPM?.toString() ?? '',
    duration: formatDuration(item.Duration),
    description: item.Description ?? '',
    source: Array.isArray(item.Source) ? item.Source : [item.Source].filter(Boolean),
    tags: item.Tags ?? [],
    likes: item.TotalLikes ?? 0,
    plays: item.TotalPlays ?? 0,
    downloads: item.TotalDownloads ?? 0,
    createdAt: item.ReleaseDate ?? null,
    mappedBy: item.Version ?? '',
    albumId: item.AlbumID ?? null,
    isSingle: item.IsSingle ?? false,
    azaFileLink: item.AZAFileLink ?? null,
  };
}

/** Map DynamoDB Beatmap item → frontend difficulty shape */
function mapBeatmap(item) {
  return {
    id: item.SK?.replace('BEATMAP#', ''),
    songId: item.PK?.replace('SONG#', ''),
    difficultyTitle: item.DifficultyTitle ?? '',
    level: item.DifficultyRating?.toString() ?? '',
    approachRate: item.ApproachRate ?? 0,
    hpDrain: item.HP ?? 0,
    notes: item.NoteCount?.toString() ?? '0',
    sliders: item.SliderCount?.toString() ?? '0',
    creatorId: item.CreatorID ?? null,
  };
}

function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export async function listSongs() {
  const items = await apiFetch('/songs');
  const songs = items.map(mapSong);
  return Promise.all(
    songs.map(async (s) => ({ ...s, image: await getFileUrl(s.image) }))
  );
}

export async function getSong(songId) {
  const item = await apiFetch(`/songs/${songId}`);
  return mapSong(item);
}

export async function getSongBeatmaps(songId) {
  const items = await apiFetch(`/songs/${songId}/beatmaps`);
  return items.map(mapBeatmap);
}

export async function getBeatmap(songId, beatmapId) {
  const item = await apiFetch(`/songs/${songId}/beatmaps/${beatmapId}`);
  return mapBeatmap(item);
}

export async function getLeaderboard(songId, beatmapId) {
  return apiFetch(`/songs/${songId}/beatmaps/${beatmapId}/leaderboard`);
}

export async function likeSong(songId) {
  return apiFetch(`/songs/${songId}/like`, { method: 'POST' });
}

export async function trackPlay(songId) {
  return apiFetch(`/songs/${songId}/play`, { method: 'POST' });
}
