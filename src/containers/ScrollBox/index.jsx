import React, { useEffect, useRef } from "react";
import { Scroll, ScrollContainer } from "./styled";

export const ScrollBox = ({ children }) => {
  const scrollContainer = useRef();
  useEffect(() => {
    const container = scrollContainer.current;
    // Listen to the mouse wheel event
    container.addEventListener("wheel", (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    });

    return () => {
      container.removeEventListener("wheel", () => {});
    };
  }, []);

  return (
    <ScrollContainer ref={scrollContainer}>
      <Scroll>{children}</Scroll>
    </ScrollContainer>
  );
};
