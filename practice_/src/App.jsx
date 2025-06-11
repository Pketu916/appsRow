import "./App.css";
import Header from "./component/header";
import { Hero } from "./component/hero";
import Marquee from "./component/marquee";
import SkillGrid from "./component/skills";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee/>
      <SkillGrid />
    </>
  );
}

export default App;
