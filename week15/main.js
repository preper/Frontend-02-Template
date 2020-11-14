import {createElement} from './framework.js'
import {Carousel} from './Carousel.js'
// import {Button} from './Button.js'
// import {List} from './List.js'

let imgArr = [
    {
        img: 'https://i.redd.it/wxq79d9yb5731.jpg',
        url: 'https://cn.bing.com'
    },
    {
        img: 'https://i.chzbgr.com/full/4339564544/hBC25C325/nosy-toucan',
        url: 'https://cn.bing.com'
    },
    {
        img: 'https://i.pinimg.com/originals/98/2b/a9/982ba97e4d7b4940bccd9f0547cf51ab.jpg',
        url: 'https://cn.bing.com'
    },
    {
        img: 'https://i.pinimg.com/474x/15/f4/bb/15f4bbd1af4fafd518ebb2ae196779c4.jpg',
        url: 'https://cn.bing.com'
    },
    {
        img: 'https://i.pinimg.com/474x/95/b9/bb/95b9bbc95f091b803b56c5383490482f.jpg',
        url: 'https://cn.bing.com'
    }
]

let a = <Carousel src={imgArr}
    onChange={event => console.log(event.detail.position)}
    onClick={event => window.location.href = event.detail.data.url}/>
a.mountTo(document.body)

// let b = (<Button>content</Button>)
// b.mountTo(document.body)

// let l = (<List data={imgArr}>
//     {record => <div>
//         <img src={record.img} />
//         <a href={record.url}>测试</a> 
//     </div>}
// </List>)
// l.mountTo(document.body)
