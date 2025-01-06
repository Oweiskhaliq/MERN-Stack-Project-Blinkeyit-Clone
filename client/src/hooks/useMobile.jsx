import React, { useEffect, useState } from "react";
import { use } from "react";

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  const handlerResizer = () => {
    const checkpoint = window.innerWidth < breakpoint;
    setIsMobile(checkpoint);
  };
  useEffect(() => {
    handlerResizer();
    window.addEventListener("resize", handlerResizer);

    return () => {
      window.removeEventListener("resize", handlerResizer);
    };
  }, []);
  return [isMobile];
};

export default useMobile;
