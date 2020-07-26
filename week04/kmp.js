// 提交练习后刷新页面练习经常丢失，所以在这里备份一下

// 循环KMP算法
function match (S, W) {
  if (!W) return 0
  else if (!S) return -1
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

// 多次重复比较，效率低
// function PMT (str) {
//   let hasMatched = false
//   const T = []
//   for (let i = 0; i < str.length; i++) {
//     if (i === 0) {
//       T.push(-1)
//     } else if (i === 1) {
//       T.push(0)
//     } else {
//       for (let k = i - 1; k > 0; k--) {
//         if (str.slice(0, k) === str.slice(i - k, i)) {
//           hasMatched = true
//           T.push(k)
//           break
//         }
//       }
//       if (hasMatched) {
//         hasMatched = false
//       } else {
//         T.push(0)
//       }
//     }
//   }
//   // PMT优化
//   T.forEach((item, index) => {
//     if (str[index] === str[item]) {
//       T[index] = T[item]
//     }
//   })

//   return T
// }

// 状态机KMP算法
