// 思路：取消transition==》设置height：auto==》
// 获取容器真实height==》设置height：0==》
// 设置transition==》触发浏览器重排==》
// 设置容器真实height
const openAndClose = element => {
  if (window.getComputedStyle(element).height === '0px') {
    // mac Safari下，貌似auto也会触发transition, 故要none下~
    element.style.transition = 'none'
    element.style.height = 'auto'
    const targetHeight = window.getComputedStyle(element).height
    element.style.transition = 'height 1000ms'
    element.style.height = '0px'
    console.log(element.offsetWidth) // 触发浏览器重排
    element.style.height = targetHeight
  } else {
    element.style.height = '0px'
  }
}

export default { openAndClose }
