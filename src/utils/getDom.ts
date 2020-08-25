import Taro from '@tarojs/taro'

export default (nodeName: string) => {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery()
    query.selectAll(nodeName).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      resolve(res)
    })
  })
}
