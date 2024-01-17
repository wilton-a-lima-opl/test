// eslint-disable no-fallthrough //
import { Lightning, Router } from '@lightningjs/sdk'
import ButtonBase from '../../components/buttons/ButtonBase'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      ...super._template(),
      w: 1920,
      h: 1080,
      ButtonFirstPage: {
        type: ButtonBase,
        w: 600,
        h: 100,
        y: 110,
        x: 300,
        borderRadius: 8,
        focusColor: 0xffc2cbd1,
        unfocusColor: 0xff282828,
        focusTextColor: 0xff282828,
        unfocusTextColor: 0xfff2f2f2,
        buttonBaseText: {
          fontSize: 50,
          text: 'Page 1',
        },
        signals: {
          click: 'onOptionSelected',
        },
      },
      ButtonSecondPage: {
        type: ButtonBase,
        w: 600,
        h: 100,
        y: 110,
        x: 950,
        borderRadius: 8,
        focusColor: 0xffc2cbd1,
        unfocusColor: 0xff282828,
        focusTextColor: 0xff282828,
        unfocusTextColor: 0xfff2f2f2,
        buttonBaseText: {
          fontSize: 50,
          text: 'Page 2',
        },
        signals: {
          click: 'onOptionSelected',
        },
      },
    }
  }

  _build() {
    this._buttonFirstPageTag = this.tag('ButtonFirstPage')
    this._buttonSecondPageTag = this.tag('ButtonSecondPage')
  }

  _setup() {
    this._setState('ButtonFirstPage')
  }

  _handleEnter() {
    if (this._buttonFirstPageTag.hasFocus()) {
      Router.navigate('first')
    } else if (this._buttonSecondPageTag.hasFocus()) {
      Router.navigate('second')
    }
  }

  static _states() {
    return [
      class ButtonFirstPage extends this {
        _getFocused() {
          return this._buttonFirstPageTag
        }

        _handleRight() {
          this._setState('ButtonSecondPage')
        }
      },

      class ButtonSecondPage extends this {
        _getFocused() {
          return this._buttonSecondPageTag
        }

        _handleLeft() {
          this._setState('ButtonFirstPage')
        }
      },
    ]
  }
}
