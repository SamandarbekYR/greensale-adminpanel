<script lang="ts">
import { UserViewModels } from '../../viewmodels/UserViewModels';
import type { UserGetSearchViewModels } from '../../viewmodels/UserGetSearchModels';

import UserViewComponent from "../../components/users/UserViewComponent.vue";
import UserSkeletonComponent from "../../components/users/UserSkeletonComponent.vue"
import axios from '../../plugins/axios'
import { useI18n } from 'vue-i18n';
import { getToken } from '../../helpers/TokenHelper';
import { defineComponent } from 'vue';
import { PaginationMetaData } from "../../Utils/PaginationUtils";

export default defineComponent({
  components: {
    UserViewComponent, UserSkeletonComponent,
  },
  data() {
    return {
      userList: [] as UserViewModels[],
      defaultSkeletons: 5 as Number,
      isLoaded: false as Boolean,
      search: "" as String,
      metaData: new PaginationMetaData(),

      hasNext: false,
      hasPrevious: false,
      currentPage: 1 as number,
      totalPages: 1 as number,
      list:{} as UserGetSearchViewModels

    }
  },
  props: {
    id: Number
  },
  methods: {
    async confirmDelete() {
      const response = await axios.delete("/api/admin/users/" + this.userList);
      if (response && response.status) {
        console.log(response.status.toString());
        console.log("Deleting the user...");
        this.$router.push('users')
        location.reload();
      }
      else {
        console.log("Response status is undefined or null.");
      }
    },
    async getDataAsync(page: Number) {
      this.isLoaded = false;
      const token = getToken();
      var response = await axios.get<UserViewModels[]>("/api/admin/users/only/users?page=" + page, {
        headers: {
          accept: "*/*",
          "Authorization": `Bearer ${token}`
        },
      });
      this.isLoaded = true;
      this.userList = response.data;
      const paginationJson = JSON.parse(response.headers['x-pagination']);
      this.metaData = new PaginationMetaData();
      this.metaData.currentPage = paginationJson.CurrentPage;
      this.metaData.totalPages = paginationJson.TotalPages;
      this.metaData.hasNext = paginationJson.HasNext;
      this.metaData.hasPrevious = paginationJson.HasPrevious;
      this.metaData.pageSize = paginationJson.PageSize;
      this.metaData.totalItems = paginationJson.TotalItems;
    },
    async getSearch(search: any) {
      this.isLoaded = false;
      var response = await axios.get<UserGetSearchViewModels>("/api/admin/users/search?search=" + search);
      this.isLoaded = true;
      this.list = response.data;
      this.userList = this.list.item2;
    },
    handleEnterKey: function (search: any) {
      if (search == "") {
        this.getDataAsync(1);
      }
      else {
        this.getSearch(search)
      }
    }

  },
  setup() {
    const { t } = useI18n();
  },
  async mounted() {
    await this.getDataAsync(1);
  },
});
</script>

<template>
  <nav class="flex mb-5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center ">
        <a href="/dashboard" style="font-size: 16px;margin-left: 4px; font-weight: font-semibold;"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <svg class="w-3 h-3 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            style="height: 13px; width: 13px;" viewBox="0 0 20 20">
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          {{ $t("dashboard") }}
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <a href="#" style="font-size: 16px;"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
            {{ $t("users") }}</a>
        </div>
      </li>
    </ol>
  </nav>
  <!--begin search-->
  <div class="flex justify-end">
    <div class="flex relative justify-end gap-5 right-0">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input type="search" v-model="search" @keyup.enter="handleEnterKey(search)" id="default-search"
        style="height: 45px; width: 300px;"
        class="flex end w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <button @click="handleEnterKey(search)" type="submit" style="font-size: 14px;"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {{ $t("search") }}
      </button>
    </div>
  </div>
  <!--end search-->

  <!--begin:: User-->
  <div class="m-10 mb-4 relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="h-16">
          <th scope="col" class="w-4 px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('#ID') }}
          </th>
          <th scope="col" class="w-40 px-6 py-3  text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('firsName') }}
          </th>
          <th scope="col" class="w-40 px-6 py-3  text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('lastname') }}
          </th>
          <th scope="col" class="w-32 px-6 py-3  text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('phone') }}
          </th>
          <th scope="col" class="w-44 px-6 py-3  text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('adress') }}
          </th>
          <th scope="col" class="w-48 px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('operations') }}
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div>
    <ul v-show="isLoaded == false">
      <template v-for="element in defaultSkeletons">
        <UserSkeletonComponent class="m-10 ">
        </UserSkeletonComponent>
      </template>
    </ul>
    <ul v-if="isLoaded == true">
      <template v-for="element in userList">
        <table
          class=" mx-10 me-10 w-full border hover:bg-gray-100 text-sm text-left text align-middle text-gray-500 dark:text-gray-400"
          style="width: 1120px;">
          <UserViewComponent :id="element.id" :firstName="element.firstName" :lastName="element.lastName"
            :phoneNumber="element.phoneNumber" :region="element.region">
          </UserViewComponent>
        </table>
      </template>
    </ul>
  </div>
  <!--end:: User-->

  <!--begin:: Pagination-->
  <nav class="flex items-center justify-between pe-10 pt-4" aria-label="Table navigation">
    <span class="mx-10 text-sm font-normal text-gray-500 dark:text-gray-400">{{ $t('show') }} <span
        class="font-semibold text-gray-900 dark:text-white">{{ metaData.hasPrevious ? (metaData.currentPage - 1) *
          metaData.pageSize : 1 }}-{{ metaData.hasNext ? metaData.pageSize * metaData.currentPage : metaData.totalItems
  }}</span> {{ $t('of') }} <span class="font-semibold text-gray-900 dark:text-white">{{ metaData.totalItems
}}</span></span>
    <ul class="inline-flex -space-x-px text-sm h-8">
      <li v-show="metaData.hasPrevious == true">
        <a href="#"
          class="flex items-center justify-center  px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{
            $t('previous') }}</a>
      </li>
      <li v-for="el in metaData.totalPages">
        <button @click="getDataAsync(el)" href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {{ el }}</button>
      </li>
      <li v-show="metaData.hasNext == true">
        <a href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{
            $t('next') }}</a>
      </li>
    </ul>
  </nav>
  <!--end:: Pagination-->
</template>