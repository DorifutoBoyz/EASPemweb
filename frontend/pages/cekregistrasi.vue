<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">cek status registrasi</h1>
    <form @submit.prevent="checkStatus" class="mb-4">
      <label for="email" class="mr-2">Email:</label>
      <input v-model="email" type="email" id="email" required class="border border-gray-300 px-2 py-1 rounded" />
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check Status</button>
    </form>

    <div v-if="registrationStatus && registrationStatus.length > 0" class="border border-gray-300 p-4 mb-4">
      <h2 class="text-lg font-bold mb-2">Registration Status:</h2>
      <div v-for="registration in registrationStatus" :key="registration.id">
        <p><span class="font-bold">Nama:</span> {{ registration.name }}</p>
        <p><span class="font-bold">Email:</span> {{ registration.email }}</p>
        <p><span class="font-bold">Asal Sekolah:</span> {{ registration.school }}</p>
        <p><span class="font-bold">Status:</span> {{ registration.status }}</p>
        <p><span class="font-bold">Tanggal Pendaftaran:</span> {{ registration.registrationDate }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="text-red-500">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      registrationStatus: null,
      errorMessage: null,
    };
  },
  methods: {
  checkStatus() {
    this.registrationStatus = null;
    this.errorMessage = null;

    const lowercaseEmail = this.email.toLowerCase(); // Convert input email to lowercase

    fetch(`http://localhost:8000/api/registration/?email=${encodeURIComponent(lowercaseEmail)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response Data:', data);

        if (data.docs && data.docs.length > 0) {
          // Find the registration record with a case-insensitive email comparison
          const userRegistration = data.docs.find(registration => registration.email.toLowerCase() === lowercaseEmail);

          if (userRegistration) {
            this.registrationStatus = [userRegistration]; // Wrap in an array to display a single record
          } else {
            this.errorMessage = 'No registration found for the provided email.';
          }
        } else {
          this.errorMessage = 'No registrations found.';
        }
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = 'An error occurred while fetching the registration status.';
      });
  },
},

};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}

.text-red-500 {
  color: #EF4444;
}
</style>
