<template>
  <v-container>
    <v-btn
      color="error"
      @click="dialog = true"
      style="position: absolute; right: 10%; text-transform: none; top: 18%"
      class="float-end"
      id="deleteAllBtn"
      >Delete All</v-btn
    >
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
              <span style="text-transform: capitalize">{{ this.username.username }}</span> <br />

              Are you sure you want to delete all locations..
            </h1>
            <p style="color: red; text-align: center">
              this means you well delete all categories and all items
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
          min-width: 650px;
          align-self: center;
        "
      >
        Deleted All Successfully
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
      username: '',
      ddd: false
    }
  },
  async mounted() {
    let user = localStorage.getItem('user_Inf')
    if (!user) {
      this.$router.push('/login')
    } else {
      if (Array.isArray(user) && user.length > 0) {
        const firstUser = user[0]
        this.username = JSON.parse(firstUser)[0]
      } else {
        this.username = JSON.parse(user)
      }
    }

    //   display or none for btn all delete
    let list_of_location = []

    const getLocationsResponse = await axios.get(
      `http://localhost:3000/location?userID=${this.username.id}`
    )
    list_of_location = getLocationsResponse.data
    if (list_of_location.length == 0) {
      document.getElementById('deleteAllBtn').style.display = 'none'
    }
  },
  methods: {
    async deleteAllLocation() {
      // get location by user id
      let list_of_location = []
      const getLocationsResponse = await axios.get(
        `http://localhost:3000/location?userID=${this.username.id}`
      )
      list_of_location = getLocationsResponse.data
      console.log(list_of_location)

      //   check length of location and delete
      if (list_of_location.length > 0) {
        for (let i = 0; i < list_of_location.length; i++) {
          var delLocation = await axios.delete(
            `http://localhost:3000/location/${list_of_location[i].id}`
          )
          var listCa = []
          var getCategoryRequest = await axios.get(
            `http://localhost:3000/category?locationId=${list_of_location[i].id}`
          )
          console.log(getCategoryRequest.data)
        }
        // check status of deleting location
        if (delLocation.status === 200) {
          //   get category by userid and locationid

          listCa = getCategoryRequest.data
          //   check length of location and delete
          if (listCa.length > 0) {
            for (let c = 0; c < listCa.length; c++) {
              var delCategory = await axios.delete(
                `http://localhost:3000/category/${listCa.data[c].id}`
              )

              //   get list of item of category of this location by location or catefory iD and user id
              if (delCategory.status == 200) {
                var list_of_item = await axios.get(
                  `http://localhost:3000/item?idCategory=${listCa[c].id}`
                )
                var listItem = []
                listItem = list_of_item.data
                if (list_of_item.status == 200) {
                  for (var j = 0; j < listItem.length; j++) {
                    await axios.delete(`http://localhost:3000/item/${listItem[j].id}`)
                  }
                }
              }
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

// }
</script>
