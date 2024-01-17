import menuTheme from '../MenuTheme'
import { ListItem } from '@lightningjs/ui-components'

export default class MenuItem extends ListItem {
  static _template() {
    return {
      ...super._template(),
      w: (w) => w,
      h: (h) => h,
      Flex: { padding: 10 },
      Label: {
        text: {
          fontSize: 24,
          textColor: 0xffffffff,
          text: 'Default',
          textAlign: 'center',
        },
      },
    }
  }

  _build() {
    this._labelTag = this.tag('Label')
  }

  set label(v) {
    this._label = v

    this._labelTag.text.text = v
  }

  _focus() {
    this.tag('Label').patch(menuTheme.focused)
  }

  _unfocus() {
    this.tag('Label').patch(menuTheme.unfocused)
  }
}
