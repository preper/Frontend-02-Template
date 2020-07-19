# 学习笔记

## JS表达式

Reference 引用类型，js运行时取对象取到的是对象的引用，就是Reference类型。Reference类型当进行普通操作时会解引用，但在做assing和delete操作时会用到Reference。（TODO）

Left Handside & Right Handside：能放到等号左边的表达式是Left Handside Expressions。而在js中，Left Handside Expressions一定是Right Handside Expressions

### 类型转换

Object to String/Number/Boolean 拆箱转换：
  Symbol.toPrimitive(优先级最高)、toString、valueOf根据情况调用
String/Number/Boolean to Object 装箱转换：
  基础类型的包装类型

String to Number && Number to String
  课后练习，意思理解了但写起来有些考虑不周

运算符优先级从高到底分别为：

### Member
  a.b、a[b]
  foo`string` (把string当作参数传入函数并执行，字符串部分是第一个参数，每个${}变量是一个新的参数)
  super.b、super[b] (class构造器内的关键字)
  new.target (用来检测函数或构造方法是否是通过new运算符被调用)
  new Foo()

### new
  new Foo

> new Foo 带括号和不带括号之所以放在两个优先级内，是为了处理 new a()() 和 new new a() 这两个case。

### Call

  foo()
  super()
  foo()['b']、foo().b、foo()`abc`

> foo()['b']表达式降级为Call，语法结构表达的内容多于运算符优先级。

### Update(从这开始都不是Left Handside Expressions)

  a ++、a --
  -- a、++ a

### Unary(单目运算符)
  delete a.b
  void foo()
  typeof a
  + a
  - a
  ~ a
  ! a
  await a

### Exponental
  ** (javascript唯一的右结合运算符，乘方)

### Multiplicative
  */%

### Additive
  +-

### Shift
  << >> >>>

### Relationship
  < > <= >= instanceof in

### Equality
  == != === !==

### Bitwise
  & ^ |

### Logical
  && ||

### Conditional
  ?:

## JS语句

Completion Record 完成记录 运行时的类型 具象为函数运行时每个语句的结果更容易理解
[[type]] normal break continue return throw
[[value]] 函数返回值
[[target]] 函数的label

预处理：代码执行前js引擎会先进行一次预先处理，优先执行某些语句
作用域：var函数作用域，let const块级作用域

### 简单语句

ExpressionStatement
EmptyStatement
DebuggerStatement
ThrowStatement
ContinueStatement  [[type]] continue [[value]] -- [[target]] label
BreakStatement  [[type]] break [[value]] -- [[target]] label
ReturnStatement
基本看见名字就能知道是什么语句

### 复合语句

BlockStatement 大括号括起来的语句块  [[type]] normal [[value]] -- [[target]] --
IfStatement 条件语句
SwitchStatement 多分支条件，JS里性能和if没区别，不推荐使用
IterationStatement 循环语句，因为可以接简单语句所以以下大括号可以省略
  while () {}
  do {} while ()
  for ( ; ; ) {}
  for ( in ) {}
  for ( of ) {} 遍历可迭代对象的值
  for await ( of ) (TODO)
  所有语句都有有in的版本和没有in的版本 (?)
LabellledStatement 语句前加label，配合循环语句和break，continue使用
TryStatement 三段结构，大括号不可省略  [[type]] return [[value]] -- [[target]] label
try {} catch () {} finally {} finally里的语句不会被return打断
WithStatement with语句，可以节约空间但可能导致安全问题，不推荐

### 声明

分类和标准有区别

FunctionDeclaration
GeneratorDeclaration
AsyncFunctionDeclarationn
AsyncGeeneratorDeclarationn
VariableStatement  var，被认为是简单语句
ClassDeclaration
LexicalDeclaration  const let

function, function *, async function, async function *, var, 会被预处理
class, const, let 声明前使用会报错

## JS结构化

变量 表达式 语句/声明 ｜ 函数调用 微任务 宏任务

函数调用：js模块间是栈式调用关系，不能跨栈访问
变量放在模块的执行上下文Executin Context里，当前执行模块的变量在Running Executin Context里
执行上下文：
Generator： generator，函数背后隐藏的字段，只有generator有
code evaluation state： async, generator, 代码执行到哪
Function：Function 初始化的会有
Script or Module： script或者module，只有两种上下文
LexicalEnvironment： 保存执行代码的变量，除了 let const 还包括 this new.target super
VariableEnvironment： 保存执行代码的var变量，历史包袱
Realm： 保存所有内置对象的地方 (TODO)

闭包：每个函数都会生成一个闭包，包含代码和环境(Environment)，在函数之外的变量定义会形成更高级的环境(Environment)即作用域链，箭头函数的环境还包括this

Environment Records   Declarative Environment Records 花括号   Function Environment Records 函数
                                                              Module Environment Records 模块
                      Global Environment Records 全局
                      Object Environment Records with


微任务：Promise, async 产生微任务
宏任务：多个微任务整体是一个宏任务

事件循环：获取代码 -> 执行 -> 等待
