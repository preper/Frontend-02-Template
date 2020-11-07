let $ = Symbol('$')

class Trie {
    constructor() {
        this.root = Object.create(null)
    }
    insert(word) {
        let node = this.root
        for (let c of word) {
            if (!node[c]) {
                node[c] = Object.create(null)
            }
            node = node[c]
        }
        if (!($ in node)) {
            node[$] = 0
        }
        node[$]++
    }
    most() {
        let max = 0
        let maxWord = null
        let visit = (node, word) => {
            if (node[$] && node[$] > max) {
                max = node[$]
                maxWord = word
            }
            for (let p in node) {
                visit(node[p], word + p)
            }
        }
        visit(this.root, '')
        this.getMaxList(max)
    }
    getMaxList(num) {
        let visit = (node, word) => {
            if (node[$] && node[$] === num) {
                console.log(word, node[$])
            }
            for (let p in node) {
                visit(node[p], word + p)
            }
        }
        visit(this.root, '')
    }
}

function randowWord(length) {
    let s = ''
    for (let i = 0; i < length; i++) {
        s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
    }
    return s
}

let trie = new Trie()

for (let i = 0; i < 100000; i++) {
    trie.insert(randowWord(4))
}
