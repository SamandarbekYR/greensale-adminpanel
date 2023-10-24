<script lang="ts">
import { defineComponent } from "vue";
import axios from "../../plugins/axios";
import { formatDate } from "../../helpers//DataHelper";
import type { PostViewModel } from "../../viewmodels/SellerGetByIdViewModel";
// SellerGetByIdViewModels faylidan kelgan modulni ishlatishingiz mumkin
import FlowbiteSetUp from "../../FlowbiteSetup.vue";
//import InformationView from '../informations/InformationView.vue'
import deleteComponent from "../../components/sellerposts/SellerDeleteComponent.vue";
import editComponent from "../../components/sellerposts/SellerEditComponent.vue";
import PostSkeleton from '../../components/posts/PostGetBySkeleton.vue'
export default defineComponent({
  components: {
    FlowbiteSetUp,
    deleteComponent,
    editComponent,
    PostSkeleton
  },
  props: {
    createdAtString: Date,
    updatedAtString: Date,
  },
  data() {
    return {
      skeleton: 1 as Number,
      isLoaded: false as boolean,
      baseURL: "",
      imageFullPath: "",
      showModal: false,
      statusString: "" as string | null,
      status_zero: false as boolean,
      status_one: false as boolean,
      status_two: false as boolean,
      star_one: false as boolean,
      star_two: false as boolean,
      star_three: false as boolean,
      star_fo: false as boolean,
      star_five: false as boolean,
      image_one: false as boolean,
      image_two: false as boolean,
      image_three: false as boolean,
      image_fo: false as boolean,
      image_five: false as boolean,
      postList: {} as PostViewModel,
      AvarageStar: 0 as Number,

      fullName: "" as String,
      id: 0 as Number,
      userId: "" as String,
      userPhoneNumber: "" as String,
      postPhoneNumber: "" as String,
      userRegion: "" as String,
      categoryName: "" as String,
      title: "" as String,
      description: "" as String,
      price: 0 as Number,
      capacity: 0 as Number,
      capacityMeasure: "" as String,
      type: "" as String,
      region: "" as String,
      district: "" as String,
      updatedAt: Date,
      createdAt: Date,
      status: 0 as Number,
      postImages: [],
      test: false as boolean,

      ImageList: [] as string[],
      ImageIndex: [] as number[],

      showDeleteModal: false,
      sellerId: 0 as Number,

    };
  },
  watch: {
    ImageList: "load",
  },
  methods: {
    async getDataAsync() {
      this.isLoaded = false
      let SellerId = localStorage.getItem("sellerById");
      var response = await axios.get<PostViewModel>(
        "/api/common/seller/post/" + Number(SellerId)
      );
      this.isLoaded = true
      this.postList = response.data || {};

      if (this.postList.status! == 0) {
        this.statusString = "Yangi";
        this.status_zero = true;
      } else if (this.postList.status! == 1) {
        this.statusString = "Kelishilgan";
        this.status_one = true;
      } else if (this.postList.status! == 2) {
        this.statusString = "Olingan";
        this.status_two = true;
      }
      this.showModal = true;

      this.baseURL = axios.defaults.baseURL!;
      console.log(this.postList.postImages[0].imagePath);
      var i = 0;
      this.postList.postImages.forEach((element) => {
        this.ImageList.push(this.baseURL + "/" + this.postList.postImages[i].imagePath);
        this.ImageIndex.push(Number(i));
        i++;
      });
      console.log(this.ImageList);
      if (this.ImageList.length === 1) {
        this.image_one = true;
      } else if (this.ImageList.length === 2) {
        this.image_two = true;
      } else if (this.ImageList.length === 3) {
        this.image_three = true;
      } else if (this.ImageList.length === 4) {
        this.image_fo = true;
      } else if (this.ImageList.length === 5) {
        this.image_five = true;
      }

      console.log(this.image_one);
      //  this.updatedAtString = formatDate(this.postList.updatedAt!)
      this.AvarageStar = this.postList.status;
      if (this.postList.status === 0) {
        this.status_zero = true;
      } else if (this.postList.status == 1) {
        this.status_one = true;
      } else if ((this.postList.status == 2)) {
        this.status_two = true;
      }

      if (this.postList.userStars === 0) {
        this.star_one = false;
        this.star_two = false;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      } else if (this.postList.userStars == 1) {
        this.star_one = true;
        this.star_two = false;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      } else if (this.postList.userStars == 2) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      } else if (this.postList.userStars == 3) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = false;
        this.star_five = false;
      } else if (this.postList.userStars == 4) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = false;
      } else if (this.postList.userStars == 5) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = true;
      }

      this.AvarageStar = this.postList.averageStars;
    },

    async stars(stars_number: Number) {
      const formData = new FormData();
      const SellerId = localStorage.getItem("sellerById");
      if (SellerId != null) {
        formData.append("PostId", SellerId);
      }
      formData.append("Stars", stars_number.toString());

      const responsetwo = await axios.post("/api/admin/seller/post/star", formData);

      var response = await axios.get<PostViewModel>(
        "/api/common/seller/post/" + Number(SellerId)
      );

      this.postList = response.data || {};

      if (stars_number == 1) {
        this.star_one = true;
        this.star_two = false;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      } else if (stars_number == 2) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = false;
        this.star_fo = false;
        this.star_five = false;
      } else if (stars_number == 3) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = false;
        this.star_five = false;
      } else if (stars_number == 4) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = false;
      } else if (stars_number == 5) {
        this.star_one = true;
        this.star_two = true;
        this.star_three = true;
        this.star_fo = true;
        this.star_five = true;
      }
      this.AvarageStar = this.postList.averageStars;
    },
    openDeleteModal() {
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    async confirmDelete() {
      const sellerId = localStorage.getItem('sellerById');

      if (sellerId !== null) {
        console.log("/api/admin/seller/post/" + sellerId)
        const response = await axios.delete("/api/admin/seller/post/" + sellerId);
        console.log(response);
        this.closeDeleteModal();
        this.$router.push('sellers');
      }
    }

  },
  setup() { },
  async mounted() {
    await this.getDataAsync();
  },
});
</script>

<template>


  <FlowbiteSetUp></FlowbiteSetUp>

  <nav class="flex mb-5" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <a href="/dashboard" style="font-size: 16px; margin-left: 4px; font-weight: font-semibold"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <svg class="w-3 h-3 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            style="height: 13px; width: 13px" viewBox="0 0 20 20">
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
          <a href="#" style="font-size: 16px"
            class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
            {{ $t("sellerannnouncements") }}</a>
        </div>
      </li>
    </ol>
  </nav>

    <!--begin:: Post Skeletons-->
    <ul v-show="isLoaded==false">
    <template v-for="element in skeleton">
      <PostSkeleton
      class="my-5 mx-5">

      </PostSkeleton>
    </template>
  </ul>
  <!--end:: Post Skeletons-->
  <div v-show="isLoaded==true" class="flex" style="gap: 20px">
    <!--Begin corusel one image-->
    <div v-show="image_one == true" class="relative w-full my-5">
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div class=" duration-700 ease-in-out">
          <img :src="ImageList[0]" class="absolute block max-w-full h-full " alt="" />
        </div>
      </div>
    </div>
    <!--End corusel one image-->

    <!--Begin corusel two image-->
    <div v-show="image_two == true" id="gallery" class="relative w-full my-5" data-carousel="slide">
      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img :src="ImageList[0]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[1]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
      </div>
      <button type="button"
        class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 1 1 5l4 4" />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button"
        class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <!--End corusel two image-->
    <!--Begin corusel three image-->
    <div v-show="image_three == true" id="gallery" class="relative w-full my-5" data-carousel="slide">
      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img :src="ImageList[0]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[1]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[2]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[3]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
      </div>
      <!-- Slider controls -->
      <button type="button"
        class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 1 1 5l4 4" />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button"
        class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>



    <!--End corusel three image-->
    <!--Begin corusel fo image-->
    <div v-show="image_fo == true" id="gallery" class="relative w-full my-5" data-carousel="slide">
      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img :src="ImageList[0]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[1]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[2]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[3]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[4]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
      </div>
      <!-- Slider controls -->
      <button type="button"
        class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 1 1 5l4 4" />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button"
        class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <!--End corusel fo image-->
    <!--Begin corusel five image-->
    <div v-show="image_five == true" id="gallery" class="relative w-full my-5" data-carousel="slide">
      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img :src="ImageList[0]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[1]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[2]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[3]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
          <img :src="ImageList[4]"
            class="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
        </div>
      </div>
      <!-- Slider controls -->
      <button type="button"
        class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 1 1 5l4 4" />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button"
        class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next>
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>
    <!--End corusel five image-->

    <div class="flex" style="display: flex">
      <div
        class="w-full h-96 my-5 flex text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        style="flex-direction: column">
        <div class="">
          <div class="line"></div>
          <div class="flex">
            <h4 class="text-3xl tracking-tight text-black dark:text-white px-5 pt-2">
              {{ postList.title }}
            </h4>
            <h5 class="text-md mx-3 pt-4 tracking-tight text-gray-600 dark:text-gray-200" style="margin-left: auto">
              {{ updatedAtString }}
            </h5>
          </div>

          <div class="flex">
            <!--Begin::stars-->
            <div class="items-center mt-2.5 mb-2 mx-5">
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
              </button>
              <button @click="stars(5)" v-show="star_five == true">
                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </button>
              <!--Five Star-->
              <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{{
                  AvarageStar }}
              </span>
            </div>
            <!--End::stars-->

            <!--Begin::status-->
            <div class="mt-3 mr-4" style="margin-left: auto">
              <div v-show="status_zero == true"
                class="px-3 py-1.5 text-xs font-medium leading-none text-center text-green-800 bg-green-400 rounded-full animate-pulse dark:bg-green-900 dark:text-green-200">
                {{ $t("statustypezero") }}
              </div>
              <div v-show="status_one == true"
                class="px-3 py-1.5 text-xs font-medium leading-none text-center text-yellow-800 bg-yellow-400 rounded-full animate-pulse dark:bg-yellow-900 dark:text-yellow-200">
                {{ $t("statustypeone") }}
              </div>
              <div v-show="status_two == true"
                class="px-3 py-1.5 text-xs font-medium leading-none text-center text-red-800 bg-red-400 rounded-full animate-pulse dark:bg-red-900 dark:text-red-200">
                {{ $t("statustypetwo") }}
              </div>
            </div>
            <!--End::status-->
          </div>

          <h4 class="text-2xl tracking-tight black dark:text-gray-100 px-5">
            {{ postList.price }}UZS
          </h4>

          <h4 class="text-base tracking-tight black dark:text-gray-300 px-5">
            {{ postList.capacity }} {{ postList.capacityMeasure }}
          </h4>

          <p class="font-normal text-md text-gray-700 dark:text-gray-200 px-5 my-2" style="width: 290px">
            {{ postList.description }}
          </p>
          <p class="font-normal text-sm text-gray-700 dark:text-gray-300 px-5" style="width: 290px">
            {{ postList.type }}
          </p>
        </div>
        <div class="w-96 flex my-3 pt-2" style="gap: 10px; margin-top: auto">

          <div class="flex" style="gap: 5px">
            <div class="pl-4">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px"
                height="16px" viewBox="0 0 24 24" version="1.1" class="text-gray-900 dark:text-white w-4 h-5">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24"></polygon>
                  <path
                    d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                    fill="currentColor" fill-rule="nonzero" opacity="0.3"></path>
                  <path
                    d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                    fill="currentColor" fill-rule="nonzero"></path>
                </g>
              </svg>
            </div>
            <h4 class="text-sm tracking-tight black dark:text-gray-400">Sotuvchi</h4>
          </div>
          <div>
            <h4 class="text-sm tracking-tight black dark:text-white px-5">
              {{ postList.fullName }}
            </h4>
            <h4 class="text-sm tracking-tight black dark:text-gray-200 px-5">
              {{ postList.userPhoneNumber }} {{ postList.postPhoneNumber }}
            </h4>
          </div>




        </div>
        <div class="w-96 flex mb-4 mt-2" style="gap: 10px;">

          <div class="flex" style="gap: 5px">

            <div class="pl-4">
              <icon name="location" class="py-2" style=""></icon>
            </div>
            <h4 class="text-sm tracking-tight black dark:text-gray-400">Manzil</h4>
          </div>
          <div>
            <h4 class="text-sm tracking-tight black dark:text-gray-100 px-5">
              {{ postList.region }} {{ postList.district }}
            </h4>
            <h4 class="text-sm tracking-tight black dark:text-gray-200 px-5">
              Yangiturmush MFY Tursinzoda 45-Uy
            </h4>
          </div>



          <div></div>
        </div>
      </div>
    </div>
  </div>
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
          <svg class="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
