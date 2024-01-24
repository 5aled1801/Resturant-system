<template>
  <navbar />
  <v-container class="mt-8">
    <v-row class="d-flex justify-space-between">
      <v-btn @click="generateRoute()" class="float-end" color="green-darken-4">Add Category</v-btn>
      <v-btn @click="dialog = true" class="float-end" id="deleteAllCat" color="error"
        >Delete All Category</v-btn
      >

      <router-link :to="{ name: 'Menu' }">
        <v-btn class="float-end" color="blue-darken-4">Back to Menu</v-btn>
      </router-link>
    </v-row>
    <v-dialog v-model="dialog" persistent="">
      <v-card
        style="
          align-self: center;
          align-self: center;
          min-width: 650px;
          min-height: 350px;
          align-self: center;
        "
      >
        <v-container>
          <div class="text">
            <span
              ><v-icon class="float-end" style="cursor: pointer" @click="dialog = false"
                >mdi-close</v-icon
              ></span
            >
            <h1 style="font-size: 24px; padding: 35px">
              <span style="text-transform: capitalize"></span> <br />

              Are you sure you want to delete all Categories..
            </h1>
            <p style="color: red; text-align: center">
              this means you well delete all categories and all items for this location
            </p>
          </div>
          <v-card-actions
            style="
              display: flex;
              justify-content: space-evenly;
              bottom: 10%;
              position: absolute;
              width: 100%;
            "
            ><v-btn color="error" @click="deleteAllLocation()">Delete</v-btn
            ><v-btn color="black" @click="dialog = false">close</v-btn></v-card-actions
          ></v-container
        >
      </v-card>
      <v-card
        class="massage"
        v-if="ddd"
        style="
          display: flex;
          font-size: 22px;
          color: white;
          padding: 24px 0px;
          text-align: center;
          background-color: rgb(13 139 13 / 69%);
          border-radius: 16px;
          min-width: 600px;
          align-self: center;
        "
      >
        Deleted All Successfully
      </v-card>
    </v-dialog>

    <v-table style="margin-top: 60px; border-radius: 11px">
      <thead style="background-color: black; color: white">
        <tr>
          <th style="font-size: 18px; padding-left: 20px" @click="updatecate()">Category</th>
          <th style="font-size: 18px; padding-right: 20px; text-align: end">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in listofCat" :key="cat.id">
          <td>{{ cat.name }}</td>

          <td style="text-align: end; gap: 10px">
            <router-link :to="{ name: 'updatecategory', params: { locationID: cat.id } }"
              ><v-btn color="green-darken-4"> Update </v-btn></router-link
            >
            <router-link :to="{ name: 'deleteCate', params: { locationID: cat.id } }">
              <v-btn color="error"> Delete </v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script>
import navbar from '@/components/public/navbar.vue'
import axios from 'axios'
export default {
  components: {
    navbar
  },
  data() {
    return {
      IDlocation: '',
      userId: '',
      listofCat: [],
      dialog: false,
      ddd: false
    }
  },
  async mounted() {
    this.IDlocation = this.$route.params.locationID
    let user = JSON.parse(localStorage.getItem('user_Inf'))
    if (!user) {
      this.$router.push('/login')
    } else {
      if (Array.isArray(user) && user.length > 0) {
        this.userId = user[0].id
      } else {
        this.userId = user.id
      }
      // console.log(this.userId)

      // get list of Category
      let dataofList = await axios.get(
        `http://localhost:3000/category?userId=${this.userId}&locationId=${this.IDlocation}`
      )

      if (dataofList.status == 200) {
        this.listofCat = dataofList.data
      }
    }
  },
  async beforeMount() {
    this.IDlocation = this.$route.params.locationID
    let user = JSON.parse(localStorage.getItem('user_Inf'))
    if (!user) {
      this.$router.push('/login')
    } else {
      if (Array.isArray(user) && user.length > 0) {
        this.userId = user[0].id
      } else {
        this.userId = user.id
      }
      let dataofList = await axios.get(
        `http://localhost:3000/category?userId=${this.userId}&locationId=${this.IDlocation}`
      )
      if (dataofList.status == 200) {
        this.listofCat = dataofList.data
      }
    }
    if (this.listofCat.length == 0) {
      document.getElementById('deleteAllCat').style.display = 'none'
    }
  },

  methods: {
    generateRoute: function () {
      this.$router.push({ name: 'AddCategory', params: { locationID: this.IDlocation } })
    },
    async deleteAllLocation() {
      console.log('Welcome')
      // get data from cate
      let getCatRequest = await axios.get(
        `http://localhost:3000/category?userId=${this.userId}&locationId=${this.IDlocation}`
      )
      if (getCatRequest.status == 200) {
        var list_of_category = []
        list_of_category = getCatRequest.data
      }

      for (let c = 0; c < this.listofCat.length; c++) {
        var delCate = await axios.delete(`http://localhost:3000/category/${list_of_category[0].id}`)
        if (delCate.status == 200) {
          var getitem = await axios.get(
            `http://localhost:3000/item?idCategory=${this.listofCat[c].id}`
          )
          var list_of_item = []
          list_of_item = getitem
          if (getitem.status == 200) {
            for (let i = 0; i < list_of_item.length; i++) {
              var delItems = await axios.delete(`http://localhost:3000/item/${list_of_item[i]}`)
              console.log(delItems)
            }
          }
        }
      }
      location.reload()
      this.ddd = true
      setTimeout(() => {
        this.dialog = false
        this.ddd = false
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>
<style>
.v-btn {
  text-transform: none;
}
</style>
