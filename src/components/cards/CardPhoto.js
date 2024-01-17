import CardBase from './CardBase'

export default class CardPhoto extends CardBase {
  static _template() {
    return {
      w: (w) => w,
      h: (h) => h,
      Wrapper: {
        ...super._template().Wrapper,
        Image: {
          w: (w) => w,
        },
      },
    }
  }

  _setup() {
    super._setup()
    this._patchEpisode(this.src)
  }

  _patchEpisode(imageUrl) {
    this.patch({
      Wrapper: {
        Image: {
          src: imageUrl,
        },
      },
    })
  }

  _focus() {
    super._focus()
  }

  _unfocus() {
    super._unfocus()
  }

  set src(v) {
    this.patch({
      Wrapper: {
        Image: {
          src: v,
        },
      },
    })
  }
}
