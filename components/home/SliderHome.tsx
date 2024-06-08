"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";

const messages = [
  {
    id: 1,
    name: "Un aprendizaje interesante",
    description:
      "Habilidades para tu presente (y tu futuro). Da tus primeros pasos con nosotros.",
    image: "/images/slide_1.jpg",
    href: "",
    text: "",
  },
  {
    id: 2,
    name: "Habilidades que te ayudan a avanzar",
    description:
      "La tecnología y el mundo laboral evolucionan muy rápido, pero con nosotros, podrás mantener el ritmo. Consigue las habilidades que necesitas para lograr tus objetivos y garantizar la competitividad.",
    image: "/images/slide_2.jpg",
    href: "/",
    text: "Plan para organizaciones",
  },
];

export default function SliderHome() {
  return (
    <div className="max-w-screen-2xl mx-auto h-[450px] border-gray-100 relative">
      <Swiper
        modules={[
          Autoplay,
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
        ]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        effect="fade"
        slidesPerView={1}
        spaceBetween={30}
        className="h-full w-full"
      >
        {messages.map((course, index) => (
          <SwiperSlide key={index}>
            <Image
              src={course.image}
              alt={course.name}
              className="h-full w-full block bg-no-repeat bg-bottom"
              // className="block w-full h-full"
              width={3000}
              height={3000}
              priority={true}
            />
            <div className="absolute bg-white bottom-8 left-4 lg:top-16 lg:left-20 p-4 lg:px-6 lg:py-8 flex flex-col items-start justify-center shadow-lg h-auto lg:h-80 w-[320px] lg:w-[480px]">
              <h2 className="text-base lg:text-2xl font-bold mb-2">{course.name}</h2>
              <h4 className="text-xs lg:text-lg">{course.description}</h4>
              {course.href && (
                <span className="bg-black text-base lg:text-xl text-white lg:font-semibold py-1 px-2 lg:px-3 lg:py-4 mt-2 lg:mt-4">
                  <Link href={course.href}>{course.text}</Link>
                </span>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
