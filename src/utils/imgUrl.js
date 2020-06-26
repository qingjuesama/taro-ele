// 处理图片地址
export default url => {
  const BASEURL = 'https://cube.elemecdn.com/'
  let types = ['jpeg', 'jpg', 'png', 'gif']
  let str = ''
  let type = ''

  for (let i = 0; i < url.length; i++) {
    if (i === 1) {
      str += '/'
    } else if (i === 3) {
      str += '/'
    }
    str += url[i]
  }

  for (let i = 0; i < types.length; i++) {
    if (url.includes(types[i])) {
      type = types[i]
    }
  }

  return BASEURL + str + '.' + type
}
