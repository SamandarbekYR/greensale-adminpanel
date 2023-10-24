<script lang="ts">
import type { AdminViewModels } from '../../viewmodels/AdminViewModels';
import AdminViewComponent from '../../components/admins/AdminViewComponent.vue';
import AdminSkeletonComponent from "../../components/admins/AdminSkeletonComponent.vue"
import axios from '../../plugins/axios'
import { useI18n } from 'vue-i18n';
import { getToken } from '../../helpers/TokenHelper';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    AdminViewComponent,AdminSkeletonComponent
  },
  methods: {
    async getDataAsync() {
      this.isLoaded = false;
      const token = getToken();
      var response = await axios.get<AdminViewModels[]>("/api/admin/users/admin", {
        headers: {
          accept: "*/*",
          "Authorization": `Bearer ${token}`
        }
      });
      this.isLoaded = true;
      this.userList = response.data;
    }    
  },
  data() {
    return {
      userList: [] as AdminViewModels[],
      defaultSkeletons: 4 as Number,
      isLoaded: false as Boolean
    }
  },
  setup() {
    const { t } = useI18n();
  },
  async mounted() {
    await this.getDataAsync();
  },
});
</script>

<template>
  <nav class="flex mb-5" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3" > 
            <li class="inline-flex items-center ">
                <a href="/dashboard"  style="font-size: 16px;margin-left: 4px; font-weight: font-semibold;"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg class="w-3 h-3 mr-3"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        style="height: 13px; width: 13px;" viewBox="0 0 20 20">
                        <path
                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    {{ $t("dashboard") }}
                </a>
            </li>
            <li>
                <div class="flex items-center">
                    <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                    <a href="#" style="font-size: 16px;"
                        class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                        {{ $t("admins") }}</a>
                </div>
            </li>
        </ol>
    </nav>
    
  <!--begin:: Admin-->

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
          <th scope="col" class="w-32 px-6 py-3  text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('region') }}
          </th>
          <th scope="col" class="w-28 px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('district') }}
          </th>
          <th scope="col" class="w-32 px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white">
            {{ $t('operations') }}
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div >
    <ul v-show="isLoaded==false">
      <template v-for="element in defaultSkeletons">
        <AdminSkeletonComponent
        class="m-10 ">

        </AdminSkeletonComponent>
      </template>
    </ul>
    <ul v-if="isLoaded == true" >
        <template v-for="element in userList">
        <table class=" mx-10 me-10 w-full border hover:bg-gray-100 text-sm text-left text align-middle text-gray-500 dark:text-gray-400"
           style="width: 1135px;">
           <AdminViewComponent
              :id="element.id"
              :firstName="element.firstName"
              :lastName="element.lastName"
              :phoneNumber="element.phoneNumber"
              :region="element.region"
              :district="element.district">
           </AdminViewComponent>
        </table>
        <!-- <UserViewComponent :user="element" class="mt-2 mb-3" /> -->
        </template>
    </ul>
  </div>
  <!--end:: User-->
</template>