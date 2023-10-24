<script lang="ts">
import { defineComponent } from 'vue'
import { CategoryViewModel } from '../../viewmodels/CategoryViewModels'
import { CategoryDto } from '../../dtos/CategoryDto'
import CategoryViewComponent from '../../components/categories/CategoryViewComponent.vue'
import CategoryCreateComponent from '../../components/categories/CategoryCreateComponent.vue'
import CategorySkeletonComponent from '../../components/categories/CategorySkeletonComponent.vue'
import axios from '../../plugins/axios'

export default defineComponent({
  components: {
    CategoryViewComponent,CategorySkeletonComponent,
    CategoryCreateComponent,CategoryDto
  },
  data() {
    return {
      categoriesList: [] as CategoryViewModel[],
      defaultSkeletons: 6 as Number,
      isLoaded:false as Boolean

    }
  },
  methods: {
    async getDataAsync() {
      this.isLoaded=false;
      var response = await axios.get<CategoryViewModel[]>('/api/common/categories?page=1');
      this.isLoaded=true;
      this.categoriesList = response.data;
      console.log(this.categoriesList);
    }
  },
  setup() {

  },
  async mounted() {
    await this.getDataAsync();
  }
})
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
                        {{ $t("categories") }}</a>
                </div>
            </li>
        </ol>
  </nav>
  <!--begin:: Categories Skeletons-->
  <ul v-show="isLoaded==false">
    <template v-for="element in defaultSkeletons">
      <CategorySkeletonComponent
      class="my-5 mx-5">

      </CategorySkeletonComponent>
    </template>
  </ul>
  <!--end:: Categories Skeletons-->

  <ul v-show="isLoaded==true">
    <CategoryCreateComponent>
      <icon name="create"></icon>
    </CategoryCreateComponent>
    <template v-for="element in categoriesList">
      <CategoryViewComponent
        :id="element.id"
        :name="element.name"
        :createdAt="element.createdAt"
        :updatedAt="element.updatedAt"
        class="mt 7 mb 3">
      </CategoryViewComponent>
    </template>
  </ul>
</template>

