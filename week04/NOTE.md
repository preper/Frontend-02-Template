# 学习笔记

## 状态机

### KMP算法

输入S(主字符串)，W(匹配词)

整个算法以两个整数标识位m(主字符串的查找位置), i(匹配词当前比较的字符位置)决定。

需要事先根据W计算出最小匹配表T，算法：

1. T[0] = -1, T[1] = 0, 领j = 0
2. 比较W[n - 1]与W[j]，相等则令T[n] = j，进入3；否则令j = T[j]，重复此步
3. n++，n < W.length - 1时，重复2；否则，输出T

比较算法：

1. m = 0, i = 0;
2. 比较S[m] W[i], 如果相等进入3，不相等进入4
3. i++ ，如果i等于W.length，返回true,如果不等于，
   m++, 如果m等于S.length, 返回false，如果不等于则进行2
4. 根据部分匹配表使i = T[i], 如果此时i === -1则进行3，否则进行2

## HTTP请求

ISO-OSI 七层网络模型：应用 表示 会话 传输 网络 数据链路 物理层

TCP 流 端口
IP  数据包 IP地址

HTTP Request -> Response 1对1

Request: 
1. Request line，method path /HTTP/version
2. headers 多行，每一行是key: value组合的键值对，以一个空行结束
   content-type、content-length是必要值
3. body 格式由content-type决定

Response:
1. status line /HTTP/version 状态码 状态文本
2. headers 多行，每一行是key: value组合的键值对，以一个空行结束
3. body 格式由content-type决定
   chunked body node默认返回body的格式，由一个16进制数单独占一行，然后是内容，最后以0结束
