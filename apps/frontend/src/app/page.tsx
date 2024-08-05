import Hero from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";

export default function Home() {
  return (
    <main className="pb-48">
      <Hero />
      <div className="pt-8">
        <HeroVideo />
      </div>
    </main>
  );
}
