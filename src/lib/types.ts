import type { StaticImageData } from 'next/image';

export type Language = 'fr' | 'en' | 'es';

export type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  imageUrls: string[];
  featuredImageUrl?: string;
  imageHints: string[];
  tags: string[];
  category: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  techStack?: string[];
  features?: string[];
};

export type PortfolioData = Record<Language, PortfolioItem[]>;

export type AppItem = {
  id: string;
  title: string;
  badge: {
    label: string;
    dotColor?: string;
  };
  subtitle: string;
  description: string;
  challenge?: string;
  solution?: string;
  features: string[];
  techStack: string[];
  sliderImage?: string;
  image: string;
  videoUrl?: string;
  gallery?: string[];
  liveUrl?: string;
  liveUrlLabel?: string;
  confidential?: boolean;
  confidentialNotice?: string;
};

export type Translations = {
  [key in Language]: {
    // Header
    aboutNav: string;
    portfolioNav: string;
    contactNav: string;
    aiLabNav: string;
    
    // Hero
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;

    // About
    aboutTitle: string;
    aboutParagraph1: string;
    aboutParagraph2: string;

    // Lab Apps Section
    labSectionBadge: string;
    labSectionTitle: string;
    labSectionSubtitle: string;
    labSectionCta: string;
    labModalChallengeTitle: string;
    labModalSolutionTitle: string;
    labModalFeaturesTitle: string;
    labModalTechTitle: string;
    labModalLiveBtn: string;
    labModalCloseBtn: string;
    labModalNoticeTitle: string;
    labCardHoverCta: string;
    labModalTabVideo: string;
    labModalTabImages: string;
    apps: AppItem[];

    // Portfolio
    portfolioTitle: string;
    portfolioFilterAll: string;
    portfolioFilterDesign: string;
    portfolioFilterDev: string;
    portfolioFilterAi: string;
    portfolioAiNotice: string;
    
    // AI Lab
    aiLabTitle: string;
    aiLabIntro: string;
    aiLabExperienceTitle: string;
    aiLabCalCostProTitle: string;
    aiLabCalCostProChallenge: string;
    aiLabCalCostProSolution: string;
    aiLabCalCostProResult: string;
    aiLabThemeGenTitle: string;
    aiLabThemeGenChallenge: string;
    aiLabThemeGenSolution: string;
    aiLabThemeGenResult: string;
    aiLabSkillsTitle: string;
    aiLabSkills: string[];
    aiLabServicesTitle: string;
    aiLabServiceDevTitle: string;
    aiLabServiceDevText: string;
    aiLabServiceDesignTitle: string;
    aiLabServiceDesignText: string;
    aiLabServiceStrategyTitle: string;
    aiLabServiceStrategyText: string;
    aiLabCtaTitle: string;
    aiLabCtaText: string;
    aiLabCtaButton: string;

    // Contact
    contactTitle: string;
    contactSubtitle: string;
    contactEmail: string;
    contactNamePlaceholder: string;
    contactEmailPlaceholder: string;
    contactMessagePlaceholder: string;
    contactSendButton: string;
    contactSendingButton: string;

    // Footer
    footerRights: string;

    // Form Messages
    formSuccessTitle: string;
    formSuccessMessage: string;
    formErrorTitle: string;
    formErrorMessage: string;

    // Portfolio Items
    portfolioItems: PortfolioItem[];
  };
};


    