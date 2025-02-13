/**
 * Caches a single image by fetching it as a blob, converting it to a Data URL,
 * and then saving it to localStorage using the specified key.
 *
 * @param {string} url - The URL of the image to cache.
 * @param {string} key - The localStorage key to store the image.
 * @returns {Promise<string>} - A promise that resolves with the Data URL of the cached image.
 */
export const cacheImage = (url, key) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(key, reader.result);
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = (err) => reject(err);
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};

/**
 * Retrieves a cached image from localStorage.
 *
 * @param {string} key - The localStorage key where the image is stored.
 * @returns {string|null} - The cached image Data URL or null if not found.
 */
export const getCachedImage = (key) => {
  return localStorage.getItem(key);
};

/**
 * Caches multiple images. Each image is fetched and stored with a key based on its URL.
 *
 * @param {string[]} urls - An array of image URLs to cache.
 * @returns {Promise<string[]>} - A promise that resolves with an array of Data URLs.
 */
export const cacheImages = (urls) => {
  const cachePromises = urls.map((url) => {
    const key = `cache_${url}`;
    return cacheImage(url, key);
  });

  return Promise.all(cachePromises);
};

/**
 * Retrieves multiple cached images from localStorage.
 *
 * @param {string[]} urls - An array of image URLs to retrieve.
 * @returns {string[]} - An array of cached image Data URLs.
 */
export const getCachedImages = (urls) => {
  return urls.map((url) => {
    const key = `cache_${url}`;
    return getCachedImage(key);
  });
};
