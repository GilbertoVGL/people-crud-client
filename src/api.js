import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getPeoples () {
    return this.execute('get', '/peoples')
  },
  getPeople (id) {
    return this.execute('get', `/peoples/${id}`)
  },
  createPeople (data) {
    console.log("data: ", data);
    return this.execute('post', '/peoples', data)
  },
  updatePeople (id, data) {
    console.log("We are in the API -> updatePeople!")
    console.log("id: ", id);
    console.log("data: ", data);
    return this.execute('put', `/peoples/${id}`, data)
  },
  deletePeople (id) {
    return this.execute('delete', `/peoples/${id}`)
  }
}