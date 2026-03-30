'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Typewriter from '@/components/typewriter';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const Hero = () => {
  const { t } = useLanguage();
  const heroTitleText = "Emmanuel Iung";

  return (
    <section id="hero" className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center py-20 text-center md:py-32">
       <Image
        src="https://picsum.photos/1920/1080"
        alt="Image de fond sombre et abstraite"
        fill
        className="object-cover"
        data-ai-hint="dark geometric"
        priority
       />
      <div className="absolute inset-0 bg-background/70" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
        }}
      />
       <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <Typewriter text={heroTitleText} />
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground md:text-xl"
            variants={itemVariants}
          >
            {t('heroSubtitle')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="font-headline rounded-full">
              <Link href="#portfolio">
                {t('heroCta')} <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
