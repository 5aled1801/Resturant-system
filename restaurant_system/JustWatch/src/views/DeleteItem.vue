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
          <h1>Delete Item # {{ itemId }}</h1>
          <hr />
          <p class="text-red">Are you sure you want to delete this location</p>
        </v-col>
      </v-row>
      <v-row class="justify-center" style="height: 90px; align-items: center">
        <div>
          <p>{{ name }}</p>
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
          <v-btn style="text-transform: none" color="blue" @click="goback()">Back</v-btn></v-col
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
      idcategory: '',
      inforamationCat: [],
      userId: '',
      ddd: false,
      itemId: ''
    }
  },
  async mounted() {
    // user ID
    let user = localStorage.getItem('user_Inf')
    this.userId = JSON.parse(user)[0].id

    // category id
    this.idcategory = this.$route.params.locationID
    //   item Id
    this.itemId = this.$route.params.itemID
    this.itemId
    let result = await axios.get(`http://localhost:3000/item/${this.itemId}`)
    if (result.status == 200) {
      this.inforamationCat = result.data
      this.name = this.inforamationCat.name
    }

    console.log(this.idcategory)
    // console.log(this.userId)

    // userId = ${ this.userId }
  },
  methods: {
    goback() {
      this.$router.push({ name: 'Menu' })
    },
    async deletecategory() {
      let delet = await axios.delete(`http://localhost:3000/item/${this.itemId}`)
      if (delet.status == 200) {
        this.ddd = true
        this.name = ''
        setTimeout(() => {
          this.ddd = false
          this.$router.push({ name: 'Menu' })
        }, 1500)
        // }
      }
    }
  }
}
</script>
