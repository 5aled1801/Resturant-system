<template>
  <navbar />
  <v-container class="mt-8">
    <v-row class="float-end"
      ><router-link :to="{ name: 'Menu' }">
        <v-btn class="float-end" color="blue-darken-4">Back to Menu</v-btn>
      </router-link>
    </v-row>
  </v-container>
  <v-container>
    <div class="form-box">
      <form class="form" @click.prevent>
        <span class="title">Add Category</span>
        <div class="form-container">
          <div class="continput">
            <input type="text" class="input" v-model="name" />
            <div class="error-filed" v-if="v$.name.$error">
              {{ v$.name.$errors[0].$message }}
            </div>
          </div>
        </div>
        <button @click="submitForm()">Submit</button>
      </form>
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
        Added Successfully
      </v-card>
      <v-card
        class="massage"
        v-if="err"
        style="
          font-size: 20px;
          color: white;
          padding: 24px 0;
          text-align: center;
          background-color: #9b0707cf;
          border-radius: 16px;
        "
      >
        You Have Same Category
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import navbar from '@/components/public/navbar.vue'
export default {
  components: {
    navbar
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      name: '',
      userId: '',
      locationId: '',
      ddd: false,
      err: false,
      listOfcategory: [],
      nameDet: '',
      addressDet: ''
    }
  },
  validations() {
    return {
      name: { required }
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
    this.locationId = this.$route.params.locationID
    // this.displaylistoFCategory()
  },
  methods: {
    async displaylistoFCategory() {
      let displayResult = await axios.get(
        `http://localhost:3000/category?userId=${this.userId}&locationId=${this.locationId}`
      )

      if (displayResult.status == 200) {
        this.listOfcategory = displayResult.data
        const resultfillter = this.listOfcategory.filter((el) => {
          return el.name.toLowerCase() === this.name.toLowerCase()
        })
        if (resultfillter.length > 0) {
          this.err = true

          setTimeout(() => {
            this.err = false
            this.name = ''
          }, 1000)
        } else {
          if (!this.v$.$error) {
            const dataform = await axios.post(`http://localhost:3000/category`, {
              name: this.name,
              locationId: this.locationId,
              userId: this.userId
            })
            if (dataform.status == 201) {
              this.ddd = true

              setTimeout(() => {
                this.ddd = false
                this.$router.push({ name: 'Menu' })
              }, 1500)
            }
          }
        }
      }
    },
    async submitForm() {
      this.v$.$validate()
      this.displaylistoFCategory()
    }
  }
}
</script>
<style>
.v-btn {
  text-transform: none;
}

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
