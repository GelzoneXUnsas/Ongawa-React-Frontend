import { apiFetch } from './api';

function mapComment(item) {
  const [, timestamp, userId] = (item.SK ?? '').split('#');
  return {
    id: `${timestamp}-${userId}`,
    parentId: item.ParentCommentID ?? null,
    replyThreadParentId: item.ThreadParentID ?? null,
    author: item.AuthorName ?? 'Unknown',
    profilePicture: item.AuthorProfilePicture ?? null,
    dateCreated: item.Date ?? '',
    text: item.Text ?? '',
    authorId: item.AuthorID ?? null,
  };
}

/**
 * Fetch comments for a given parent entity.
 * @param {string} entityPK - e.g. "SONG#101#BEATMAP#501" or "POST#300"
 */
export async function getComments(entityPK) {
  const items = await apiFetch(`/comments?entity=${encodeURIComponent(entityPK)}`);
  return items.map(mapComment);
}

/**
 * Create a comment on a parent entity.
 * @param {object} data - { entityPK, text, parentCommentId?, threadParentId? }
 */
export async function createComment(data) {
  const item = await apiFetch('/comments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return mapComment(item);
}
