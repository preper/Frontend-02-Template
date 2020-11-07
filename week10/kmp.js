// 循环KMP算法
// 这里复用了第四周写的KMP算法，按照英文KMP维基百科优化了PMT的取值
function match (S, W) {
    if (!W) return 0
    else if (!S) return -1

    function PMT  (str) {
        let i = 0
        let j = -1
        let T = [-1]
    
        while (i < str.length - 1) {
            if (j === -1 || str[i] === str[j]) {
                i++
                j++
                if (str[i] === str[j]) { // 如果字符相同可以减少判断次数
                    T.push(T[j])
                } else {
                    T.push(j)
                }
            } else {
                j = T[j]
            }
        }
    
        return T
    }

    let T = PMT(W)
    let m = 0
    let i = 0
    while (m < S.length) {
      if (i === -1 || S[m] === W[i]) {
        i++
        m++
        if (i === W.length) {
          return m - i
        }
      } else {
        i = T[i]
      }
    }

    return -1
  }

