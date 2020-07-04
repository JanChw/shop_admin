import axios from 'axios'

axios.interceptors.request.use((config) => {
  config.baseURL = process.env.BASE_URL
  // config.validateStatus = status => status < 500
  const token = window.localStorage.getItem('token')
  const common = config.headers.common
  if (token && !Object.prototype.hasOwnProperty.call(common, 'Authorization')) {
    common.Authorization = `Bearer ${token}`
  }
  return config
}, (err) => {
  console.log(err)
})

axios.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  console.log(err)
})

export default axios
