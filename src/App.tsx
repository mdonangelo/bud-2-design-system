import { useState, useEffect } from "react";
import { Sidebar } from "./docs/Sidebar";
import { Overview } from "./docs/sections/Overview";
import { Logos } from "./docs/sections/Logos";
import { Colors } from "./docs/sections/Colors";
import { Typography } from "./docs/sections/Typography";
import { Spacing } from "./docs/sections/Spacing";
import { Radius } from "./docs/sections/Radius";
import { Shadows } from "./docs/sections/Shadows";
import { Icons } from "./docs/sections/Icons";
import { Buttons } from "./docs/sections/Buttons";
import { Inputs } from "./docs/sections/Inputs";
import { Selects } from "./docs/sections/Selects";
import { Checkboxes } from "./docs/sections/Checkboxes";
import { Radios } from "./docs/sections/Radios";
import { Badges } from "./docs/sections/Badges";
import { Toggles } from "./docs/sections/Toggles";
import { Modals } from "./docs/sections/Modals";
import { Toasts } from "./docs/sections/Toasts";
import { Toaster } from "./components/Toast";
import s from "./App.module.css";

function App() {
  const [activeSection, setActiveSection] = useState("visao-geral");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={s.layout}>
        <Sidebar activeSection={activeSection} />
        <main className={s.main}>
          <Overview />
          <Logos />
          <Colors />
          <Typography />
          <Spacing />
          <Radius />
          <Shadows />
          <Icons />
          <Buttons />
          <Inputs />
          <Selects />
          <Checkboxes />
          <Radios />
          <Badges />
          <Toggles />
          <Modals />
          <Toasts />
        </main>
      </div>
      <Toaster />
    </>
  );
}

export default App;
