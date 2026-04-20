import TitleHeader from "./components/TitleHeader";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fade = Math.max(1 - scrollY / 500, 0.2);
  const scale = Math.max(1 - scrollY / 2000, 0.85);

  return (
    <div className="app">
      {/* Header Overlay */}
      <div
        className="header-overlay"
        style={{
          opacity: fade,
          transform: `scale(${scale})`,
          pointerEvents: scrollY > 400 ? "none" : "auto",
        }}
      >
        <TitleHeader />

        <div
          className="scroll-message"
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }
        >
          Scroll ↓
        </div>
      </div>

      {/* Page Content */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
