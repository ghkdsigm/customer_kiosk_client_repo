<template>
    <!-- Slider -->
    <swiper
        :slides-per-view="1"
        :space-between="100"
        :modules="modules"
        navigation
        :pagination="pagination"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="mySwiper h-full"
    >
        <swiper-slide v-for="(item, idx) in items" :key="idx">
            <img :src="item.newsContent ? getImageSrc(item.newsContent) : '@/assets/img/news/example01.png'" :alt="item.newsTitle" class="h-5/6 block mx-auto" />
        </swiper-slide>
    </swiper>
  </template>
  
  <script>
  // import Swiper core and required modules
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';

  export default {
    name: 'HomeNews',
    props:{
        items:{
            type: Array,
            default: () => []
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
        const onSwiper = (swiper) => {
        console.log(swiper);
        };
        const onSlideChange = () => {
        console.log('slide change');
        };
        const images = import.meta.glob('@/assets/img/news/*.png', { eager: true });
        const getImageSrc = (img) => {
            const fileName = `/src/assets/img/news/${img}.png`;
            return images[fileName]?.default || images[fileName];
        }

      return {
        onSwiper,
        onSlideChange,
        getImageSrc,
        pagination: {
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
        modules: [Navigation, Pagination, Scrollbar, A11y],
      };
    },
  }
  </script>
  
  <style>
    .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .swiper-slide img {
    display: block;
    object-fit: cover;
    }

    .swiper-pagination-bullet {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    font-weight:500;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
    }

    .swiper-pagination-bullet-active {
    color: #fff;
    background: #0C7E60;
    }
  </style>