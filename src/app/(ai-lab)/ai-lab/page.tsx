'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BrainCircuit, Palette, Lightbulb, Code, Brush, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

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

const AILabPage = () => {
  const { t } = useLanguage();

  const skills = t('aiLabSkills') || [];

  return (
    <div className="bg-transparent text-white min-h-screen">
      {/* Introduction Section with Video BG */}

      <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden text-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/video/videoia.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
        <div className="absolute inset-0 bg-background/70 z-10"></div>
        <div
          className="absolute inset-0 opacity-10 z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent z-10" />
        <div className="container relative z-20 mx-auto px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl"
            >
              {t('aiLabTitle')}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-8 text-foreground"
            >
              {t('aiLabIntro')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              {t('aiLabExperienceTitle')}
            </h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">

            <Card className="bg-card border border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{t('aiLabCalCostProTitle')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>{t('aiLabCalCostProChallenge')?.split(':')[0]}:</strong>{t('aiLabCalCostProChallenge')?.split(':')[1]}</p>
                <p><strong>{t('aiLabCalCostProSolution')?.split(':')[0]}:</strong>{t('aiLabCalCostProSolution')?.split(':')[1]}</p>
                <p><strong>{t('aiLabCalCostProResult')?.split(':')[0]}:</strong>{t('aiLabCalCostProResult')?.split(':')[1]}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{t('aiLabThemeGenTitle')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>{t('aiLabThemeGenChallenge')?.split(':')[0]}:</strong>{t('aiLabThemeGenChallenge')?.split(':')[1]}</p>
                <p><strong>{t('aiLabThemeGenSolution')?.split(':')[0]}:</strong>{t('aiLabThemeGenSolution')?.split(':')[1]}</p>
                <p><strong>{t('aiLabThemeGenResult')?.split(':')[0]}:</strong>{t('aiLabThemeGenResult')?.split(':')[1]}</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Skills & Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-16">
            <div className="text-center">
              <h3 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-primary">
                {t('aiLabSkillsTitle')}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-lg py-2 px-4">
                    #{skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-primary">
                {t('aiLabServicesTitle')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <Card className="bg-card border border-border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{t('aiLabServiceDevTitle')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t('aiLabServiceDevText')}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                        <Brush className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{t('aiLabServiceDesignTitle')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t('aiLabServiceDesignText')}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                        <BarChart className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{t('aiLabServiceStrategyTitle')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t('aiLabServiceStrategyText')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Lightbulb className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-headline text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              {t('aiLabCtaTitle')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('aiLabCtaText')}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="font-headline rounded-full bg-cta text-cta-foreground hover:bg-cta/90">
                <Link href="/contact">{t('aiLabCtaButton')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AILabPage;
