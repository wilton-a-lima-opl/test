export default {
  defaultFocusScale: 1.1,
  unfocusedScale: 1,
  defaultBoderWidth: 4,
  defaultBorderRadius: 2,

  get unFocusedColor() {
    return 0xff282828
  },
  get focusedColor() {
    return 0xfff2f2f2
  },
  get focusedBgColor() {
    return 0xffffffff
  },

  title: {
    repeat: -1,
    delay: 0.5,
    lineHeight: 32,
    fontSize: 24,
    fadeWidth: 0,
    maxLines: 1,
    heightTitle: 32,
  },

  alpha: {
    visible: 1,
    invisible: 0,
  },
}
