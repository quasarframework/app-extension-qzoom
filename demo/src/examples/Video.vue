<template>
  <div>
    <figure>
      <q-zoom
        background-color="blue-grey-1"
      >
        <video class="my-image" poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>
          <source type="video/webm" src="https://cdn.quasar.dev/img/polina.webm">
          <source type="video/mp4" src="https://cdn.quasar.dev/img/polina.mp4">
        </video>
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
