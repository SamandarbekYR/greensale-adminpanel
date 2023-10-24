<script lang="ts">
import { defineComponent } from "vue";
import axios from '../../plugins/axios';
export default defineComponent({
    components: {

    },
    props: {

    },
    data() {
        return {
            showDeleteModal: false,
            sellerId: 0 as Number,
        };
    },
    methods: {
        openDeleteModal() {
            this.showDeleteModal = true;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
        async confirmDelete() {

            debugger;
            const sellerId = localStorage.getItem('storageById');


            if (sellerId !== null) {
                const response = await axios.delete("/api/admin/storage/" + sellerId);
                console.log(response);
                this.closeDeleteModal();
                this.$router.push('storages');
            }
        }
    },
    mounted() {

    }
});
</script>

<template>
    <!--begin:: Delete Modal Button-->
    <button type="button" @click="openDeleteModal" data-modal-target="staticModal" data-modal-toggle="staticModal"
        class="my-5 w-40 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
        {{ $t('delete') }}
    </button>
    <!--end:: Delete Modal Button-->
    <!--begin:: Delete Modal Window-->
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
                        {{ $t('postdleteaccess') }}</h3>
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
    <!--end:: Delete Modal Window-->
</template>