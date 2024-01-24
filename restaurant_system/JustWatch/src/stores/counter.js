// import axios from 'axios'
import { defineStore } from 'pinia'

export const useStore = defineStore('Search', {
  state: () => {
    return {
      userid: '',
      categorycard: []
    }
  },
  actions: {}
})
