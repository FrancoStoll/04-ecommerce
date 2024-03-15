'use client'

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        navigation={true}
        pagination
        modules={[FreeMode, Autoplay, Pagination]}
        autoplay={{
          delay: 2000
        }}
        className="mySwiper2"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={600}
                height={500}
                src={`/products/${image}`}
                alt={title}
                className="object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

    </div>

  )
}
