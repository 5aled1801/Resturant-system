<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <navbar />
  <v-container class="mt-8">
    <v-row class="d-flex justify-space-between">
      <v-btn v-if="categorylist.length > 0" color="green-darken-4" @click="gotoitem()"
        >Add Item</v-btn
      >

      <div class="text-center">
        <h1>{{ nameDet }}</h1>
        <p class="text-muted">{{ addressDet }}</p>
      </div>
      <!-- <router-link :to="{ name: 'ViewCategory' }"
        > -->
      <v-btn @click="generateRoute()" color="green-darken-4"> View / Add Category</v-btn>
      <!-- </router-link> -->
    </v-row>
    <v-row v-for="cat in categorylistWithItems" :key="cat.id" class="mt-16">
      <div class="w-100">
        <h1
          class="header-cont text-center"
          style="
            background: linear-gradient(45deg, #5c5c5c, #000000);
            padding: 10px;
            color: white;
            border-radius: 11px;
          "
        >
          {{ cat.name }}
        </h1>
        <template v-if="listofItem && listofItem.length > 0">
          <div
            :style="{
              display: 'flex',
              'justify-content': listofItem.length == 2 ? 'space-around' : 'start',
              'padding-top': '40px',
              'flex-wrap': 'wrap',
              'min-height': '250px'
            }"
          >
            <router-link :to="{ name: 'DelletAllItem', params: { catID: cat.id } }">
              <v-btn
                style="position: absolute; left: 50%; transform: translateX(-50%)"
                color="error"
                >Delete All</v-btn
              >
            </router-link>
            <v-col
              cols="4"
              v-for="item in listofItem"
              :key="item.id"
              style="border-radius: 10px; padding: 10px; margin-top: 50px"
              v-show="cat.id == item.categoryId"
            >
              <div class="category-item">
                <div style="min-width: 260px; padding-inline: 20px">
                  <h4>{{ item.name }}</h4>
                  <br />
                  <p style="font-size: 14px; color: gray; max-width: 260px; min-height: 150px">
                    {{ item.description }}
                  </p>
                  <br />
                  <div style="display: flex; justify-content: space-between">
                    <span class="float-start" style="font-size: 14px; color: gray"
                      >Price: ${{ item.price }}</span
                    >
                    <span class="float-end" style="font-size: 14px; color: gray"
                      >Quantity: {{ item.qtt }}</span
                    >
                  </div>
                  <div class="action mt-5 d-flex justify-space-between">
                    <router-link :to="{ name: 'UpdateItem', params: { itemID: item.id } }">
                      <v-btn color="blue">Update</v-btn>
                    </router-link>
                    <router-link :to="{ name: 'DeleteItem', params: { itemID: item.id } }">
                      <v-btn color="error">Delete</v-btn>
                    </router-link>
                  </div>
                </div>
              </div>
            </v-col>
          </div>
        </template>

        <template><p>No Items is found</p></template>
      </div>
    </v-row>
  </v-container>
</template>
<script>
import navbar from '@/components/public/navbar.vue'
import axios from 'axios'

// import { handleError } from 'vue'
export default {
  components: {
    navbar
  },

  data() {
    return {
      userId: '',
      username: '',
      categorylist: [],
      IDlocation: '',
      listofuser: [],
      listofItem: [],
      nameDet: '',
      addressDet: ''
    }
  },

  async mounted() {
    let user = JSON.parse(localStorage.getItem('user_Inf'))
    if (!user) {
      this.$router.push('/login')
    } else {
      if (Array.isArray(user) && user.length > 0) {
        const firstUser = user[0]
        this.username = JSON.parse(firstUser)[0]
      } else {
        this.username = user
      }
      this.IDlocation = this.$route.params.locationID
      const dataCateg = await axios.get(
        `http://localhost:3000/category?userId=${this.userId}&locationId=${this.IDlocation}`
      )
      var listofCategory = []
      listofCategory = dataCateg.data
      this.categorylist = listofCategory
    }
    // get item for all category
    if (this.categorylist.length > 0) {
      for (let i = 0; i < this.categorylist.length; i++) {
        var requestItem = await axios.get(
          `http://localhost:3000/item?userId=${this.userId}&locationId=${this.IDlocation}&categoryId=e6a6`
        )
      }
      this.listofItem = requestItem.data
    }
    ////
    for (let i = 0; i < this.categorylist.length; i++) {
      const categoryId = this.categorylist[i].id

      try {
        const requestItem = await axios.get(
          `http://localhost:3000/item?userId=${this.userId}&locationId=${this.IDlocation}&categoryId=${categoryId}`
        )

        // Assign items directly to listofItem for the specific category
        this.listofItem = [...this.listofItem, ...requestItem.data]
      } catch (error) {
        console.error(`Error fetching items for category ${categoryId}:`, error)
      }
    }
    ////
    ////
    // validate
    const res = await axios.get(
      `http://localhost:3000/location?userID=${this.userId}&id=${this.IDlocation}`
    )
    if (res.status == 200) {
      this.listofuser = res.data
      console.log(this.listofuser)
      this.nameDet = this.listofuser[0].name
      this.addressDet = this.listofuser[0].address

      // If it's an object (single item), convert it to an array

      if (this.listofuser.length !== 1) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    generateRoute: function () {
      this.$router.push({ name: 'ViewCategory', params: { locationID: this.IDlocation } })
    },
    gotoitem() {
      this.$router.push({ name: 'AddItem', params: { locationID: this.IDlocation } })
    },
    submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        console.log('done')
      }
    },
    gotoupdate() {
      // this.$router.push({name:'UpdateItem',params:{itemID:}})
    },
    shouldDisplayItem(item, categoryId) {
      // Check if the item's categoryId matches the current category id
      if (item.categoryId == categoryId) {
        return true
      }

      // If not, search for the category with the same id in listofItem
      const categoryInList = this.listofItem.find((category) => category.id === categoryId)

      // Display the item only if the category is found in listofItem
      return categoryInList !== undefined && item.categoryId === categoryInList.categoryId
    }
  },
  computed: {
    categorylistWithItems() {
      // Filter categories that have items
      return this.categorylist.filter((cat) =>
        this.listofItem.some((item) => item.categoryId === cat.id)
      )
    }
  }
}
</script>
<style>
.v-btn {
  text-transform: none;
}
</style>
