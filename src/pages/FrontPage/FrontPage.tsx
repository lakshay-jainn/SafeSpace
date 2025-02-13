
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";

export default function FrontPage(){
    return (
        <div className="max-h-screen  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-orange-400
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 overflow-y-scroll">
      <NavBar />
      <main className="bg-white">
        <Hero />
        <Features />
      </main>
    </div>
    )
}
