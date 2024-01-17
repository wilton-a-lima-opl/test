import { FirstPage, SecondPage } from '../pages'

export default {
  root: 'first',
  routes: [
    {
      path: 'first',
      component: FirstPage,
      widgets: ['menu', 'loading'],
    },
    {
      path: 'second',
      component: SecondPage,
      widgets: ['menu', 'loading'],
    },
  ],
}
