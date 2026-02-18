import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import MarketAnalysis from '../components/MarketAnalysis';
import BrandDNA from '../components/BrandDNA';
import VoicePersonality from '../components/VoicePersonality';
import Services from '../components/Services';
import Footer from '../components/Footer';
import ScrollBus from '../components/ScrollBus';

export default function Home() {

  return (
    <main className="w-full bg-dtll-warmWhite relative">
      <ScrollBus />

      <div id="hero">
        <Hero />
      </div>

      <div id="market-analysis">
        <MarketAnalysis />
      </div>

      <div id="brand-dna">
        <BrandDNA />
      </div>

      <div id="why-choose-us">
        <VoicePersonality />
      </div>

      <div id="services">
        <Services />
      </div>

      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
