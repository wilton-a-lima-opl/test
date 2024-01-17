import { Lightning, Router } from '@lightningjs/sdk'
import GeneralProvider from '../../providers/GeneralProvider'
import { Grid, List } from '@lightningjs/ui'
import { CardBase } from '../../components'
import RailBase from '../../components/rails/RailBase'

export default class SecondPage extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xff1c1b1e,
      w: 1920,
      h: 1080,
      ContentGrid: {
        type: Grid,
        direction: 'column',
        columns: 7,
        h: 800,
        w: 1800,
        x: 64,
        y: 280,
        scroll: 2,
        crossSpacing: 18,
        mainSpacing: 18,
        enableRequests: true,
        requestThreshold: 2,
        clipping: true,
      },
    }
  }

  _init() {
    this._generalProvider = new GeneralProvider()
  }

  _build() {
    this._contentGridTag = this.tag('ContentGrid')
  }

  _getFocused() {
    return this.tag('ContentGrid')
  }

  _handleUp() {
    Router.focusWidget('menu')
    return true
  }

  async _firstActive() {
    this._grabData()
  }

  _setup() {
    this._defaultRailProperties = {
      w: 1920,
      h: 400,
    }
    this._setState('ContentGrid')
  }

  _enable() {
    if (this.refresh) {
      this.refresh = false

      if (this._contentListsTag.hasItems) {
        this._contentListsTag.clear()
      }

      this._grabData()
    }
  }

  async _grabData() {
    this.widgets.loading.open('fullscreen')

    this._generalProvider.getPhotosUrl().then((response) => {
      this._getContent(response)

      this.widgets.loading.close()
    })
  }

  _getContent(data) {
    const contentsSelecteds = data.slice(0, 20)

    if (this.active && data) {
      this.list = []
      const images = contentsSelecteds
      images.forEach((img) => {
        this.list.push(img)
      })

      this._cards = this.list.map((it) => this._createCardGrid(it)).filter((it) => it)
      this._contentGridTag.add(this._cards)
    }
  }

  _createCardGrid(item) {
    return {
      type: CardBase,
      w: 230,
      h: 230,
      showBorder: true,
      src: item.thumbnailUrl,
    }
  }
}
