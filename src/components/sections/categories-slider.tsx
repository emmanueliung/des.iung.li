'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const images = [
  '/categories/imag1.jpg',
  '/categories/imag2.jpg',
  '/categories/imag3.jpg',
  '/categories/imag4.jpg',
  '/categories/imag5.jpg',
  '/categories/imag6.jpg',
  '/categories/imag7.jpg',
];

const CategoriesSlider = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <Carousel 
          className="w-full"
          opts={{ 
            loop: true,
            align: 'start',
            dragFree: true,
          }}
          plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
          ]}
      >
        <CarouselContent className="-ml-1">
          {images.concat(images).map((src, index) => ( // Duplicate for seamless loop
            <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-1">
              <div className="group aspect-square relative overflow-hidden">
                <Image
                    src={src}
                    alt={`Category image ${index + 1}`}
                    fill
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default CategoriesSlider;
