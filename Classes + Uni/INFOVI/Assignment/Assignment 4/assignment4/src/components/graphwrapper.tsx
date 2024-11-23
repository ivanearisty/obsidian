"use client";

import React, { useState, useEffect, useRef } from "react";
import RateGraph from "@/components/rategraph"; // Your existing chart component
import { DataPoint } from "@/types/types";
import { useLenis } from "lenis/react";

type RateGraphWrapperProps = {
  data: DataPoint[];
};

const RateGraphWrapper: React.FC<RateGraphWrapperProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Lenis hook to listen for scroll events
  useLenis(() => {
    if (ref.current && !isVisible) {
      const { top, bottom } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      if (top + 300 < windowHeight && bottom > 0) {
        console.log("Rendering chart...");
        setIsVisible(true);
      }
    }
  });  

  return (
    <div ref={ref} className="min-h-[400px]">
      {isVisible && <RateGraph data={data} />}
    </div>
  );
};

export default RateGraphWrapper;
