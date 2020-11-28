var assert = require('assert')
import {parseHTML} from '../src/parser.js'

describe('parse html:', function() {
    it('<a></a>', function() {
        let tree = parseHTML('<a></a>')
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })

    it('<a href="//time.geekbang.org"></a>', function() {
        let tree = parseHTML('<a href="//time.geekbang.org"></a>')
        assert.equal(tree.children.length, 1)
        assert.equal(tree.children[0].attributes[0].name, "href")
        assert.equal(tree.children[0].attributes[0].value, "//time.geekbang.org")
    })

    it('<input checked />', function() {
        let tree = parseHTML('<input checked />')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<input focus checked />', function() {
        let tree = parseHTML('<input focus checked />')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<input checked id="test" />', function() {
        let tree = parseHTML('<input checked id="test"/>')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<input id=\'test\' checked />', function() {
        let tree = parseHTML('<input id=\'test\' checked />')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<input id=test checked />', function() {
        let tree = parseHTML('<input id=test checked />')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<input />', function() {
        let tree = parseHTML('<input />')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<input \n />', function() {
        let tree = parseHTML('<input \n />')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<a>123</a>', function() {
        let tree = parseHTML('<a>123</a>')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })

    it('<>', function() {
        let tree = parseHTML('<>')
        console.log(tree)
        assert.equal(tree.children.length, 1)
    })
})
