import Lightning from '@lightningjs/sdk/src/Lightning'
import cardBaseTheme from './CardBaseTheme'

export default class CardBase extends Lightning.Component {
  static _template() {
    return {
      ...super._template,
      w: (w) => w,
      h: (h) => h,
      Wrapper: {
        w: (w) => w,
        h: (h) => h,
        Image: {},
      },
    }
  }

  _setup() {
    this._setupBase()
  }

  _focus() {
    this.patch({
      Wrapper: {
        ...(this.showBorder && {
          Border: {
            alpha: 1,
          },
        }),
      },
    })
  }

  _unfocus() {
    this.patch({
      Wrapper: {
        ...(this.showBorder && {
          Border: {
            alpha: 0,
          },
        }),
      },
    })
  }

  _setupBase() {
    this.patch({
      Wrapper: {
        Image: {
          w: (w) => w,
          h: (h) => h,
          src: this.src,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: this.borderRadius },
        },
        ...(this.showBorder && {
          Border: {
            alpha: 0,
            texture: Lightning.Tools.getRoundRect(
              this.w - this.borderWidth,
              this.h - this.borderWidth,
              this.borderRadius,
              this.borderWidth,
              this.borderColor,
              false,
              false,
            ),
          },
        }),
      },
    })
  }

  _setImage() {
    this.patch({
      Wrapper: {
        Image: {
          src: this.src,
        },
      },
    })
  }

  set borderColor(v) {
    this._borderColor = v
  }

  get borderColor() {
    return this._borderColor
  }

  set borderWidth(v) {
    this._borderWidth = v
  }

  get borderWidth() {
    return this._borderWidth || cardBaseTheme.defaultBoderWidth
  }

  set borderRadius(v) {
    this._borderRadius = v
  }

  get borderRadius() {
    return this._borderRadius || cardBaseTheme.defaultBorderRadius
  }

  set showBorder(v) {
    this._showBorder = v
  }

  get showBorder() {
    return this._showBorder
  }

  set src(v) {
    if (v !== this.src) {
      this._src = v

      this.attached && this._setImage()
    }
  }

  get src() {
    return this._src || ''
  }
}
