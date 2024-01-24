import { Router, Utils } from '@lightningjs/sdk'

import Loading from './widgets/loading/Loading'
import Menu from './widgets/menu/Menu'
import routes from './lib/routes'

export default class App extends Router.App {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      ...super._template(),
      w: 1920,
      h: 1080,
      Widgets: {
        Menu: {
          type: Menu,
        },
        Loading: {
          type: Loading,
        },
      },
    }
  }

  _setup() {
    Router.startRouter(routes, this)
  }
}
