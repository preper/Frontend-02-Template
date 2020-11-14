import {Component, STATE, ATTRIBUTE} from './framework.js'
import {enableGesture} from './gesture.js'
import {Timeline, Animation} from './animation.js'
import {ease} from './ease.js'

export {STATE, ATTRIBUTE} from './framework.js'

export class Carousel extends Component {
    constructor() {
        super()
    }
    render() {
        this.root = document.createElement('div')
        this.root.classList.add('carousel')
        for (let record of this[ATTRIBUTE].src) {
            let child = document.createElement('div')
            child.style.backgroundImage = `url("${record.img}")`
            this.root.appendChild(child)
        }

        this[STATE].position = 0
        let children = this.root.children

        enableGesture(this.root)
        let t = 0
        let ax = 0
        let handler = null
        let timeline = new Timeline()
        timeline.start()

        this.root.addEventListener('start', event => {
            timeline.pause()
            clearInterval(handler)
            if (t > 0) {
                let progress = (Date.now() - t) / 500
                ax = ease(progress) * 400 - 400
            } else {
                ax = 0
            }
            t = 0
        })
        this.root.addEventListener('pan', event => {
            let x = event.clientX - event.startX - ax
            let current = this[STATE].position - ((x - x % 400) / 400)

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset
                pos = (pos % children.length + children.length) % children.length

                children[pos].style.transform = `translateX(${-400 * pos + 400 * offset + x % 400}px)`
            }
        })
        this.root.addEventListener('end', event => {
            timeline.reset()
            timeline.start()
            handler = setInterval(nextPicture, 3000)

            let x = event.clientX - event.startX - ax
            let current = this[STATE].position - ((x - x % 400) / 400)
            let direction = Math.round((x % 400) / 400)

            if (event.isFlick) {
                let delta = (x % 400) / 400
                if (delta > 0) {
                    direction = Math.ceil(delta)
                } else {
                    direction = Math.floor(delta)
                }
            }

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset
                pos = (pos % children.length + children.length) % children.length

                timeline.add(new Animation(children[pos].style, 'transform', -400 * pos + 400 * offset + x % 400, -400 * pos + 400 * offset + 400 * direction, 500, 0, ease, v => `translateX(${v}px)`))
            }

            this[STATE].position = this[STATE].position - ((x - x % 400) / 400) - direction
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length
            this.triggerEvent('change', {position: this[STATE].position})
        })
        this.root.addEventListener('tap', event => {
            this.triggerEvent('click', {
                data: this[ATTRIBUTE].src[this[STATE].position],
                position: this[STATE].position
            })
        })

        let nextPicture = () => {
            let children = this.root.children
            let nextIndex = (this[STATE].position + 1) %  children.length

            let current = children[this[STATE].position]
            let next = children[nextIndex]

            t = Date.now()

            timeline.add(new Animation(current.style, 'transform', -400 * this[STATE].position, -400 * this[STATE].position - 400, 500, 0, ease, v => `translateX(${v}px)`))
            timeline.add(new Animation(next.style, 'transform', -400 * nextIndex + 400, -400 * nextIndex, 500, 0, ease, v => `translateX(${v}px)`))

            this[STATE].position = nextIndex
            this.triggerEvent('change', {position: this[STATE].position})
        }

        handler = setInterval(nextPicture, 3000)

        return this.root
    }
}
