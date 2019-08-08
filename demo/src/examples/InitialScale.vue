<template>
  <div >
    <figure>
      <q-zoom
        background-color="blue-grey-1"
        scale
        :initial-scale="5"
      >
        <img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          alt="QZoom with scale"
          class="my-image"
        >
      </q-zoom>
      <figcaption>This is the "figcaption"</figcaption>
    </figure>
  </div>
</template>

<style lang="stylus">
.my-image
  width 100%
  height auto
  max-width 100%
  max-height 100%
  margin auto
</style>
