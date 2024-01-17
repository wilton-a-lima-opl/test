import Lightning from '@lightningjs/sdk/src/Lightning'
import railBaseTheme from './RailBaseTheme'
import { Row } from '@lightningjs/ui-components'

export default class RailBase extends Lightning.Component {
  static _template() {
    return {
      Container: {
        flex: {
          direction: 'column',
        },
        Title: {},
        List: {
          type: Row,
          autoResize: true,
          forceLoad: true,
          scrollTransition: {
            duration: 0.2,
            timingFunction: 'ease',
          },
        },
      },
    }
  }

  _build() {
    this._listTag = this.tag('List')
    this._titleTag = this.tag('Title')
  }

  _init() {
    // this._titleTag.on('txLoaded', (txt) => {
    //   if (this.showTitle) {
    //     const renderHeight = txt._source.renderInfo.h
    //     if (this._listTag.hasItems) {
    //       this.h = this._listTag.items[0].h * this.focusScale + renderHeight
    //     }
    //     this.signal('repositionItems')
    //   }
    // })
  }

  _setup() {
    this.items && this.items.length && this._setItems()
  }

  _setItems() {
    this.patch({
      Container: {
        ...(this.listTitle && {
          Title: {
            x: this.items[0].floatingDistance
              ? this.fixPosition - this.items[0].floatingDistance
              : this.fixPosition,
            text: this.listTitle,
            visible: this.showTitle,
          },
        }),
        List: {
          ...(this.items &&
            this.items.length && {
              items: this.items,
            }),
          spacing: this.spacing,
          fixPosition: this.fixPosition,
        },
      },
    })

    if (!this.listTitle && this._listTag.hasItems) {
      this.h = this._listTag.items[0].h * this.focusScale
      this.signal('repositionItems')
    }

    if (this._listTag.hasItems) {
      this._listTag.reposition()
    }
  }

  _toggleTitleVisibility() {
    this.patch({
      Container: {
        Title: {
          visible: this.showTitle,
        },
      },
    })
  }

  _getFocused() {
    return this._listTag
  }

  set h(v) {
    this._h = v
  }

  get h() {
    return this._h
  }

  set items(v) {
    if (v && v.length) {
      this._items = v

      v[0].focusScale && (this.focusScale = v[0].focusScale)
      v[0].floatingDistance &&
        (this.fixPosition = railBaseTheme.fixPosition + v[0].floatingDistance)

      this.attached && this._setItems()
    }
  }

  get items() {
    return this._items || []
  }

  set spacing(v) {
    this._spacing = v
  }

  get spacing() {
    return this._spacing || railBaseTheme.list.defaultSpacing
  }

  set fixPosition(v) {
    this._fixPosition = v
  }

  get fixPosition() {
    return this._fixPosition || this._fixPosition === 0
      ? this._fixPosition
      : railBaseTheme.fixPosition
  }

  set listTitle(v) {
    this._listTitle = v
  }

  get listTitle() {
    return this._listTitle
  }

  set showTitle(v) {
    if (typeof v === 'boolean' && v !== this._showTitle) {
      this._showTitle = v

      this.attached && this._toggleTitleVisibility()
    }
  }

  get showTitle() {
    return !!this._showTitle
  }

  set focusScale(v) {
    this._focusScale = v
  }

  get focusScale() {
    return this._focusScale || railBaseTheme.defaultFocusScale
  }
}
