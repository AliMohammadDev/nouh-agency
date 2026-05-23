import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Stats from '../components/sections/Stats';
import CTABand from '../components/sections/CTABand';
import ArchShowcase from '../components/sections/ArchShowcase';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ArchShowcase />
      <Stats />
      <CTABand />
    </>
  );
}
