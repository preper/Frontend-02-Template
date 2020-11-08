import {Component} from './framework.js'

export class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }
    setAttribute(name, value) {
        this.attributes[name] = value
    }
    render() {
        this.root = document.createElement('div')
        this.root.classList.add('carousel')
        for (let record of this.attributes.src) {
            let child = document.createElement('div')
            child.style.backgroundImage = `url("${record}")`
            this.root.appendChild(child)
        }

        let position = 0

        this.root.addEventListener('mousedown', event => {
            let children = this.root.children
            let startX = event.clientX

            let move = event => {
                let x = event.clientX - startX
                let current = position - ((x - x % 400) / 400)

                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset
                    pos = (pos + children.length) % children.length

                    children[pos].style.transition = 'none'
                    children[pos].style.transform = `translateX(${-400 * pos + 400 * offset + x % 400}px)`
                }
            }
            let up = event => {
                let x = event.clientX - startX
                position = (position - Math.round(x / 400) + children.length) %  + children.length

                // TODO: 拖到刚好一半(200像素)时图片卡屏
                for (let offset of [0, Math.sign(x - 200 * Math.sign(x))]) {
                    let pos = position + offset
                    pos = (pos + children.length) % children.length

                    children[pos].style.transition = ''
                    children[pos].style.transform = `translateX(${-400 * pos + 400 * offset}px)`
                }
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })

        // let currentIndex = 0
        // setInterval(() => {
        //     let children = this.root.children
        //     let nextIndex = (currentIndex + 1) %  children.length

        //     let current = children[currentIndex]
        //     let next = children[nextIndex]

        //     next.style.transition = 'none'
        //     next.style.transform = `translateX(${100 - 100 * nextIndex}%)`

        //     // TODO: 为什么用两次requestAnimationFrame
        //     requestAnimationFrame(() => {
        //         requestAnimationFrame(() => {
        //             next.style.transition = ''
        //             current.style.transform = `translateX(${-100 - 100 * currentIndex}%)`
        //             next.style.transform = `translateX(${-100 * nextIndex}%)`

        //             currentIndex = nextIndex
        //         })
        //     })
            
        // }, 3000)

        return this.root
    }
    mountTo(parent) {
        parent.appendChild(this.render(parent))
    }
}
