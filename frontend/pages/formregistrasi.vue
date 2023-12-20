<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Form registrasi lomba</h1>
    <form @submit.prevent="submitForm" class="max-w-sm">
      <div class="mb-4">
        <label for="name" class="block mb-1">Nama:</label>
        <input type="text" id="name" v-model="formData.name" required
          class="w-full border border-gray-300 rounded px-3 py-2">
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-1">Email:</label>
        <input type="email" id="email" v-model="formData.email" required
          class="w-full border border-gray-300 rounded px-3 py-2">
      </div>
      <div class="mb-4">
        <label for="school" class="block mb-1">Asal Sekolah:</label>
        <input type="text" id="school" v-model="formData.school" required
          class="w-full border border-gray-300 rounded px-3 py-2">
      </div>
      <div class="mb-4">
        <label for="registrationDate" class="block mb-1">Tanggal Pendaftaran:</label>
        <input type="date" id="registrationDate" v-model="formData.registrationDate" required
          class="w-full border border-gray-300 rounded px-3 py-2">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Daftar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        school: '',
        registrationDate: ''
      }
    };
  },
  methods: {
    submitForm() {
      fetch('http://localhost:8000/api/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        this.formData = {
          name: '',
          email: '',
          school: '',
          registrationDate: ''
        };
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>

<style>
input[type="text"],
input[type="email"],
input[type="date"] {
  outline: none;
}
</style>