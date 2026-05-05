import { getUrl, uploadData } from 'aws-amplify/storage';

/**
 * Get a public URL for a file stored in S3 under the public/ prefix.
 * @param {string} key - S3 key (without the "public/" prefix)
 */
export async function getFileUrl(key) {
  if (!key) return null;
  const result = await getUrl({ path: `public/${key}` });
  return result.url.toString();
}

/**
 * Upload a file to S3 under the public/ prefix.
 * @param {File} file - Browser File object
 * @param {string} key - Desired S3 key (without the "public/" prefix)
 */
export async function uploadFile(file, key) {
  const result = await uploadData({
    path: `public/${key}`,
    data: file,
    options: { contentType: file.type },
  }).result;
  return result.path;
}
