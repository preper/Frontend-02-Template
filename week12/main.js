import {createElement} from './framework.js'
import {Carousel} from './carousel.js'

let imgArr = [
    'https://i.redd.it/wxq79d9yb5731.jpg',
    'https://i.chzbgr.com/full/4339564544/hBC25C325/nosy-toucan',
    'https://i.pinimg.com/originals/98/2b/a9/982ba97e4d7b4940bccd9f0547cf51ab.jpg',
    'https://i.pinimg.com/474x/15/f4/bb/15f4bbd1af4fafd518ebb2ae196779c4.jpg',
    'https://i.pinimg.com/474x/95/b9/bb/95b9bbc95f091b803b56c5383490482f.jpg'
]

let a = <Carousel src={imgArr}/>
a.mountTo(document.body)
