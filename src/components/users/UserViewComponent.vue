<script lang="ts">
import axios from '../../plugins/axios'
import { defineComponent } from "vue";
import { UserViewModels } from '../../viewmodels/UserViewModels'
import { formatDate } from '../../helpers/DataHelper'
import ThemeSwitcher from '../common/ThemeSwitcher.vue';
export default defineComponent({
    components: {
        UserViewModels
    },
    props: {
        N: Number,
        id: Number,
        firstName: String,
        lastName: String,
        phoneNumber: String,
        region: String,
        district: String,
        address: String,
        createdAt: Date,
        updatedAt: Date
    },
    data() {
        return {
            baseURL: "" as String,
            showDeleteModal: false,
            showUpdateRole: false

        }
    },
    methods: {
        async load() {
            this.baseURL = axios.defaults.baseURL!;
        },
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
        openUpdateRole() {
            this.showUpdateRole = true;
        },
        
        closeUpdateRole() {

            this.showUpdateRole = false;
        },
        async confirmDelete() {

            const response = await axios.delete("/api/admin/users/" + this.id);
            if (response && response.status) {
                console.log(response.status.toString());
                console.log("Deleting the user...");
                this.$router.push('users')
                this.closeDeleteModal();
                location.reload();
            }
            else {
                console.log("Response status is undefined or null.");
            }
        },

        async cofirmUpdate() {
            const response = await axios.put("/api/superadmin/user/roles/" + this.id, { roleId: 2 }, {
                headers: {
                    'Content-Type': 'application/json', // Ma'lumotni JSON formatida yuborish
                },
            });
            if (response && response.status) {
                console.log(response.status.toString());
                console.log("UpdatingRole the user...");
                this.$router.push('users')
                this.closeUpdateRole();
                location.reload();
            }
            else {
                console.log("Response status is undefined or null.");
            }
        },
    },
    mounted() {
        this.load();
    }
});
</script>
<template>
    <tbody>
        <tr class="  p-1 h-14 items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900"
            style="border-radius: 10px; ">
            <th scope="row" class=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                style="width: 10px;">
                {{ "#" + id }}
            </th>
            <td scope="row" class="w-40 px-6 py-4 ">
                {{ firstName }}
            </td>
            <td class="w-40 px-6 py-4">
                {{ lastName }}
            </td>
            <td class="w-32 px-6 py-4">
                {{ phoneNumber }}
            </td>
            <td class="w-40 px-6 py-4">
                {{ region }}
            </td>
            <td class="w-16 px-6 py-4">
                <button type="button" @click="openDeleteModal"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <icon name="delete"></icon>
                </button>
            </td>
            <td class="w-32 px-0 py-4">
                <button type="button" @click="openUpdateRole"
                    class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                    {{ $t('admin') }}
                </button>
            </td>
        </tr>
    </tbody>
    <div v-if="showDeleteModal"
        class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeDeleteModal"
                    class="absolute top-3  right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg class="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only mt-10">Close modal</span>
                </button>
                <div class="p-6 text-center">

                    <h3 class="my-5 text-lg font-normal text-gray-500 dark:text-gray-400 ">
                        {{ $t('userdleteaccess') }}</h3>
                    <button @click="closeDeleteModal" type="button"
                        class="text-gray-500 mr-6 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        {{ $t('censel') }}</button>
                    <button @click="confirmDelete" type="button"
                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                        {{ $t('yes') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="showUpdateRole"
        class="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeUpdateRole()"
                    class="absolute top-3  right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg class="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only mt-10">Close modal</span>
                </button>
                <div class="p-6 text-center">

                    <h3 class="my-5 text-lg font-normal text-gray-500 dark:text-gray-400 ">
                        {{ $t('adminstration') }}</h3>
                    <button @click="closeUpdateRole" type="button"
                        class="text-gray-500 mr-6 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        {{ $t('censel') }}</button>
                    <button @click="cofirmUpdate" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {{ $t('yes') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>