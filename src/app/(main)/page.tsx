'use client';

import Hero from '@/components/sections/hero';
import PortfolioGrid from '@/components/sections/portfolio-grid';
import CustomCursor from '@/components/custom-cursor';
import CategoriesSlider from '@/components/sections/categories-slider';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <CategoriesSlider />
      <PortfolioGrid />
    </>
  );
}
