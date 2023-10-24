<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';
import {formatDate} from '../../helpers/DataHelper'
import deleteComponent from './CategoryDeleteComponent.vue'
import editComponent from './CategoryEditComponent.vue'


export default defineComponent({
  components: {
    deleteComponent,editComponent
  },
  props: {
    id: Number,
    name: String,
    createdAt: Date,
    updatedAt: Date
  },
  data() {
    return {
      baseURL:'' as string,
      createdAtString: '' as string,
      updatedAtString: '' as string
    }
  },
  methods: {    
    getBaseURL(){
     
      this.baseURL = axios.defaults.baseURL!;
      this.createdAtString = formatDate(this.createdAt!);
      this.updatedAtString = formatDate(this.updatedAt!);
      console.log(this.baseURL);
    }
  },
  mounted() {
    this.getBaseURL();
  }
})
</script>

<template>
  <div
    class="flex w-full px-5 bg-gray-100  my-5 divide-y divide-gray-100  shadow rounded-lg dark:bg-gray-900 dark:divide-gray-600" style="border-radius: 10px;">
    <div class="flex-auto p-4">
          <h3 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h3>
          <div class="flex flex-wrap items-center mt-5 mb-5">
            <div class="w-4 h-4 text-gray-700 dark:text-gray-400">
              <icon name="calendar"></icon>
            </div>
            <p class="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ createdAtString }}</p>
            <icon name="calendar-edit" class="w-4 h-4 text-gray-700 dark:text-gray-400"></icon>
            <p class="mx-1 font-normal bold text-gray-700 dark:text-gray-400">{{ updatedAtString }}</p>
          </div>
    </div>
    
    <div class="flex-none w-32" style="border-width: 0px;">
         
          <editComponent 
            :nameProp=name 
            :idProp=id>

          </editComponent >

          <deleteComponent  
            :idcategory=id>
          </deleteComponent>
        </div>
    </div>
</template>