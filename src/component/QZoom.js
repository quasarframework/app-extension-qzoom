import Vue from 'vue'

// Styles
import './zoom.styl'

// Utils
import { Colorize } from 'quasar-mixin-colorize'
import { dom } from 'quasar'
const { offset } = dom

export default function (ssrContext) {
  return Vue.extend({
    name: 'q-zoom',

    mixins: [Colorize],

    props: {
      backgroundColor: {
        type: String,
        default: 'white'
      },
      restoreOnScroll: Boolean,
      manual: Boolean,
      scale: Boolean,
      initialScale: {
        type: Number,
        default: 1.0,
        validator: v => v >= 0.05 && v <= 10
      },
      scaleText: Boolean,
      initialScaleText: {
        type: Number,
        default: 100,
        validator: v => v >= 50 && v <= 500
      },
      noCenter: Boolean,
      noWheelScale: Boolean
    },

    data () {
      return {
        vComponent: void 0,
        canShow: false,
        zooming: false,
        zoomed: false,
        restoring: false,
        bgColor: 'transparent',
        position: void 0,
        scaleValue: 1.0,
        scaleTextValue: 100
      }
    },

    mounted () {
      // add scroll handler
      document.addEventListener('scroll', this.onScroll, { passive: true })
    },

    beforeDestroy () {
      // remove scroll handler
      document.removeEventListener('scroll', this.onScroll, { passive: true })
    },

    computed: {
      isTransitioning () {
        return this.zooming === true || this.zoomed === true || this.restoring === true
      },
      isZoomed () {
        return this.zoomed === true || this.zooming === true
      }
    },

    methods: {
      show () {
        this.$emit('before-zoom')
        this.zooming = true
        this.zoomed = false
        this.restoring = false

        // get current position
        this.position = this.getPosition()

        setTimeout(() => {
          this.bgColor = this.backgroundColor
        }, 100)

        setTimeout(() => {
          this.position = this.getFullScreenPosition()
          this.zoomed = true
          if (this.restoreOnScroll !== true) {
            this.addClass(document.body, 'q-zoom__no-scroll')
          }
          // adjust initial scaling
          if (this.scale === true && this.scaleText !== true) {
            this.setScale(this.initialScale)
          }
          if (this.scaleText === true && this.scale !== true) {
            this.setScaleText(this.initialScaleText)
          }
          this.$emit('zoomed')
        }, 500)
      },

      hide () {
        this.$emit('before-restore')
        this.restoring = true
        this.zoomed = false
        this.zooming = false

        // reset scaling
        this.setScale(1.0)
        this.setScaleText(100)

        this.position = this.getPosition()
        setTimeout(() => {
          this.resetTransition()
          this.removeClass(document.body, 'q-zoom__no-scroll')
          this.$emit('restored')
        }, 400)
      },

      toggle () {
        if (this.isZoomed) {
          this.hide()
        } else {
          this.show()
        }
      },

      setScale (val) {
        if (val === this.scaleValue) return
        if (val >= 0.05 && val <= 10) {
          this.scaleValue = val
          this.$emit('scale', this.scaleValue)
        }
      },

      setScaleText (val) {
        if (val === this.scaleTextValue) return
        if (val >= 50 && val <= 500) {
          this.scaleTextValue = val
          this.$emit('scale-text', this.scaleTextValue)
        }
      },

      onScroll (e) {
        if (this.isZoomed === true && this.restoreOnScroll === true) {
          this.hide()
          e.preventDefault()
        }
      },

      onClick (e) {
        if (this.manual !== true) {
          this.toggle()
          e.preventDefault()
        }
      },

      wheelEvent (e) {
        if (this.noWheelScale !== true) {
          if (this.isZoomed === true && this.scale === true && this.scaleText !== true) {
            let less = this.scaleValue > 1 ? -0.5 : -0.1
            let more = this.scaleValue > 1 ? 0.5 : 0.1
            let val = (e.wheelDeltaY < 0 ? less : more)
            this.setScale(this.scaleValue + val)
            e.preventDefault()
          } else if (this.isZoomed === true && this.scaleText === true && this.scale !== true) {
            let val = (e.wheelDeltaY < 0 ? -1 : 1)
            this.setScaleText(this.scaleTextValue + val)
            e.preventDefault()
          }
        }
      },

      addClass (el, name) {
        let arr = el.className.split(' ')
        // make sure it's not already there
        if (arr.indexOf(name) === -1) {
          arr.push(name)
          el.className = arr.join(' ')
        }
      },

      removeClass (el, name) {
        let arr = el.className.split(' ')
        let index = arr.indexOf(name)
        if (index !== -1) {
          arr.splice(index, 1)
          el.className = arr.join(' ')
        }
      },

      resetTransition () {
        this.zoomed = false
        this.zooming = false
        this.restoring = false
        this.bgColor = 'transparent'
        this.scaleValue = 1.0
        this.scaleTextValue = 100
      },

      getPosition () {
        let position = offset(this.$el)
        position.left = position.left + 'px'
        position.top = position.top + 'px'
        position.width = this.$el.clientWidth + 'px'
        position.height = this.$el.clientHeight + 'px'

        return position
      },

      getFullScreenPosition () {
        return { left: 0, top: 0, width: '100%', height: '100%' }
      },

      deepClone (vnodes, createElement) {
        function cloneVNode (vnode) {
          const clonedChildren = vnode.children && vnode
            .children
            .map(vnode => cloneVNode(vnode))
          const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
          cloned.text = vnode.text
          cloned.isComment = vnode.isComment
          cloned.componentOptions = vnode.componentOptions
          cloned.elm = vnode.elm
          cloned.context = vnode.context
          cloned.ns = vnode.ns
          cloned.isStatic = vnode.isStatic
          cloned.key = vnode.key
          return cloned
        }
        const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
        return clonedVNodes
      },

      __renderOverlayContent (h) {
        // let slot = this.$scopedSlots.default
        let slot = this.$slots.default

        // let vNode = this.vComponent.context.$vnode
        return h('div', this.setBackgroundColor(this.backgroundColor, {
          staticClass: 'q-zoom__content' +
            (this.noCenter === true ? ' q-zoom__no-center' : ''),
          style: {
            left: this.position.left,
            top: this.position.top,
            width: this.position.width,
            height: this.position.height,
            transform: this.scale === true && this.scaleText !== true && `scale(${this.scaleValue})`,
            fontSize: this.scaleText === true && this.scale !== true && `${this.scaleTextValue}%`
          }
        }), [
          // slot({ zoomed: this.isZoomed })
          slot
        ])
      },

      __renderOverlay (h) {
        if (this.isTransitioning !== true) return ''

        return h('div', this.setBackgroundColor(this.bgColor, {
          staticClass: 'q-zoom__overlay' +
            (this.manual !== true ? ' q-zoom__zoom-out' : '')
        }), [
          this.__renderOverlayContent(h)
        ])
      }
    },

    render (h) {
      // let slot = this.$scopedSlots.default
      let slot = this.$slots.default

      return h('div', {
        staticClass: 'q-zoom' +
          (this.manual !== true ? ' q-zoom__zoom-in' : ''),
        on: {
          click: this.onClick,
          mousewheel: this.wheelEvent
        }
      }, [
        // the original slot is basically read-only and cannot be modified
        ...this.deepClone(slot, h),
        // slot({ zoomed: this.isZoomed }),
        this.isTransitioning && this.__renderOverlay(h)
      ])
    }
  })
}
