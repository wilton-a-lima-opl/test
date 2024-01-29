import { Lightning, Router } from '@lightningjs/sdk'

import { CardBase } from '../../components'
//import GeneralProvider from '../../providers/GeneralProvider'
import { Grid } from '@lightningjs/ui'
import secondPageTheme from './SecondPageTheme'

export default class SecondPage extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xff1c1b1e,
      w: secondPageTheme.w,
      h: secondPageTheme.h,
      ContentGrid: {
        type: Grid,
        direction: 'column',
        columns: secondPageTheme.contentGrid.columns,
        h: secondPageTheme.contentGrid.h,
        w: secondPageTheme.contentGrid.w,
        x: secondPageTheme.contentGrid.x,
        y: secondPageTheme.contentGrid.y,
        crossSpacing: secondPageTheme.contentGrid.crossSpacing,
        mainSpacing: secondPageTheme.contentGrid.mainSpacing,
        enableRequests: true,
        requestThreshold: secondPageTheme.contentGrid.requestThreshold,
        clipping: true,
      },
    }
  }

  _build() {
    //this._generalProvider = new GeneralProvider()
    this._contentGridTag = this.tag('ContentGrid')
  }

  _enable() {
    // if (this._contentGridTag.hasItems) {
    //   this._contentGridTag.clear()
    // }
    //this._grabData()
  }

  _setup() {
    this._setState('ContentGrid')
  }

  // async _grabData() {
  //   try {
  //     this.widgets.loading.open('fullscreen')
  //     // const response = await GeneralProvider.getPhotosUrl()
  //     // this._getContent(response)
  //   } catch (error) {
  //     console.error('Erro ao obter os dados:', error)
  //   }
  //   this.widgets.loading.close()
  // }

  _getContent(data) {
    if (!this._contentGridTag.hasItems && data) {
      const contentsSelecteds = data.slice(0, 20)
      this._cards = contentsSelecteds.map((it) => this._createCardGrid(it)).filter(Boolean)
      this._contentGridTag.add(this._cards)
    }
  }

  _createCardGrid(item) {
    return {
      type: CardBase,
      w: secondPageTheme.cardBase.w,
      h: secondPageTheme.cardBase.h,
      showBorder: true,
      src: item.thumbnailUrl,
      showLegend: false,
      borderWidth: 15,
    }
  }

  _getFocused() {
    return this.tag('ContentGrid')
  }

  _handleUp() {
    Router.focusWidget('menu')
    return true
  }

  set content(v) {
    this._getContent(v)
  }
}
