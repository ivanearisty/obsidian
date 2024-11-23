"use client";

import React, { useState, useEffect, useRef } from "react";
import RateGraph from "@/components/rategraph"; // Your existing chart component
import { DataPoint, RateGraphProps } from "@/types/types";
import { useLenis } from "lenis/react";

const RateGraphWrapper: React.FC<RateGraphProps> = ({ datasets }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
    // Lenis hook to listen for scroll events
    useLenis(() => {
      if (ref.current && !isVisible) {
        const { top, bottom } = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
        if (top + 300 < windowHeight && bottom > 0) {
          setIsVisible(true);
        }
      }
    });
  
    return (
      <div ref={ref} className="min-h-[400px]">
        <h1 className="text-4xl font-bold mb-8>
            s
        </h1>
        {isVisible && <RateGraph datasets={datasets} />}
      </div>
    );
  };
  
  export default RateGraphWrapper;
  