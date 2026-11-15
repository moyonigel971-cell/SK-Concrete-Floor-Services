import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { Calculator } from './components/Calculator';
import { CoverageSection } from './components/CoverageSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';
import { MediaModal } from './components/MediaModal';
import { FloatingCallBar } from './components/FloatingCallBar';
import { ProjectMedia } from './types/concrete';

export default function App() {
  const [activeMedia, setActiveMedia] = useState<ProjectMedia | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenVideoModal={(src, title) => {
          setActiveMedia({
            id: 'hero-video',
            title,
            category: 'videos',
            type: 'video',
            src,
            description: 'Inspection of high-gloss polished warehouse concrete floor slab in Cape Town.',
            location: 'Cape Town, Western Cape',
            highlight: 'Superflat Mirror Polish'
          });
        }} />

        {/* 4-KPI Row */}
        <StatsStrip />

        {/* Core Services Bento */}
        <ServicesSection />

        {/* Real Job Site Project Footage & Photos */}
        <GallerySection onSelectMedia={(media) => setActiveMedia(media)} />

        {/* South African Concrete Volume & Cost Calculator */}
        <Calculator />

        {/* Cape Town & Western Cape Coverage */}
        <CoverageSection />

        {/* Contractor Rigor */}
        <WhyChooseUs />

        {/* Google & Client Reviews */}
        <ReviewsSection />

        {/* Quote Request & Direct Hotline */}
        <QuoteSection />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Lightbox / Video Modal */}
      <MediaModal 
        item={activeMedia} 
        onClose={() => setActiveMedia(null)} 
      />

      {/* Mobile Floating Sticky Quick-Call Bar */}
      <FloatingCallBar />
    </div>
  );
}
