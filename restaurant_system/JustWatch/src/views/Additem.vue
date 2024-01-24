<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-alert
      color="success"
      icon="$success"
      title="Added Successfully"
      v-if="alert"
      v-model="alert"
    ></v-alert>

    <div class="d-flex justify-space-between"></div>
    <v-container style="display: flex; justify-content: center; width: 57%">
      <div class="form-box">
        <form class="form" @click.prevent>
          <span class="title">Add Item</span>
          <div class="form-container">
            <div class="continput">
              <input type="text" class="input" placeholder="Name" v-model="name" />
              <div class="error-filed" v-if="v$.name.$error">
                {{ v$.name.$errors[0].$message }}
              </div>
            </div>
            <div class="continput">
              <input type="number" class="input" placeholder="price" min="1" v-model="price" />
              <div class="error-filed" v-if="v$.price.$error">
                {{ v$.price.$errors[0].$message }}
              </div>
            </div>
            <div class="continput">
              <input type="number" class="input" placeholder="qnt" min="1" v-model="qnt" />
              <div class="error-filed" v-if="v$.qnt.$error">
                {{ v$.qnt.$errors[0].$message }}
              </div>
            </div>
            <div class="continput">
              <input type="text" class="input" placeholder="des" v-model="des" />
              <div class="error-filed" v-if="v$.des.$error">
                {{ v$.des.$errors[0].$message }}
              </div>
            </div>
            <div class="continput">
              <select
                class="input"
                name="Category Name"
                placeholder="Category Name"
                v-model="catId"
              >
                <option color="gray" value="" disabled selected>Select Category</option>

                <option v-for="list in listofCategory" :key="list.id" :value="list.id">
                  {{ list.name }}
                </option>
              </select>
              <div class="error-filed" v-if="v$.catId.$error">
                {{ v$.catId.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-around">
            <button @click="submitForm()">Add Now</button>
            <button @click="gotomenu()">Home</button>
          </div>
        </form>
      </div>
    </v-container>
  </v-container>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
// import axios from 'axios'

export default {
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },

  data() {
    return {
      name: '',
      qnt: '',
      price: '',
      des: '',
      listofCategory: [],
      locationId: '',
      catId: '',
      userId: '',
      alert: false
    }
  },
  validations() {
    return {
      name: { required },
      price: { required },
      qnt: { required },
      des: { required },
      catId: { required }
    }
  },
  methods: {
    async submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        let addItem = await axios.post(`http://localhost:3000/item`, {
          name: this.name,
          userId: this.userId,
          categoryId: this.catId,
          description: this.des,
          qtt: this.qnt,
          price: this.price,
          locationId: this.locationId
        })
        if (addItem.status == 201) {
          this.alert = true
          setTimeout(() => {
            this.alert = false
            this.$router.push({ name: 'Menu' })
          }, 1500)
        }
      }
    },
    gotomenu() {
      this.$router.push({ name: 'Menu' })
    }
  },
  async mounted() {
    this.locationId = this.$route.params.locationID
    let requestCategory = await axios.get(
      `http://localhost:3000/category?locationId=${this.locationId}`
    )
    if (requestCategory.status == 200) {
      this.listofCategory = requestCategory.data
    }
    let user = JSON.parse(localStorage.getItem('user_Inf'))
    if (Array.isArray(user) && user.length > 0) {
      const firstUser = user[0]
      this.userId = JSON.parse(firstUser)[0].id
    } else {
      this.userId = user.id
    }
  }
}
</script>
<style>
.error-filed {
  color: red;
  font-size: 12px;
}
.formpage::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #0000008f;
}

.form-box {
  min-width: 400px;
  max-width: 600px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
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
  background-color: #fff;
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
  width: 35%;
  align-self: center;
}

.form button:hover {
  background-color: #005ce6;
}
</style>
