import { apiFetch } from './api';
import { getFileUrl } from './storageService';

function mapPost(item) {
  return {
    id: item.PK?.replace('POST#', ''),
    author: item.AuthorName ?? 'Unknown',
    profilePicture: item.AuthorProfilePicture ?? null,
    dateCreated: item.Date ?? '',
    title: item.Title ?? '',
    text: item.Text ?? '',
    tags: item.Tags ?? [],
    media: item.MediaPointer ? [item.MediaPointer] : [],
    likes: item.Likes ?? 0,
    views: item.Views ?? 0,
  };
}

export async function listPosts() {
  const items = await apiFetch('/posts');
  const posts = items.map(mapPost);
  return Promise.all(
    posts.map(async (p) => ({ ...p, profilePicture: await getFileUrl(p.profilePicture) }))
  );
}

export async function getPost(postId) {
  const item = await apiFetch(`/posts/${postId}`);
  const post = mapPost(item);
  return { ...post, profilePicture: await getFileUrl(post.profilePicture) };
}

export async function createPost(data) {
  const item = await apiFetch('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return mapPost(item);
}

export async function likePost(postId) {
  return apiFetch(`/posts/${postId}/like`, { method: 'POST' });
}
