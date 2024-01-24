<template>
  <div class="location text-center" style="position: absolute; top: 15%; width: 100%">
    <v-container>
      <div style="top: 15%; width: 100%">
        <v-btn
          color="blue"
          log="true"
          @click="dialog = true"
          style="text-transform: none; left: 10%; position: absolute"
          >Add Location</v-btn
        >
        <deleteAlllocation />
      </div>

      <v-dialog v-model="dialog" persistent>
        <v-container>
          <v-alert
            color="success"
            icon="$success"
            title="Added Successfully"
            v-model="alert"
          ></v-alert>

          <v-card width="100%" style="position: relative">
            <div class="d-flex justify-space-between">
              <v-card-title>Add Location</v-card-title>
              <v-icon style="cursor: pointer; padding: 20px" @click="dialog = false"
                >mdi-close</v-icon
              >
            </div>
            <v-container style="display: flex; justify-content: center; width: 57%">
              <form class="form" @click.prevent>
                <div class="form-container">
                  <div class="continput">
                    <input type="text" class="input" placeholder="Restarunt Name" v-model="name" />
                    <div class="error-filed" v-if="v$.name.$error">
                      {{ v$.name.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="continput">
                    <input type="text" class="input" placeholder="Address" v-model="address" />
                    <div class="error-filed" v-if="v$.address.$error">
                      {{ v$.address.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="continput">
                    <input type="text" class="input" placeholder="Phone" v-model="phone" />
                    <div class="error-filed" v-if="v$.phone.$error">
                      {{ v$.phone.$errors[0].$message }}
                    </div>
                  </div>
                </div>
                <button @click="Addlocation()">Add Now</button>
              </form>
            </v-container>
          </v-card>
        </v-container>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import axios from 'axios'
import deleteAlllocation from '@/components/Home/deleteAlllocation.vue'
export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  components: {
    deleteAlllocation
  },
  data() {
    return {
      dialog: false,
      name: '',
      address: '',
      phone: '',
      userId: '',
      alert: false
    }
  },
  validations() {
    return {
      name: { required },
      address: { required, minLength: minLength(10) },
      phone: { required, minLength: minLength(10) }
    }
  },
  mounted() {
    const storedUserData = JSON.parse(localStorage.getItem('user_Inf'))

    if (Array.isArray(storedUserData) && storedUserData.length > 0) {
      const firstUser = storedUserData[0]
      this.userId = firstUser.id
    } else {
      this.userId = storedUserData.id
    }
  },
  methods: {
    async Addlocation() {
      this.v$.$validate()

      if (!this.v$.$error) {
        const locationData = await axios.post(`http://localhost:3000/location`, {
          name: this.name,
          address: this.address,
          phone: this.phone,
          userID: this.userId
        })
        if (locationData.status == 201) {
          localStorage.setItem('location of user', JSON.stringify(locationData))
          setTimeout(() => {
            setTimeout(() => {
              this.alert = true
              clearTimeout // This line doesn't seem to have a purpose and can be removed
            }, 10)

            setTimeout(() => {
              this.alert = false // Close the alert after 1 second
              this.dialog = false
              this.$router.push('/')
              this.name = ''
              this.address = ''
              this.phone = ''
              location.reload()
            }, 1000) // Set the delay to 1000 milliseconds (1 second)
          }, 100)
        }
      } else {
        console.log('Form has validation errors. Unable to Addlocation.')
      }
    }
  }
}
</script>

<style>
.error-filed {
  color: red;
  font-size: 12px;
}
.form-container {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 0.5rem;
  width: 100%;
}
form {
  width: 100%;
}
.input {
  background: none;
  border: 0;
  outline: 0;
  height: 40px;
  width: 100%;
  font-size: 0.9rem;
  padding: 8px 15px;
}

.continput {
  border-bottom: 1px solid #eee;
}

.form-section {
  padding: 16px;
  font-size: 0.85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.form-section a {
  font-weight: bold;
  color: #0066ff;
  transition: color 0.3s ease;
}

.form-section a:hover {
  color: #005ce6;
  text-decoration: underline;
}

/*Button*/
.form button {
  background-color: #0066ff;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 50%;
  align-self: center;
}

.form button:hover {
  background-color: #005ce6;
}
</style>
