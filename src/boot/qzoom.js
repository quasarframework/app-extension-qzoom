import QZoom from '@quasar/quasar-app-extension-qzoom/src/component/QZoom'
import { Colorize } from 'quasar-mixin-colorize'

export default ({ Vue, ssrContext }) => {
  Vue.component('q-zoom', QZoom(ssrContext))
  Vue.component(Colorize)
}
