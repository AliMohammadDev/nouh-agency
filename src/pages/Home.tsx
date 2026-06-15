import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Stats from '../components/sections/Stats';
import ArchShowcase from '../components/sections/ArchShowcase';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import TopLikedProjects from '../components/sections/TopLikedProjects';
import VideoShowcase from '../components/sections/VideoShowcase';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Features />

      <VideoShowcase />

      <TopLikedProjects />

      <ArchShowcase />
      <Stats />
    </>
  );
}
