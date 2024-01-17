import CardBase from './CardBase'

export default class CardSelection extends CardBase {
  static _template() {
    return {
      ...super._template(),
      Wrapper: {
        ...super._template().Wrapper,
        Title: {
          text: {
            textColor: 0xffffffff,
          },
        },
      },
    }
  }

  _build() {
    this._titleTag = this.tag('Title')
    // this.unfocusBgColor = 0xff454545
    // this.focusBgColor = 0xfff2f2f2
    // this.unfocusTitleColor = 0xfff2f2f2
    // this.focusTitleColor = 0xff282828
  }

  _construct() {
    super._construct()
  }

  _setup() {
    super._setup()
    this._updateStyle()

    this.patch({
      Wrapper: {
        Title: {
          y: 15,
          x: 220,
        },
      },
    })

    this.title && this._setTitle()
  }

  _setTitle() {
    this.patch({
      Wrapper: {
        Title: {
          text: {
            text: this.title,
            fontSize: this.titleFontSize,
          },
        },
      },
    })
  }

  _updateStyle() {
    const backgroundColor = this.active ? 0xfff2f2f2 : 0xff454545
    this.patch({
      rect: {
        color: backgroundColor,
      },
    })
  }

  // _focus() {
  //   super._focus()

  //   this.patch({
  //     Wrapper: {
  //       Checkmark: {
  //         color: this.focusTitleColor,
  //       },
  //     },
  //   })
  // }

  // _unfocus() {
  //   super._unfocus()

  //   this.patch({
  //     Wrapper: {
  //       Checkmark: {
  //         color: 0xfff2f2f2,
  //       },
  //     },
  //   })
  // }

  set title(v) {
    this._title = v

    this.active && this._setTitle()
  }

  get title() {
    return this._title || ''
  }

  set titleFontSize(v) {
    this._titleFontSize = v
  }

  get titleFontSize() {
    return this._titleFontSize || 42
  }

  set selected(v) {
    this._selected = v
    this.active && this._updateStyle() // Atualiza o estilo quando selecionado
  }

  get selected() {
    return this._selected || false
  }
}
