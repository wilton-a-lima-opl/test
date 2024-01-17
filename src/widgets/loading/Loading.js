import Lightning from '@lightningjs/sdk/src/Lightning'
import loadingTheme from './LoadingTheme'
import { Router } from '@lightningjs/sdk'

export default class extends Lightning.Component {
  static _template() {
    return {
      Bg: {
        w: loadingTheme.w,
        h: loadingTheme.h,
        rect: true,
        color: 0x1c1b1e,
        visible: false,
      },
      Spinner: {
        w: loadingTheme.spinner.w,
        h: loadingTheme.spinner.h,
        visible: false,
        rect: true,
        shader: {
          type: Lightning.shaders.Spinner2,
          stroke: loadingTheme.spinner.shader.stroke,
          color: loadingTheme.spinner.shader.color,
        },
      },
    }
  }

  _build() {
    this._spinnerTag = this.tag('Spinner')
    this._bgTag = this.tag('Bg')
  }

  _setup() {
    this._spinnerTag.patch({
      x: (loadingTheme.w - this._spinnerTag.w) / 2,
      y: (loadingTheme.h - this._spinnerTag.h) / 2,
    })
  }

  _handleKey() {
    return true
  }

  open(mode = 'fullscreen', focusLoading = true) {
    if (this._spinnerTag.visible === false) {
      switch (mode) {
        case 'fullscreen':
          this.patch({
            Bg: {
              visible: true,
            },
            Spinner: {
              visible: true,
            },
          })
          break
        case 'spinner':
          this.patch({
            Bg: {
              visible: false,
            },
            Spinner: {
              visible: true,
            },
          })
          break
      }

      focusLoading && Router.focusWidget('loading')
    }
  }

  close() {
    this.patch({
      Bg: {
        visible: false,
      },
      Spinner: {
        visible: false,
      },
    })

    Router.focusPage()
  }

  _unfocus() {
    this.close()
  }
}
