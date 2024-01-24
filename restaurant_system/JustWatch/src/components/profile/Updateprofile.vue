<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <div class="form-box">
      <form class="form" @click.prevent>
        <span class="title">Update Profile</span>
        <div class="form-container">
          <div class="continput">
            <input type="text" class="input" placeholder="Full Name" v-model="username" />
            <div class="error-filed" v-if="v$.username.$error">
              {{ v$.username.$errors[0].$message }}
            </div>
          </div>
          <div class="continput">
            <input type="email" class="input" placeholder="Email" v-model="email" />
            <div class="error-filed" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>
          </div>
          <div class="continput">
            <input type="password" class="input" placeholder="Password" v-model="pass" />
            <div class="error-filed" v-if="v$.pass.$error">{{ v$.pass.$errors[0].$message }}</div>
          </div>
        </div>
        <button @click="submitForm()">Submit</button>
      </form>
    </div>
  </v-container>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import axios from 'axios'
export default {
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      username: '',
      email: '',
      pass: '',
      userId: ''
    }
  },
  validations() {
    return {
      username: { required, minLength: minLength(10) },
      email: { required, email },
      pass: { required, minLength: minLength(10) }
    }
  },
  mounted() {
    const storedUserData = JSON.parse(localStorage.getItem('user_Inf'))

    console.log(storedUserData)
    if (Array.isArray(storedUserData) && storedUserData.length > 0) {
      const firstUser = storedUserData[0]
      this.userId = firstUser.id
    } else {
      this.userId = storedUserData.id
    }
  },
  methods: {
    async submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        const dataform = await axios.put(`http://localhost:3000/User/${this.userId}`, {
          username: this.username,
          email: this.email,
          pass: this.pass
        })

        if (dataform.status == 200) {
          localStorage.setItem('user_Inf', JSON.stringify(dataform.data))
          this.$router.push('/profile')
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
