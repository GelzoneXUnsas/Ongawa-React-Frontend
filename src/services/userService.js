import { apiFetch } from './api';

function mapUser(item) {
  return {
    id: item.PK?.replace('USER#', ''),
    name: item.Username ?? '',
    email: item.Email ?? '',
    xp: item.XP ?? 0,
    rankedScore: item.RankedScore ?? 0,
    roleName: item.RoleName ?? 'User',
  };
}

export async function getUser(userId) {
  const item = await apiFetch(`/users/${userId}`);
  return mapUser(item);
}

export async function getUserPlays(userId) {
  return apiFetch(`/users/${userId}/plays`);
}

export async function getLikedSongs(userId) {
  return apiFetch(`/users/${userId}/liked-songs`);
}

export async function likeSong(userId, songId) {
  return apiFetch(`/users/${userId}/liked-songs`, {
    method: 'POST',
    body: JSON.stringify({ songId }),
  });
}
