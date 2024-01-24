<template>
  <v-container style="display: flex; justify-content: center; width: 57%">
    <form class="form" @click.prevent>
      <h1>Update Location #{{ locat }}</h1>
      <hr />
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
      <button c @click="submitForm()">Update Now</button>
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
        "
      >
        Updated Successfully
      </v-card>
    </form>
  </v-container>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import axios from 'axios'
export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      name: '',
      address: '',
      phone: '',
      locat: '',
      ddd: false
    }
  },
  validations() {
    return {
      name: { required },
      address: { required, minLength: minLength(10) },
      phone: { required, minLength: minLength(10) }
    }
  },
  async mounted() {
    let user = localStorage.getItem('user_Inf')
    if (!user) {
      this.$router.push('/login')
    } else {
      let locId = this.$route.params.locationID
      this.locat = locId
      let locationData = await axios.get(`http://localhost:3000/location/${this.locat}`)
      this.name = locationData.data.name
      this.address = locationData.data.address
      this.phone = locationData.data.phone
    }
  },

  methods: {
    async submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        const locationData = await axios.put(`http://localhost:3000/location/${this.locat}`, {
          name: this.name,
          address: this.address,
          phone: this.phone
        })

        if (locationData.status == 200) {
          this.ddd = true

          setTimeout(() => {
            this.ddd = false
            this.$router.push('/')
          }, 1000)
        }
      }
    }
  }
}
</script>

<style scoped>
.form-box {
  min-width: 400px;
  max-width: 600px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}

/*Form text*/
.title {
  font-weight: bold;
  font-size: 1.6rem;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

/*Inputs box*/
.form-container {
  overflow: hidden;
  border-radius: 8px;
  margin: 1rem 0 0.5rem;
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
  background-color: #fff;
}

.continput {
  margin-bottom: 28px;
  border-bottom: 1px solid #eee;
}

.error-filed {
  color: red;
  font-size: 12px;
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
