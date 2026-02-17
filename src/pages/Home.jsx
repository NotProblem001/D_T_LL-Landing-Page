import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import MarketAnalysis from '../components/MarketAnalysis';
import BrandDNA from '../components/BrandDNA';
import VoicePersonality from '../components/VoicePersonality';
import Footer from '../components/Footer';
import ScrollBus from '../components/ScrollBus';

// Keep the old sections if needed or requested, but the prompt asked to refactor strictly to the new sections.
// However, the "Servicios" and "Contact" (full form) might still be useful content.
// The user asked to include SPECIFIC sections 1-5.
// 2: Market Analysis replaces a generic section.
// 5: Footer is at the end.
// The user prompt didn't strictly say "DELETE EVERYTHING ELSE", but "Refactoriza... para incluir...".
// Sections like "Nuestros Servicios" (from old Home.jsx) are arguably covered by "Resumen de la Promesa" or might need to be kept as functional content (like the Contact Form).
// The user prompt lists "CTO Principal: Cotizar Traslado" in Hero.
// And "Footer" at the end.
// I will keep a "Contact" section if the "Footer" doesn't have a form, or assuming the "Cotizar Traslado" leads to a contact section.
// The old Home.jsx had a "Contactanos Directamente" section with WhatsApp and form.
// I will re-implement a Contact section just before the footer because a landing page usually needs a conversion point.
// Or I can just follow the requested 1-5 and assume "Footer" covers contact 'links'.
// But "Cotizar Traslado" CTA in Hero needs a target.
// I will create a simple Contact Section or reuse the logic from the old one but styled with Tailwind, 
// OR I will integrate it into the bottom before the footer.
// Given strict instructions "include the following sections in this logical order: 1, 2, 3, 4, 5", I will follow that order.
// If "Servicios" was not requested, maybe I should omit it? 
// "1. Hero ... 4. Voz y Personalidad ... 5. Footer".
// Wait, what about the actual Services description? 
// "DNA de Marca" covers "Mision/Vision".
// "Analisis de Mercado" covers "Dolores".
// Maybe "Servicios" should be between 2 and 3?
// User said: "Refactoriza... para incluir... en este orden lógico: 1. Hero, 2. Analisis, 3. ADN, 4. Voz, 5. Footer".
// I will follow STRICTLY. If I add extra sections I might be disobeying "strict adherence to manual".
// BUT, a landing page without Services or Contact Form might be incomplete.
// "CTA Principal: 'Cotizar Traslado'" -> Usually goes to a form.
// I'll add a simple "Contact / CTA" section before Footer, or assume Footer has enough contact info (it has phone/mail).
// I will assume the user wants JUST these new sections as the core narrative. I'll stick to 1, 2, 3, 4, 5.
// I'll add an ID="contacto" to the Footer or a wrapper around it or a small CTA block at the end of VoicePersonality?
// I'll add the IDs to the sections: id="inicio" (Hero), id="servicios" (MarketAnalysis?), id="contacto" (Footer?).
// Actually MarketAnalysis isn't "Services".
// I'll add IDs where they make sense. Hero is #inicio.
// I'll assume standard layout.

export default function Home() {

  return (
    <main className="w-full bg-dtll-warmWhite relative">
      <ScrollBus />

      <div id="inicio">
        <Hero />
      </div>

      <div id="mercado">
        <MarketAnalysis />
      </div>

      <div id="adn">
        <BrandDNA />
      </div>

      <div id="servicios">
        {/* Mapping "Why Choose Us" as a proxy for Services/Benefits */}
        <VoicePersonality />
      </div>

      <div id="contacto">
        {/* The footer contains contact info, but the CTA usually needs a distinctive area. 
            I'll render the Footer as requested. */}
        <Footer />
      </div>
    </main>
  );
}
