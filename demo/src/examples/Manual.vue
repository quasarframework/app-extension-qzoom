<template>
  <div>
    <q-btn
      color="primary"
      label="Zoom"
      flat
      @click="menuClicked"
    />
    <q-zoom
      ref="zoom"
      manual
      no-center
      scale-text
      background-color="blue-grey-1"
      style="height: 600px; width: 100%"
    >
        <div class="fit">
          <q-layout view="lhh LpR lff" container style="height: 100%" class="shadow-2 rounded-borders">
            <q-header reveal class="bg-black">
              <q-toolbar>
                <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
                <q-toolbar-title>Header</q-toolbar-title>
                <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
              </q-toolbar>
            </q-header>

            <q-footer>
              <q-toolbar>
                <q-toolbar-title>Footer</q-toolbar-title>
              </q-toolbar>
            </q-footer>

            <q-drawer
              v-model="drawerLeft"
              :width="350"
              :breakpoint="700"
              bordered
              content-class="bg-grey-3"
            >
              <q-scroll-area class="fit">
                <div class="q-pa-sm">
                  <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
                </div>
              </q-scroll-area>
            </q-drawer>

            <q-drawer
              side="right"
              v-model="drawerRight"
              bordered
              :width="350"
              :breakpoint="500"
              content-class="bg-grey-3"
            >
              <q-scroll-area class="fit">
                <div class="q-pa-sm">
                  <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
                </div>
              </q-scroll-area>
            </q-drawer>

            <q-page-container>
              <q-page style="padding-top: 60px" class="q-pa-md">
                <q-markdown>
  Some information about **QZoom**:
  1. You can Zoom anything, from images, to video or any content
  2. Perfect for accessible sites
  3. Great for creating blogs with image call-outs
                  </q-markdown>

                  <q-page-sticky position="top" expand class="bg-accent text-white">
                    <q-toolbar>
                      <q-btn flat round dense icon="map" />
                      <q-toolbar-title>Title</q-toolbar-title>
                    </q-toolbar>
                  </q-page-sticky>
                </q-page>

                <q-page-scroller position="bottom">
                  <q-btn fab icon="keyboard_arrow_up" color="red" />
                </q-page-scroller>
              </q-page-container>
            </q-layout>
          </div>
    </q-zoom>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawerLeft: false,
      drawerRight: false
    }
  },
  methods: {
    menuClicked () {
      this.$refs.zoom.show()
    }
  }
}
</script>
