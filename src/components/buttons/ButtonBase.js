import Lightning from '@lightningjs/sdk/src/Lightning'
import buttonBaseTheme from './ButtonBaseTheme'

export default class ButtonBase extends Lightning.Component {
  static _template() {
    return {
      w: (w) => w,
      h: (h) => h,
      Wrapper: {
        w: (w) => w,
        h: (h) => h,
        rect: true,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: this.radius,
        },
        ButtonBaseText: {},
      },
    }
  }

  _init() {
    this._buttonBaseTextTag.on('txLoaded', (txt) => {
      this.patch({
        Wrapper: {
          ButtonBaseText: {
            x: (this.w - txt._source.renderInfo.w) / 2,
            y: (this.h - txt._source.renderInfo.h) / 2,
          },
        },
      })
    })
  }

  _build() {
    this._buttonBaseTextTag = this.tag('ButtonBaseText')
  }

  _setup() {
    this.patch({
      Wrapper: {
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: this.radius,
        },
        color: this.unfocusColor,
        ButtonBaseText: {
          visible: this.buttonBaseText ? true : false,
          color: this.unfocusTextColor,
          text: {
            ...this.buttonBaseText,
          },
        },
      },
    })
  }

  _focus() {
    this.patch({
      Wrapper: {
        color: this.focusColor,
        ButtonBaseText: {
          color: this.focusTextColor,
        },
      },
    })
  }

  _unfocus() {
    this.patch({
      Wrapper: {
        color: this.unfocusColor,
        ButtonBaseText: {
          color: this.unfocusTextColor,
        },
      },
    })
  }

  set radius(v) {
    this._radius = v
  }

  get radius() {
    return this._radius || buttonBaseTheme.radius
  }

  set buttonBaseText(v) {
    this._buttonBaseText = v

    this.patch({
      Wrapper: {
        ButtonBaseText: {
          visible: true,
          text: {
            ...v,
          },
        },
      },
    })
  }

  get buttonBaseText() {
    return this._buttonBaseText || ''
  }

  set focusColor(focusColor) {
    this._focusColor = focusColor
  }

  set unfocusColor(unfocusColor) {
    this._unfocusColor = unfocusColor

    this.attached &&
      this.active &&
      this.patch({
        Wrapper: {
          color: this.unfocusColor,
        },
      })
  }

  set focusTextColor(focusTextColor) {
    this._focusTextColor = focusTextColor
  }

  set unfocusTextColor(unfocusTextColor) {
    this._unfocusTextColor = unfocusTextColor

    this.attached &&
      this.active &&
      this.patch({
        Wrapper: {
          ButtonBaseText: {
            color: this.unfocusTextColor,
          },
        },
      })
  }

  get focusColor() {
    return this._focusColor || buttonBaseTheme.focusColor
  }

  get focusTextColor() {
    return this._focusTextColor || buttonBaseTheme.focusTextColor
  }

  get unfocusColor() {
    return this._unfocusColor || buttonBaseTheme.unfocusColor
  }

  get unfocusTextColor() {
    return this._unfocusTextColor || buttonBaseTheme.unfocusTextColor
  }
}
