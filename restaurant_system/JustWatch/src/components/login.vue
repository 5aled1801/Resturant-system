<template>
  <v-container
    class="formpage"
    style="text-align: -webkit-center; /* height: 100vh; */ position: relative"
    fluid
  >
    <img
      src="../assets/images/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg"
      alt=""
      style="width: 100vw; height: 100vh; left: 0; top: 0; position: absolute; z-index: -100"
    />
    <div class="form-box">
      <form class="form" @click.prevent>
        <span class="title">Login</span>
        <span class="subtitle">Login in your account with your email.</span>
        <div class="form-container">
          <div class="continput">
            <input type="email" class="input" placeholder="Email" v-model="email" />
            <div class="error-filed" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>
          </div>
          <div class="continput">
            <input type="password" class="input" placeholder="Password" v-model="pass" />
            <div class="error-filed" v-if="v$.pass.$error">{{ v$.pass.$errors[0].$message }}</div>
          </div>
        </div>
        <button @click="submitForm()">Login</button>
      </form>
      <div class="form-section">
        <p>Have an account? <a href="/signuP">Sign Up </a></p>
      </div>
    </div>
  </v-container>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios'
export default {
  name: 'longInForm',

  validations() {
    return {
      pass: { required },
      email: { required, email }
    }
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      pass: '',
      email: ''
    }
  },

  methods: {
    async submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        const result = await axios.get(
          `http://localhost:3000/User?email=${this.email}&pass=${this.pass}`
        )
        if (result.status === 200 && result.data.length > 0) {
          localStorage.setItem('user_Inf', JSON.stringify(result.data))
          this.$router.push('/')
        } else {
          alert('Wrong password or username')
        }
      } else {
        console.log('not Valid form')
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, 30%);
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
  width: 50%;
  align-self: center;
}

.form button:hover {
  background-color: #005ce6;
}
</style>
