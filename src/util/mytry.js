// 自己写的棋子羁绊计数方法 过于繁重
export const countChess = origin => {
  const ready = []
  origin.forEach(item => {
    ready.push(...item.races.split(','))
  })
  console.log(ready)
  const result = [{ name: 1, num: -1 }]
  ready.forEach(item => {
    let num = 0
    let start = 0
    let flag = true

    while (flag) {
      start = ready.indexOf(item, start) + 1
      console.log(start)
      if (start === 0) {
        flag = false
        break
      }
      num++
    }
    let add = true
    result.forEach(i => {
      if (i.name === item) {
        add = false
      }
    })
    if (add) {
      result.push({ name: item, num: num })
    }
  })

  console.log(result.splice(1))
}
