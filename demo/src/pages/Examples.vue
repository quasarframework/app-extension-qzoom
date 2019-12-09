<template>
  <hero>
    <div>
      <q-markdown>
**QZoom** is a utility component to make whatever is in its slotted content able to be zoomed to fullscreen size of the viewport.

There is also the ability, once zoomed, to change the `scale` or `scale-text` of the slotted content via the mouse wheel.

::: warning
Using both the `scale` and `scale-text` properties at the same time invalidates both properties.
:::

::: tip
You can use the ESC key to restore zoomed content, unless the `no-esc-close` property is set to true.
:::
      </q-markdown>
      <example-card title="Basic" name="Basic" :tag-parts="getTagParts(require('!!raw-loader!../examples/Basic.vue').default)" />

      <example-card title="Background Color" name="BackgroundColor" :tag-parts="getTagParts(require('!!raw-loader!../examples/BackgroundColor.vue').default)">
      <q-markdown>
You can provide a background color with the `background-color` property. This is needed when the content of your QZoom does not fully fit the viewport of your browser.
      </q-markdown>
      </example-card>

      <example-card title="Portrait" name="Portrait" :tag-parts="getTagParts(require('!!raw-loader!../examples/Portrait.vue').default)">
      <q-markdown>
QZoom can handle portrait images.
      </q-markdown>
      </example-card>

      <example-card title="Video" name="Video" :tag-parts="getTagParts(require('!!raw-loader!../examples/Video.vue').default)">
      <q-markdown>
QZoom can also handle video content.
      </q-markdown>
      </example-card>

      <example-card title="Content" name="Content" :tag-parts="getTagParts(require('!!raw-loader!../examples/Content.vue').default)">
      <q-markdown>
You don't have to use just image. You can put whatever content you want into the QZoom slot.
      </q-markdown>
      </example-card>

      <example-card title="Restore on Scroll" name="RestoreOnScroll" :tag-parts="getTagParts(require('!!raw-loader!../examples/RestoreOnScroll.vue').default)">
      <q-markdown>
Normally, when content is Zoomed with QZoom, the scrollbars are turned off. If you turn on the `restore-on-scroll` property, the scrollbars (if any) will not be hidden. As well, when a scroll event takes place, if zommed, the content will automatically be restored.
      </q-markdown>
      </example-card>

      <example-card title="Scale" name="Scale" :tag-parts="getTagParts(require('!!raw-loader!../examples/Scale.vue').default)">
      <q-markdown>
When the `scale` property is turned on you can use the mouse wheel to zoom in and out of the content. Typically you would only want to use this with images.
      </q-markdown>
      </example-card>

      <example-card title="Initial Scale" name="InitialScale" :tag-parts="getTagParts(require('!!raw-loader!../examples/InitialScale.vue').default)">
      <q-markdown>
You can use the property `initial-scale` when `scale` is true, to set the scaling for the content. This is a number and needs to be between 0.05 and 10.
      </q-markdown>
      </example-card>

      <example-card title="Initial Scale Restricted" name="InitialScaleNoScale" :tag-parts="getTagParts(require('!!raw-loader!../examples/InitialScaleNoScale.vue').default)">
      <q-markdown>
If you use the property `no-wheel-scale` with the above example, you can restrict the ability for the user to scale.
      </q-markdown>
      </example-card>

      <example-card title="Scale Text" name="ScaleText" :tag-parts="getTagParts(require('!!raw-loader!../examples/ScaleText.vue').default)">
      <q-markdown>
If your content is text-based in nature, you can provide the `scale-text` property. Using the mouse wheel will increase/decrease the font size.
      </q-markdown>
      </example-card>

      <example-card title="Initial Scale Text" name="InitialScaleText" :tag-parts="getTagParts(require('!!raw-loader!../examples/InitialScaleText.vue').default)">
      <q-markdown>
You can use the property `initial-scale-text` when `scale-text` is true, to set the scaling for text. This is a percentage and needs to be between 50 and 500.
      </q-markdown>
      </example-card>

      <example-card title="Initial Scale Text Restricted" name="InitialScaleTextNoScale" :tag-parts="getTagParts(require('!!raw-loader!../examples/InitialScaleTextNoScale.vue').default)">
      <q-markdown>
If you use the property `no-wheel-scale` with the above example, you can restrict the ability for the user to scale.
      </q-markdown>
      </example-card>

      <example-card title="Manual" name="Manual" :tag-parts="getTagParts(require('!!raw-loader!../examples/Manual.vue').default)">
      <q-markdown>
When the property `manual` is set, then the automatic nature of QZoom is gone and everything must be done programmatically. However, you can still use the ESC key to restore the content.

::: tip
Click the `ZOOM` button to begin the zoom.
:::

::: tip
When the `manual` property is set, the cursor will not change to indicate the slotted content can be zoomed.
:::

::: tip
When the `no-center` property is set, the zoomed content will not be centered.
:::

      </q-markdown>
      </example-card>

    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
// import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import { getTagParts } from '@quasar/quasar-ui-qmarkdown'

export default {
  name: 'Examples',

  components: {
    Hero,
    // ExampleTitle,
    ExampleCard
  },

  data () {
    return {
      tempToc: []
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    this.addToToc('Basic')
    this.addToToc('Background Color')
    this.addToToc('Portrait')
    this.addToToc('Video')
    this.addToToc('Content')
    this.addToToc('Restore on Scroll')
    this.addToToc('Scale')
    this.addToToc('Initial Scale')
    this.addToToc('Initial Scale Restricted')
    this.addToToc('Scale Text')
    this.addToToc('Initial Scale Text')
    this.addToToc('Initial Scale Text Restricted')
    this.addToToc('Manual')

    this.toc = this.tempToc
  },

  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },

  methods: {
    getTagParts,
    addToToc (name, level = 1) {
      const slug = slugify(name)
      this.tempToc.push({
        children: [],
        id: slug,
        label: name,
        level: level
      })
    }
  }
}
</script>

<style lang="stylus">
.example-page
  padding: 16px 46px;
  font-weight: 300;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
</style>
