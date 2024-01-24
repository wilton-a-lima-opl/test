import Lightning from '@lightningjs/sdk/src/Lightning'
import { Marquee } from '@lightningjs/ui-components'
import cardBaseTheme from './CardBaseTheme'

export default class CardBase extends Lightning.Component {
  static _template() {
    return {
      ...super._template(),
      Wrapper: {
        w: (w) => w,
        h: (h) => h,
        clipping: true,
        Bg: {
          w: (w) => w,
          h: (h) => h,
          rect: true,
          visible: false,
        },
        Image: {},
        Title: {
          type: Marquee,
          repeat: cardBaseTheme.title.repeat,
          delay: cardBaseTheme.title.delay,
          style: {
            fadeWidth: cardBaseTheme.title.fadeWidth,
            textStyle: {
              textColor: cardBaseTheme.focusedColor,
              lineHeight: cardBaseTheme.title.lineHeight,
              fontSize: cardBaseTheme.title.fontSize,
            },
          },
        },
      },
    }
  }

  _build() {
    this._titleTag = this.tag('Title')
    this._backgroundTag = this.tag('Bg')
  }

  _construct() {
    this.showBorder = true
    this.showLegend = true
  }
  _setup() {
    this._setupBase()
  }

  _focus() {
    const commonWrapperConfig = {
      Wrapper: {
        scale: this.showLegend ? cardBaseTheme.defaultFocusScale : 1,
        color: cardBaseTheme.focusedBgColor,
        Bg: {
          color: cardBaseTheme.focusedBgColor,
        },
        ...(this.showBorder && {
          Border: {
            alpha: cardBaseTheme.alpha.visible,
          },
        }),
      },
    }

    if (this.showLegend) {
      this.patch({
        ...commonWrapperConfig,
        Wrapper: {
          ...commonWrapperConfig.Wrapper,
          Title: {
            w: this.w,
            title: {
              textColor: cardBaseTheme.unFocusedColor,
              maxLines: cardBaseTheme.title.maxLines,
              text: this.title,
            },
          },
        },
      })

      this._backgroundTag.visible = true
      this._titleTag.visible = true
      this._titleTag.startScrolling()
    } else {
      this.patch(commonWrapperConfig)
    }
  }

  _unfocus() {
    this.patch({
      Wrapper: {
        scale: cardBaseTheme.unfocusedScale,
        color: cardBaseTheme.unFocusedColor,
        Bg: {
          color: cardBaseTheme.unFocusedColor,
        },
        ...(this.showBorder && {
          Border: {
            alpha: cardBaseTheme.alpha.invisible,
          },
        }),
      },
    })
    this._backgroundTag.visible = false
    this._titleTag.visible = false
    this._titleTag.stopScrolling()
  }

  _setupBase() {
    const commonImageConfig = {
      w: (w) => (this.showLegend ? w - this.borderWidth : w),
      h: (h) => (this.showLegend ? h - cardBaseTheme.title.heightTitle : h),
      src: this.src,
      shader: { type: Lightning.shaders.RoundedRectangle, radius: this.borderRadius },
    }

    const wrapperConfig = {
      Wrapper: {
        Image: commonImageConfig,
        ...(this.showLegend && {
          Title: {
            w: (w) => w - this.borderWidth,
            h: 32 - this.borderWidth,
            y: (h) => h - cardBaseTheme.title.heightTitle,
            x: this.borderWidth,
          },
        }),
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
    }

    this.patch(wrapperConfig)
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

  get borderColor() {
    return 0xffffffff
  }

  get borderWidth() {
    return cardBaseTheme.defaultBoderWidth
  }

  get borderRadius() {
    return cardBaseTheme.defaultBorderRadius
  }

  set showBorder(v) {
    this._showBorder = v
  }

  get showBorder() {
    return this._showBorder
  }

  set focusScale(v) {
    this._focusScale = v
  }

  get focusScale() {
    return this._focusScale || cardBaseTheme.defaultFocusScale
  }

  set showLegend(v) {
    this._showLegend = v
  }

  get showLegend() {
    return this._showLegend
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
