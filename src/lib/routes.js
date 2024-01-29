import { FirstPage, SecondPage } from '../pages'

import { getPhotosUrl } from '../providers/GeneralProvider'

const fetchDataForPages = async () => {
  try {
    const response = await getPhotosUrl()
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    return null
  }
}

export default {
  root: 'first',
  routes: [
    {
      path: 'first',
      component: FirstPage,
      before: async (page) => {
        page.content = await fetchDataForPages()
      },
      widgets: ['menu', 'loading'],
    },
    {
      path: 'second',
      component: SecondPage,
      before: async (page) => {
        page.content = await fetchDataForPages()
      },
      widgets: ['menu', 'loading'],
    },
  ],
}
