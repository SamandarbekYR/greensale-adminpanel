<script lang="ts">
import { defineComponent } from "vue";
import axios from '../../plugins/axios';
export default defineComponent({
    components: {

    },
    props: {
        nameProp:String,
        descriptionProp:String,
        idProp:Number
    },
    data() {
        return {
            showModal: false,
            categoryName: "",
        };
    },
    methods:
    {
        openModal() {
            this.categoryName = this.nameProp!;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async submitForm()
        {
                const formData = new FormData();
                formData.append("Name", this.categoryName!);
                const responce = await axios.put("/api/admin/categories/" + this.idProp, formData);
                console.log(responce.status);
                if (responce.status == 200) {
                location.reload();
                this.closeModal();
            }
        }
    },
});
</script>

<template>
  <!--begin:: Edit Modal Button-->
    <button
        type="button"
        @click="openModal"
        class="text-white  py-2 px-1 my-1 mt-7 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm text-center"
      >
        <div class=" flex flex-nowrap items-center w-32">
          <icon name="edit"></icon>
          <p class="mx-2">{{ $t('edit') }}</p>
     </div>
      </button>
  <!--end:: Edit Modal Button-->

  <!--For Edit Modal Window  Start-->
    <div v-if="showModal"
         class="fixed  top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button @click="closeModal"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="edit-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class=" py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">{{ $t('newCategoryName') }}</h3>
                    <form @submit.prevent="submitForm" class="space-y-6" action="#">
                        <!--Category Name Edit Start-->
                        <div>
                           
                            <input v-model="categoryName" type="text" name="name" id="name"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                   required>
                        </div>
                        <!--Category Name Edit End-->

                        <div class="my-5">
                            <button @click="submitForm"  type="submit"
                                    class="w-full  text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">{{ $t('update') }}
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
  <!--For Edit Modal Window  End-->


</template>