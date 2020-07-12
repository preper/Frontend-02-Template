# 学习笔记

本周学习了很多基础知识。但其实有一半都属于编程通识课。

## 编程通识

虽然这部分叫做JS通识，但我觉得这部分其实属于编程通识。这部分知识属于深挖可以学很久的知识。延伸出去可以深入学习编译原理、操作系统等等。这部分知识并不能指望一周之内就能深入了解，所以我觉得我能看懂，暂时就足够了。第二课的练习其实我也不知道自己做的对不对，但已经能看懂题干了。

``` html
<MultiplicativeExpression> ::= <Number> |
  <MultiplicativeExpression> "*" <Number> |
  <MultiplicativeExpression> "/" <Number>
    
<AddtiveExpression> ::= <MultiplicativeExpression> |
  <AddtiveExpression> "+" <MultiplicativeExpression> |
  <AddtiveExpression> "-" <MultiplicativeExpression>

<BracketsExpression> ::= "(" <AddtiveExpression> ")" |
  <BracketsExpression> "+" <BracketsExpression> |
  <BracketsExpression> "-" <BracketsExpression> |
  <BracketsExpression> "*" <BracketsExpression> |
  <BracketsExpression> "/" <BracketsExpression>
```

这是我最初的答案，写完的时候还觉得自己写的很巧妙。首先题干里标明了“带括号”，所以我的式子就完全没考虑“不带括号”的情况，算是玩文字游戏了。然后类比老师的式子里把带括号的四则运算式当作一个基本单位，然后对两个带括号的四则运算式进行加减乘除，因为可以递归所以就可以表示所有带括号的四则运算式了。但在群里看到了不能以自身作为结尾，不然会导致无限递归，所以后来我又改成了这样

``` html
<BracketsExpression> ::= "(" <AddtiveExpression> ")" |
  <BracketsExpression> "+" "(" <AddtiveExpression> ")" |
  <BracketsExpression> "-" "(" <AddtiveExpression> ")" |
  <BracketsExpression> "*" "(" <AddtiveExpression> ")" |
  <BracketsExpression> "/" "(" <AddtiveExpression> ")"
```

实际上还是上面的思路，不过换了一种写法。写到这其实就发现一些问题了。比如+-后面的四则运算也可以不带括号。但我觉得正确答案应该是一个并不复杂的式子，越写越多却又感觉越来越不对，所以我就到此打住，没深入研究了。

这部分知识我暂时达到了基本可以看懂的程度，写还是半吊子，重学前端结束后可以回过头来深入学习编译原理，继续夯实基础。

## JS类型、对象

这部分复习了js的7种语言类型 Undefined、Null、Boolean、Number、String、Symbol、Object。主要讲了Number和String，Number提到了双精度浮点数数的编码方式和js里2、8、16、10进制的整数表示法；String提到了字符的编码方式，深入的讲解了ASCII、UTF8、UTF16编码，还提到了字符串的三种表示方式（'', "", ``）

关于对象初步讲解了类、继承和方法。JavaScript语言是基于原型继承，与之相对的，Java等语言是基于类继承。但由于ES6有了class语法糖，我们可以写类似于Java的基于类继承的代码。

“找出 JavaScript 标准里面所有具有特殊行为的对象”这个作业不知道怎么做。这部分完全是看到一个知道一个，不知道去哪找相关的内容。
