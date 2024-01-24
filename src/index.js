import App from './App.js'
import { Launch } from '@lightningjs/sdk'

export default function () {
  return Launch(App, ...arguments)
}
