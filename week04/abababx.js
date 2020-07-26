// 提交练习后刷新页面练习经常丢失，所以在这里备份一下

function match (string) {
  let state = start
  for (let c of string) {
    state = state(c)
  }
  return state === end
}

function start (c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end () {
  return end
}

function foundA (c) {
  if (c === 'b') {
    return foundAB
  } else {
    return start(c)
  }
}

function foundAB (c) {
  if (c === 'a') {
    return foundABA
  } else {
    return start
  }
}

function foundABA (c) {
  if (c === 'b') {
    return foundABAB
  } else {
    return start(c)
  }
}

function foundABAB (c) {
  if (c === 'a') {
    return foundABABA
  } else {
    return start
  }
}

function foundABABA (c) {
  if (c === 'b') {
    return foundABABAB
  } else {
    return start(c)
  }
}
function foundABABAB (c) {
  if (c === 'x') {
    return end
  } else {
    return foundABAB(c)
  }
}
