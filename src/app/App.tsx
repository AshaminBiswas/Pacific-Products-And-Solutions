import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import { router } from "./routes";

export default function App() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <HelmetProvider>
      <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
        <RouterProvider router={router} />
      </MotionConfig>
    </HelmetProvider>
  );
}

