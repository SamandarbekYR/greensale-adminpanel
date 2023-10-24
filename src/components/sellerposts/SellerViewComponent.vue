<script lang="ts">
import axios from '../../plugins/axios'
import { defineComponent } from 'vue'
import { initFlowbite } from 'flowbite'
import { formatDate } from '../../helpers/DataHelper'
import type { PostViewModel } from '../../viewmodels/SellerGetByIdViewModel'
export default defineComponent({
  components: {},

  props: {
    id: Number,
    fullName: String,
    userPhoneNumber: String,
    postPhoneNumber: String,
    categoryName: String,
    title: String,
    description: String,
    price: Number,
    capacity: Number,
    capacityMeasure: String,
    type: String,
    region: String,
    district: String,
    address: String,
    status: Number,
    averageStars: Number,
    userStars: Number,
    createdAt: Date,
    updatedAt: Date,
    mainImage: String
  },
  data() {
    return {
      baseURL: '' as String,
      createdAtString: '' as String,
      updatedAtString: '' as String,
      imageFullPath: '' as string,
      statusstring: '' as string,
      status_zero: false as boolean,
      status_one: false as boolean,
      status_two: false as boolean,
      star_one: false as boolean,
      star_two: false as boolean,
      star_three: false as boolean,



      star_fo: false as boolean,
      star_five: false as boolean,
      postList: {} as PostViewModel,
      AvarageStar: 0 as Number

    }
  },
  methods: {
    load() {
      this.baseURL = axios.defaults.baseURL!
      this.imageFullPath = this.baseURL + '/' + this.mainImage
      this.createdAtString = formatDate(this.createdAt!)
      this.updatedAtString = formatDate(this.updatedAt!)
      this.AvarageStar = Number(this.averageStars)
      if (this.status === 0) {
        this.status_zero = true
      } else if (this.status == 1) {
        this.status_one = true
      } else if ((this.status == 2)) {
        this.status_two = true
      }
      console.log(this.averageStars)
      if (this.userStars === 0) {
        this.star_one = false;
        this.star_two = false;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      }
      else if (this.userStars == 1) {
        this.star_one = true;
        this.star_two = false;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      }
      else if (this.userStars == 2) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      }
      else if (this.userStars == 3) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = false;
        this.star_five = false;
      }
      else if (this.userStars == 4) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = false;
      }
      else if (this.userStars == 5) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = true;
      }


    },
    exit() {
      localStorage.setItem('sellerById', this.id?.toString() || '')
      this.$router.push('sellerinformation')
    },
    async stars(stars_number: Number) {
      const formData = new FormData();
      if (typeof this.id === 'number') {
        formData.append("PostId", this.id.toString());
      } else {
        console.error('Invalid ID type');
        // Qanday ishlash kerakligini belgilang yoki xato xabarni ko'rsating.
      }
      formData.append("Stars", stars_number.toString());
      console.log(this.id);
      const responsetwo = await axios.post("/api/admin/seller/post/star", formData);




      if (stars_number == 1) {
        this.star_one = true;
        this.star_two = false;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      }
      else if (stars_number == 2) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      }
      else if (stars_number == 3) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = false;
        this.star_five = false;
      }
      else if (stars_number == 4) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = false;
      }
      else if (stars_number == 5) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = true;
      }
      var response = await axios.get<PostViewModel>('/api/common/seller/post/' + Number(this.id));
      this.postList = response.data || {};
      this.AvarageStar = this.postList.averageStars;
    }
  },
  mounted() {
    this.load()
  }
})
</script>

<template>
  <div class="m-1 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
    <a href="#">
      <img class="rounded-t-lg w-full" :src="imageFullPath" style="width: 290px; height: 200px" />
    </a>
    <div class="">
      <div class="flex">
        <div class="my-1.5">
          <icon name="location" class="py-2" style="margin-top: 10px"></icon>
        </div>

        <div class="flex pt-1" style="width: 265px">
          <h5 class="mb-2 mt-1 text-xs tracking-tight text-gray-600 dark:text-gray-200">
            {{ district }}
          </h5>
          <h5 class="mb-2 pt-1 text-xs mx-3 tracking-tight text-gray-600 dark:text-gray-200" style="margin-left: auto">
            {{ updatedAtString }}
          </h5>
        </div>
      </div>
      <div class="line"></div>
      <div>
        <div class="flex">
          <h4 class="text-lg tracking-tight text-black dark:text-white px-2 pt-2">{{ title }}</h4>
          <div class="mt-2 mr-2" style="margin-left: auto">
            <div v-show="status_zero == true"
              class="px-3 py-1.5 text-xs font-medium leading-none text-center text-green-800 bg-green-400 rounded-full animate-pulse dark:bg-green-900 dark:text-green-200">
              {{ $t('statustypezero') }}
            </div>
            <div v-show="status_one == true"
              class="px-3 py-1.5 text-xs font-medium leading-none text-center text-yellow-800 bg-yellow-400 rounded-full animate-pulse dark:bg-yellow-900 dark:text-yellow-200">
              {{ $t('statustypeone') }}
            </div>
            <div v-show="status_two == true"
              class="px-3 py-1.5 text-xs font-medium leading-none text-center text-red-800 bg-red-400 rounded-full animate-pulse dark:bg-red-900 dark:text-red-200">
              {{ $t('statustypetwo') }}
            </div>
          </div>
        </div>
        <div class="flex">
          <h4 class="text-base tracking-tight black dark:text-white px-2">
            {{ capacity }}{{ capacityMeasure }}
          </h4>

          <div class="mr-2" style="margin-left: auto">
            <h4 class="text-base tracking-tight black dark:text-white px-2">{{ price }}UZS</h4>
          </div>
        </div>
        <p class="font-normal text-xs text-gray-700 dark:text-gray-400 px-2" style="width: 290px">
          {{ description }}
        </p>

        <!--Begin::stars-->
        <div class="flex items-center mt-2.5 mb-2 mx-2">
          <!--One Star-->

          <button @click="stars(1)" v-show="star_one == false">
            <svg class="w-4 h-4 text-gray-200 dark:text-gray-600 mr-1" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <button @click="stars(1)" v-show="star_one == true">
            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <!--One Star-->
          <!--Two Star-->

          <button @click="stars(2)" v-show="star_two == false">
            <svg class="w-4 h-4 text-gray-200 dark:text-gray-600 mr-1" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <button @click="stars(2)" v-show="star_two == true">
            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <!--Two Star-->
          <!--Three Star-->

          <button @click="stars(3)" v-show="star_three == false">
            <svg class="w-4 h-4 text-gray-200 dark:text-gray-600 mr-1" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <button @click="stars(3)" v-show="star_three == true">
            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <!--Three Star-->

          <!--Fo Star-->

          <button @click="stars(4)" v-show="star_fo == false">
            <svg class="w-4 h-4 text-gray-200 dark:text-gray-600 mr-1" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <button @click="stars(4)" v-show="star_fo == true">
            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <!--Two Star-->
          <!--Two Star-->

          <button @click="stars(5)" v-show="star_five == false">
            <svg class="w-4 h-4 text-gray-200 dark:text-gray-600 mr-1" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button> <button @click="stars(5)" v-show="star_five == true">
            <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 22 20">
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
          <!--Five Star-->
          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{{
              AvarageStar }} </span>
        </div>
        <!--End::stars-->
      </div>

      <button @click="exit" type="button"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-1 text-center px-2 mx-2 mt-1 mb-3">
        {{ $t('koproq_malumot') }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.line {
  width: 100%;
  height: 1px;
  background: gray;
}

.sss {
  margin-top: 40px;
  margin-right: 0px;
  justify-content: end;
}

.gapp {
  gap: 95px;
}
</style>
