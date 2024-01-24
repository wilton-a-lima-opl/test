import Lightning from '@lightningjs/sdk/src/Lightning'
import { Row } from '@lightningjs/ui-components'
import railBaseTheme from './RailBaseTheme'

export default class RailBase extends Lightning.Component {
  static _template() {
    return {
      Container: {
        flex: {
          direction: 'column',
        },
        Title: {},
        Row: {
          type: Row,
        },
      },
    }
  }

  _build() {
    this._rowTag = this.tag('Row')
  }

  _setup() {
    this.items && this.items.length && this._setItems()
  }

  _setItems() {
    this.patch({
      Container: {
        ...(this.listTitle && {
          Title: {
            x: railBaseTheme.title.x,
            y: railBaseTheme.title.y,
            text: this.listTitle,
            visible: this.showTitle,
          },
        }),
        Row: {
          ...(this.items &&
            this.items.length && {
              items: this.items,
            }),
        },
      },
    })
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
    return this._rowTag
  }

  set items(v) {
    if (v && v.length) {
      this._items = v

      this.attached && this._setItems()
    }
  }

  get items() {
    return this._items || []
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
}
