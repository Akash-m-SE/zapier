import Hero from "@/components/Hero";
import HeroVideo from "@/components/HeroVideo";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center m-5">
      <Hero />
      <HeroVideo />
    </main>
  );
}
