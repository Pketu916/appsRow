import { useEffect, useRef } from "react";

export const Header = () => {
  const navbarRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (!navbarRef.current) return;

      if (scrollTop > lastScrollTop.current) {
        // Scrolling down - hide navbar
        navbarRef.current.style.top = "-10vw";
      } else {
        // Scrolling up - show navbar
        navbarRef.current.style.top = "0";
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="navbar"
      ref={navbarRef}
      className="p-[2.5vw] w-[100vw] flex justify-between"
      // style={{ transitionProperty: "top" }}
    >
      <div>
        <h2 className="text-[2vw]"><a href="#">KETU PATEL</a></h2>
      </div>
      <nav>
        <ul className="flex w-[50vw] justify-between">
          <li className="paragraph cursor-pointer">
            <a href="#">home</a>
          </li>
          <li className="paragraph cursor-pointer">
            <a href="#">Skills</a>
          </li>
          <li className="paragraph cursor-pointer">
            <a href="#">Projects</a>
          </li>
          <li className="paragraph cursor-pointer">
            <a href="#">contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
