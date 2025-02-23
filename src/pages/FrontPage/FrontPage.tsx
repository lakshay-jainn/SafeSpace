
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import ScrollbarCss from "@/scrollbarCss/ScrollbarCss";
export default function FrontPage(){
    return (
        <div className={`max-h-screen  ${ScrollbarCss} overflow-y-scroll`}>
      <NavBar />
      <main className="bg-white">
        <Hero />
        <Features />
      </main>
    </div>
    )
}
