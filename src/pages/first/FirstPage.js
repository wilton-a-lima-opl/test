import { Lightning, Router } from '@lightningjs/sdk'

import { CardBase } from '../../components'
import { List } from '@lightningjs/ui'
import RailBase from '../../components/rails/RailBase'
import firstPageTheme from './FirstPageTheme'

export default class FirstPage extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xff1c1b1e,
      w: firstPageTheme.w,
      h: firstPageTheme.h,
      ContentList: {
        type: List,
        direction: 'column',
        w: firstPageTheme.contentList.w,
        h: firstPageTheme.contentList.h,
        x: firstPageTheme.contentList.x,
        y: firstPageTheme.contentList.y,
        clipping: true,
        forceLoad: true,
      },
    }
  }

  _build() {
    this._contentListsTag = this.tag('ContentList')
  }

  _enable() {
    // if (this._contentListsTag.hasItems) {
    //   this._contentListsTag.clear()
    // }
    // this._getContent(data)
  }

  _setup() {
    this._defaultRailProperties = {
      w: firstPageTheme.defaultRailProperties.w,
      h: firstPageTheme.defaultRailProperties.h,
    }
    this._setState('ContentList')
  }

  // async _grabData() {
  //   try {
  //     this.widgets.loading.open('fullscreen')
  //     const response = await this._generalProvider.getPhotosUrl()
  //     this._getContent(response)
  //   } catch (error) {
  //     console.error('Erro ao obter os dados:', error)
  //   }
  //   this.widgets.loading.close()
  // }

  // _grabData() {
  // this.widgets.loading.open('fullscreen')

  // GeneralProvider.getPhotosUrl()
  //   .then((response) => {
  //     this._getContent(response)
  //   })
  //   .catch((error) => {
  //     console.error('Erro ao obter os dados:', error)
  //   })
  // this.widgets.loading.close()
  //   const data = this.data
  //   this._getContent(data)
  // }

  _getContent(data) {
    if (!this._contentListsTag.hasItems && data) {
      const railSize = 20
      this.list = []

      for (let i = 0; i < data.length; i += railSize) {
        this.list.push(data.slice(i, i + railSize))
      }

      const listOfLists = this.list.slice(0, 3)

      this._cards = listOfLists.map((list) => list.map((it) => this._createCardList(it)))

      this._processData(this._cards)
    }
  }

  _processData(listsCards) {
    const arrayOfRails = listsCards
      .map((listItems, index) => this._createBaseRail(listItems, `Lista ${index + 1}`))
      .filter((rail) => rail && rail.items && rail.items.length)

    if (arrayOfRails.length) {
      this._contentListsTag.add(arrayOfRails)
    }
  }

  _createBaseRail(listItems, title) {
    if (listItems && listItems.length) {
      return {
        type: RailBase,
        x: firstPageTheme.railBase.x,
        items: listItems,
        showTitle: true,
        listTitle: {
          fontSize: firstPageTheme.railBase.fontSize,
          text: title,
        },
        ...this._defaultRailProperties,
      }
    }
  }

  _createCardList(item) {
    return {
      type: CardBase,
      w: firstPageTheme.cardBase.w,
      h: firstPageTheme.cardBase.h,
      title: item.title,
      src: item.thumbnailUrl,
    }
  }

  _getFocused() {
    return this.tag('ContentList')
  }

  _handleUp() {
    Router.focusWidget('menu')
    return true
  }

  set content(v) {
    this._item = v.filter(Boolean)
    this._getContent(this._item)
  }
}
