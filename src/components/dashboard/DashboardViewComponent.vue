<script lang="ts">
import { defineComponent } from 'vue'
import spinner from '../dashboard/Spinner.vue'
import ApexCharts from 'apexcharts'
export default defineComponent({
  components: {
    spinner,
  },
  props: {
    apiData: Number,
    countUser: Number,
    countSeller: Number,
    countAgreed: Number,
    countBuyer: Number,
    summaAnnouncemet: Number
  },
  data() {
    return {
      defaultSkeletons: 6 as Number,
      isLoaded:false as Boolean

    }
  },
  methods: {

  }
})

</script>

<template style="">
  <div class="grid grid-cols-2 gap-2" style="margin: 20px;">
    <div
      class="mx-16 mt-10 mx-1 max-w-sm p-6 text-gray-900 bg-gray-75 border border-gray-200 rounded-lg dark:text-white shadow dark:bg-gray-900 dark:border-gray-700 group">
      <div class="flex">
        <icon name="LoudSpeaker" class="mt-1"></icon>
        <a href="#">
          <h5 class="mb-2 mx-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {{ $t('announcemment')}}
          </h5>
        </a>
      </div>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {{ $t('a')}}: {{ summaAnnouncemet }}
      </p>
      <div class="my-5 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div class="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" style="width: 90%"></div>
      </div>
    </div>

    <div
      class="mt-10 max-w-sm p-6 text-gray-900 bg-gray-75 border border-gray-200 rounded-lg dark:text-white shadow dark:bg-gray-900 dark:border-gray-700 group">
      <div class="flex">
        <icon name="agreed" class="mt-1"></icon>

        <a href="#">
          <h5 class="mb-2 mx-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {{ $t('kelishilganlar')}}
          </h5>
        </a>
      </div>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {{ $t('b')}}: {{ countBuyer  }}
      </p>
      <div class="my-5 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div class="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" style="width: 65%"></div>
      </div>
    </div>

    <div
      class="mx-16 mt-10 max-w-sm p-6 text-gray-900 bg-gray-75 border border-gray-200 rounded-lg dark:text-white shadow dark:bg-gray-900 dark:border-gray-700 group">
      <div class="flex">
        <icon name="new" class="mt-1"></icon>
        <a href="#">
          <h5 class="mb-2 mx-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {{ $t('newannouncements')}}
          </h5>
        </a>
      </div>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {{ $t('c')}}: {{ countSeller }}
      </p>
      <div class="my-5 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div class="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" style="width: 45%"></div>
      </div>
    </div>
    
    <div
      class="mt-10 max-w-sm p-6 text-gray-900 bg-gray-75 border border-gray-200 rounded-lg dark:text-white shadow dark:bg-gray-900 dark:border-gray-700 group">
      <div class="flex ">
        <icon name="users" class="mt-1"></icon>

        <a href="#">
          <h5 class="mb-2 mx-2  text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {{ $t('users')}}
          </h5>
        </a>
      </div>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {{ $t('d')}}: {{ countUser }}
      </p>
      <div class="my-5 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div class="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" style="width: 15%"></div>
      </div>
    </div>
  </div>  
  
  <!-- Button -->
    <!-- <button id="dropdownDefaultButton" data-dropdown-toggle="lastDaysdropdown" data-dropdown-placement="bottom"
        class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
        type="button">
        Last 10 days
      <svg class="w-2.5 m-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button> -->
</template>