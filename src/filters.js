export default {
  formatDate: function (timeStr) {
    const time = new Date(timeStr)
    const year = time.getFullYear()
    const month = time.getMonth()
    const date = time.getDate()
    const hour = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()
    return `${year}-${month}-${date}/${hour}:${minute}:${second}`
  },
  formatSaleStatus: function (val) {
    return val ? '已上架' : '已下架'
  }
}
