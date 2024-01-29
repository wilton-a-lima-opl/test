export const getPhotosUrl = async () => {
  return fetch('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=60')
}

export const getAlbums = async () => {
  return fetch('https://jsonplaceholder.typicode.com/albums')
}

export const getUserId = async () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
}
