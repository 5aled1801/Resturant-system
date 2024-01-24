<template>
  <v-container>
    <div class="form-box">
      <form class="form" @click.prevent>
        <span class="title">Profile</span>
        <div class="form-container">
          <div class="continput">
            <input type="text" class="input" placeholder="Full Name" v-model="name" disabled />
          </div>
          <div class="continput">
            <input type="email" class="input" placeholder="Email" v-model="email" disabled />
          </div>
          <div class="continput">
            <input type="text" class="input" placeholder="password" v-model="pass" disabled />
          </div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <button @click="updatprofile()">Update profile</button>
          <button style="width: 100px" @click="gotohome()">Home</button>
        </div>
      </form>
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'profileData',
  data() {
    return {
      name: '',
      email: '',
      pass: ''
    }
  },
  methods: {
    gotohome() {
      this.$router.push('/')
    },
    updatprofile() {
      this.$router.push('/updateprofile')
    }
  },
  mounted() {
    const storedUserData = JSON.parse(localStorage.getItem('user_Inf'))

    if (Array.isArray(storedUserData) && storedUserData.length > 0) {
      const firstUser = storedUserData[0]
      this.name = firstUser.username
      this.email = firstUser.email
      this.pass = firstUser.pass
    } else {
      this.name = storedUserData.username
      this.email = storedUserData.email
      this.pass = storedUserData.pass
    }
  }
}
</script>
<style>
.form-box {
  min-width: 400px;
  max-width: 600px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-height: 450px;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 40px;
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
  margin-bottom: 28px;
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
