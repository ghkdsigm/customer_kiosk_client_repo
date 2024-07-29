// src/views/LoginView.vue
<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { authService } from '@/api';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await authService.login({ username: this.username, password: this.password });
        console.log('Login successful:', response);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>