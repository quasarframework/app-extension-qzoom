import QZoom from '@quasar/quasar-app-extension-qzoom/src/component/QZoom'

export default ({ Vue, ssrContext }) => {
  Vue.component('q-zoom', QZoom(ssrContext))
}
