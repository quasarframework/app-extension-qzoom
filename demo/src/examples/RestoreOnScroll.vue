<template>
  <div>
    <figure>
      <q-zoom
        background-color="blue-grey-1"
        restore-on-scroll
      >
        <img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          alt="QZoom with restore on scroll"
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
</style>
