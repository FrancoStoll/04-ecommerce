'use client'
import { useState } from "react";
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductSlideshow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ 
          swiper: thumbsSwiper 
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        autoplay={{
          delay:2000
        }}
        className="mySwiper2"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={1024}
                height={800}
                src={`/products/${image}`}
                alt={title}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={1024}
                height={800}
                src={`/products/${image}`}
                alt={title}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>

  )
}
