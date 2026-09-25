import Artistas from "@/components/Artistas";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImpactMarquee from "@/components/ImpactMarquee";
import Sobre from "@/components/Sobre";
import Estatisticas from "@/components/Estatisticas";
import OQueFazemos from "@/components/OQueFazemos";
import HistoriaFuturo from "@/components/HistoriaFuturo";
import VideoShowcase from "@/components/VideoShowcase";
import EventosDestaque from "@/components/EventosDestaque";
import Galeria from "@/components/Galeria";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ImpactMarquee />
        <Sobre />
        <Estatisticas />
        <Artistas />
        <OQueFazemos />
        <HistoriaFuturo />
        <VideoShowcase />
        <EventosDestaque />
        <Galeria />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Home;
