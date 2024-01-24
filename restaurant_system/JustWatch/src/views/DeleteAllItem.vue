<template>
  <navbar />
  <v-container
    style="
      position: absolute;
      text-align: center;
      top: 40%;
      transform: translateY(-50%);
      text-align: -webkit-center;
      max-width: 100%;
    "
  >
    <div class="textcont w-50">
      <v-row>
        <v-col>
          <h1>Delete All Items:#{{ itemId }}</h1>
          <hr />
          <p class="text-red">Are you sure you want to delete All items in this category</p>
        </v-col>
      </v-row>
      <v-row class="justify-center" style="height: 90px; align-items: center">
        <div>
          <p style="text-transform: capitalize">{{ name }}</p>
        </div>
      </v-row>
      <hr />
      <v-row class="mt-4">
        <v-col>
          <v-btn
            style="text-transform: none; margin-inline: 10px"
            color="red"
            @click="deletecategory()"
            >Delete</v-btn
          >
          <v-btn style="text-transform: none" color="blue" @click="gotoMenu"
            >Back to Home</v-btn
          ></v-col
        >
      </v-row>
    </div>
    <div>
      <v-card
        class="massage"
        v-if="ddd"
        style="
          font-size: 20px;
          color: white;
          padding: 24px 0;
          text-align: center;
          background-color: #084c08b0;
          border-radius: 16px;
          max-width: 31%;
          margin-top: 3%;
        "
      >
        Deleted Successfully
      </v-card>
    </div>
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
      name: '',
      inforamationCat: [],
      listofitem: [],

      userId: '',
      ddd: false,
      itemId: ''
    }
  },
  async mounted() {
    // user ID
    let user = localStorage.getItem('user_Inf')
    if (Array.isArray(user) && user.length > 0) {
      const firstUser = user[0]
      this.username = JSON.parse(firstUser)[0]
    } else {
      this.username = JSON.parse(user)
    }

    // category id
    //   item Id
    this.itemId = this.$route.params.catID
    this.itemId
    let result = await axios.get(`http://localhost:3000/category/${this.itemId}`)
    if (result.status == 200) {
      this.inforamationCat = result.data
      this.name = this.inforamationCat.name
    }

    let req = await axios.get(`http://localhost:3000/item?categoryId=${this.itemId}`)
    this.listofitem = req.data
    // console.log(this.userId)

    // userId = ${ this.userId }
  },
  methods: {
    gotoMenu() {
      this.$router.push('/')
    },
    async deletecategory() {
      for (let i = 0; i < this.listofitem.length; i++) {
        await axios.delete(`http://localhost:3000/item/${this.listofitem[i].id}`)
      }

      this.ddd = true
      this.name = ''
      this.$router.push('/')
      setTimeout(() => {
        this.ddd = false
      }, 1500)
    }
  }
}
</script>
