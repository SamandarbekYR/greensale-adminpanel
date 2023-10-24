<script lang="ts">
import { defineComponent } from 'vue'
import DashboardViewComponent from '../../components/dashboard/DashboardViewComponent.vue'
import axios from '../../plugins/axios'
import { getToken } from '../../helpers/TokenHelper'
import Spinner from '../../components/dashboard/Spinner.vue'

export default defineComponent({
  components: {
    DashboardViewComponent, Spinner
  },
  methods: {
    async getDataAsync() {
      try {
        this.isLoaded = false
        const resBuyerCount = await axios.get('api/common/buyer/posts/count')
        const resSellerCount = await axios.get('api/common/seller/post/count')
        const resStorageCount = await axios.get('api/common/storage/count')
        const resUserCount = await axios.get('api/admin/users/count')
        this.isLoaded = true
        this.apiBuyerCount = resBuyerCount.data
        this.apiSellerCount = resSellerCount.data
        this.apiStorageCount = resStorageCount.data
        this.apiUserCount = resUserCount.data
        this.summa = this.apiBuyerCount + this.apiSellerCount + this.apiStorageCount;

      } catch (error) {
        console.log(error)
      }
    }
  },
  data() {
    return {
      isLoaded: false as Boolean,
      spinner: 1 as Number,
      apiBuyerCount: 0,
      apiSellerCount: 0,
      apiStorageCount: 0,
      summa: 0,
      apiUserCount: 0,
      series: [{
        name: 'Seller',
        type: 'area',
        data: [30, 37, 20, 40, 70, 25, 20, 40, 70, 100, 90]
      }, {
        name: 'Buyer',
        type: 'area',
        data: [14, 30, 35, 28, 20, 35, 20, 75, 60, 100, 75]
      }],
      chartOptions: {
        chart: {
          height: 120,
          type: 'line',
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'solid',
          opacity: [0.25, 0.25],
        },
        labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ', 'Dec 10', 'Dec 11'],
        markers: {
          size: 3,
        },
        yaxis: [
          {
            title: {
              text: 'Seller value',
            },
          },
          {
            opposite: true,
            title: {
              text: 'Buyer value',
            },
          },
        ],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y: number) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            }
          }
        }
      }
    }
  },
  async mounted() {
    await this.getDataAsync()
  }
})
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
    </ol>
  </nav>
  <!--end:: Dashboard-->

  <!--begin:: Categories Skeletons-->
  <ul v-show="isLoaded == false">
    <template v-for="element in spinner">
      <Spinner class="my-5 mx-5">

      </Spinner>
    </template>
  </ul>
  <!--end:: Categories Skeletons-->
  <ul v-show="isLoaded==true">
    <DashboardViewComponent :apiData="apiBuyerCount" :countUser="apiUserCount" :countSeller="apiSellerCount"
      :countAgreed="apiStorageCount" :summaAnnouncemet="summa" :countBuyer="apiBuyerCount" />
  </ul>
  <div
    class="mt-11 mx-12   text-gray-900 dark:text-white bg-gray-75 border border-gray-200 rounded-lg  shadow dark:bg-gray-900 dark:border-gray-700 group"
    style="width: 1100px; border-radius: 10px;border-width: 1px; margin-top: 100px;">
    <h3 href="#" style="font-size: 20px;"
      class=" mt-5 mx-7 uppercase text-sm font-semibold inline-flex items-center rounded-lg light:text-white dark:text-white dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
      {{ $t('SalesReport') }}
    </h3>
    <apexchart
      class=" font-semibold inline-flex items-center rounded-lg light:text-white dark:text-dark hover:text-gray-700 dark:hover:text-white-500 "
      type="line" height="500" width="1090" :options="chartOptions" :series="series" style="">
    </apexchart>
  </div>
</template>