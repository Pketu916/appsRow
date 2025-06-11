import heroImg from "../assets/Elegant Portrait in Monochrome.jpg";
import heroVideo from "../assets/853919-hd_1920_1080_25fps.mp4";

export const Hero = () => {
  return (
    <section id="hero" className="h-[100vh] w-[100vw]">
      <div className="h-full w-full relative ">
        <div className=" flex w-full h-[70vh] items-center justify-center">
          <div className="flex flex-col items-start gap-[1vw]">
            <h1>Hello, I'm Ketu</h1>
            <p className=" text-shadow-2lg">
              a Frontend Developer crafting smooth digital experiences
            </p>
            <button className="paragraph">Click Me</button>
          </div>
        </div>
        <video className="pointer-events-none absolute top-0 -z-10" src={heroVideo} autoPlay></video>
      </div>
    </section>
  );
};

export default Hero;
