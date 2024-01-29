// eslint-disable no-fallthrough //

import { Lightning, Router } from '@lightningjs/sdk'

import ButtonBase from '../../components/buttons/ButtonBase'
import menuTheme from './MenuTheme'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      ...super._template(),
      w: menuTheme.w,
      h: menuTheme.h,
      ButtonFirstPage: {
        type: ButtonBase,
        w: menuTheme.button.w,
        h: menuTheme.button.h,
        y: menuTheme.button.y,
        x: menuTheme.button.xFirst,
        borderRadius: menuTheme.button.borderRadius,
        focusColor: menuTheme.button.focusColor,
        unfocusColor: menuTheme.button.unfocusColor,
        focusTextColor: menuTheme.button.focusTextColor,
        unfocusTextColor: menuTheme.button.unfocusTextColor,
        buttonBaseText: {
          fontSize: menuTheme.button.buttonBaseText.fontSize,
          text: menuTheme.button.buttonBaseText.textFirstButton,
        },
      },
      ButtonSecondPage: {
        type: ButtonBase,
        w: menuTheme.button.w,
        h: menuTheme.button.h,
        y: menuTheme.button.y,
        x: menuTheme.button.xSecond,
        borderRadius: menuTheme.button.borderRadius,
        focusColor: menuTheme.button.focusColor,
        unfocusColor: menuTheme.button.unfocusColor,
        focusTextColor: menuTheme.button.focusTextColor,
        unfocusTextColor: menuTheme.button.unfocusTextColor,
        buttonBaseText: {
          fontSize: menuTheme.button.buttonBaseText.fontSize,
          text: menuTheme.button.buttonBaseText.textSecondButton,
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
      Router.focusPage()
    } else if (this._buttonSecondPageTag.hasFocus()) {
      Router.navigate('second')
      Router.focusPage()
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

        _handleDown() {
          Router.focusPage()
        }
      },

      class ButtonSecondPage extends this {
        _getFocused() {
          return this._buttonSecondPageTag
        }

        _handleLeft() {
          this._setState('ButtonFirstPage')
        }

        _handleDown() {
          Router.focusPage()
        }
      },
    ]
  }
}
