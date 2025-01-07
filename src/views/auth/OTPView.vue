<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-primary">
        Verify Your Account
      </h2>
      <form @submit.prevent="verifyOTP">
        <div class="mb-4">
          <label for="otp" class="block text-sm font-medium text-gray-700"
            >Enter OTP</label
          >
          <input
            type="text"
            id="otp"
            v-model="otp"
            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Verify
        </button>
      </form>
      <button
        @click="regenerateOTP"
        class="w-full mt-4 bg-secondary text-white p-2 rounded hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        Regenerate OTP
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const otp = ref("");
const email = ref("");
const router = useRouter();

const verifyOTP = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/auth/account-verification', {
      otp: otp.value
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    alert('OTP verified successfully.');

    // Update localStorage with new user data
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        user.email_verified_at = new Date().toISOString(); // Update the verification timestamp
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error updating user data in localStorage:', error);
      }
    }

    // Redirect to the home page
    router.push('/');
  } catch (error) {
    console.error('Error verifying OTP:', error);
    alert('Error verifying OTP: ' + (error.response?.data?.message || error.message));
  }
};

const regenerateOTP = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/generate-otp-code",
      {
        email: email.value,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token", "user")}`,
        },
      }
    );
    alert("OTP has been regenerated and sent to your email.");
  } catch (error) {
    console.error("Error regenerating OTP:", error);
    alert(
      "Error regenerating OTP: " +
        (error.response?.data?.message || error.message)
    );
  }
};

// Fetch email from user data
const fetchUserEmail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email) {
    email.value = user.email;
  } else {
    alert("No email found for the user.");
  }
};

fetchUserEmail();
</script>

<style scoped>
.bg-primary {
  background-color: #3490dc;
}
.bg-primary-dark {
  background-color: #2779bd;
}
.text-primary {
  color: #3490dc;
}
.bg-secondary {
  background-color: #ff9f1c;
}
.bg-secondary-dark {
  background-color: #e88b07;
}
</style>
