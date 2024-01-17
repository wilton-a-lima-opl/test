export default class GeneralProvider {
  async getPhotosUrl() {
    const url = await fetch('https://jsonplaceholder.typicode.com/photos')
    const response = await url.json()
    return response
  }
}
