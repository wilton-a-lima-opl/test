import { Lightning, Router } from '@lightningjs/sdk'
import GeneralProvider from '../../providers/GeneralProvider'
import { List } from '@lightningjs/ui'
import { CardBase } from '../../components'
import RailBase from '../../components/rails/RailBase'
import { Row } from '@lightningjs/ui-components'

export default class FirstPage extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xff1c1b1e,
      w: 1920,
      h: 1080,
      ContentList: {
        type: List,
        direction: 'column',
        w: 1920,
        h: 710,
        x: 64,
        y: 280,
        clipping: true,
        spacing: 1,
        forceLoad: true,
      },
    }
  }

  _init() {
    this._generalProvider = new GeneralProvider()
  }

  _build() {
    this._contentListsTag = this.tag('ContentList')
  }

  _getFocused() {
    return this.tag('ContentList')
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
      h: 310,
    }
    this._setState('ContentList')
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
    if (this.active && data) {
      this.list = []

      const images = data

      // Dividindo o array em partes de 20 elementos
      const chunkSize = 20
      for (let i = 0; i < images.length; i += chunkSize) {
        const chunk = images.slice(i, i + chunkSize)
        this.list.push(chunk)
      }

      // Criando as quatro listas
      const listOfLists = this.list.slice(0, 3)

      // Criando os cards para cada lista
      this._cards = listOfLists.map((list) => {
        return list.map((it) => this._createCardList(it)).filter((it) => it)
      })

      this._processData(this._cards)
    }
  }

  _processData(listsCards) {
    const arrayOfRails = listsCards
      .map((listItems, index) => {
        return this._createBaseRail(listItems, `Lista ${index + 1}`)
      })
      .filter((rail) => rail && rail.items && rail.items.length)

    if (arrayOfRails && arrayOfRails.length) {
      this._contentListsTag.add(arrayOfRails)
    }

    this.active && Router.focusPage()
  }

  _createBaseRail(listItems, title) {
    if (listItems && listItems.length) {
      return {
        type: RailBase,
        items: listItems,
        showTitle: true,
        listTitle: {
          fontSize: 32,
          text: title,
        },
        ...this._defaultRailProperties,
      }
    }
  }

  _createCardList(item) {
    return {
      type: CardBase,
      w: 230,
      h: 230,
      showBorder: true,
      src: item.thumbnailUrl,
    }
  }
}
