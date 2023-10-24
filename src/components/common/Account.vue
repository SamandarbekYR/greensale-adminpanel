<script  lang="ts">
import { defineComponent } from "vue";
import axios from '../../plugins/axios';
import type { AdminViewModels } from '../../viewmodels/AdminViewModels'
import Cookies from "js-cookie";
export default defineComponent({
  props: {
    fullName:String,
    lastName:String
  },
  data() {
    return {
      showDeleteModal: false,
      sellerId: 0 as Number,
      list: {} as AdminViewModels
    };
  },
  methods: {
    async Account() {
      const token = Cookies.get('access_token');
      var response = await axios.get<AdminViewModels>("/api/account", {
        headers: {
          accept: "*/*",
          "Authorization": `Bearer ${token}`
        }
      });
      this.list = response.data;
    }
  }
})

</script>

<template>
  <div class="flex items-center ml-3">
    <div>
      <button @click="Account" type="button"
        class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded="false" data-dropdown-toggle="dropdown-user">
        <span class="sr-only">Open user menu</span>
        <img src="../../assets/logo/SVG/Artboard.svg" class="w-8 h-8 rounded-full" alt="user photo">
      </button>
    </div>
    <div
      class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
      id="dropdown-user">
      <div class="px-4 py-3" role="none">
        <p class="text-sm text-gray-900 dark:text-white" role="none">
          {{ list.firstName }}
          {{ list.lastName }}
        </p>
        <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
          {{ list.phoneNumber }}
        </p>
      </div>
      <ul class="py-1" role="none">
        <li>
          <a href="http://localhost:5173/auth/login"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem">{{ $t("SignOut") }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>