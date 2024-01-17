export default {
  w: 1920,
  h: 120,
  wrapper: {
    y: 32,
    paddingRight: 64,
    defaultMenuItem: {
      marginLeft: 112,
      iconPaddingRight: 48,
    },
    profileMenuItem: {
      w: 56,
      h: 56,
      marginLeft: 68,
    },
    settings: {
      marginLeft: 13,
    },
  },
  wrapperBar: {
    h: 4,
    y: 76,
    w: 55,
    get color() {
      return 0x6ee445
    },
    radius: 4,
  },
  focused: {
    textColor: 0xffff0000,
  },
  unfocused: {
    textColor: 0xffcccccc,
  },
}
