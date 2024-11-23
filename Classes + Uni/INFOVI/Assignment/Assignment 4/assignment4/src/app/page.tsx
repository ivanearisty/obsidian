'use client'

import CTA from "@/components/cta";
import RateGraphWrapper from "@/components/graphwrapper";
import Hero from "@/components/hero";
import RateGraph from "@/components/rategraph";
import { DataPoint } from "@/types/types";
import {Lenis, ReactLenis, useLenis} from "lenis/react"

export default function Home() {
  const data1: DataPoint[] = [
    { x: 0, y: 10 },
    { x: 10, y: 30 },
    { x: 20, y: 25 },
    { x: 30, y: 50 },
  ];
  
  const data2: DataPoint[] = [
    { x: 0, y: 5 },
    { x: 10, y: 15 },
    { x: 20, y: 10 },
    { x: 30, y: 20 },
  ];
  
  const data3: DataPoint[] = [
    { x: 0, y: 20 },
    { x: 10, y: 40 },
    { x: 20, y: 35 },
    { x: 30, y: 60 },
  ];
  

  return (
    <Lenis root>
      <main className="bg-primary text-background min-h-screen">
        
        <Hero />

        <section id="charts" className="py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Chart 1: Rising Trends</h2>
              <RateGraphWrapper data={data1} />
              <p className="mt-4 text-lg">
                Well I watch you tangle every weekend it might start different
                but it ends up the same
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Chart 2: Stigma's Impact</h2>
              <RateGraphWrapper data={data2} />
              <p className="mt-4 text-lg">
                Jerry can of, words and tones. Oh, you're so happy now, dancing
                to the latest sounds. And there's something that frankie used to say
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Chart 3: Importance of Support
              </h2>
              <RateGraphWrapper data={data3} />
              <p className="mt-4 text-lg">
                Strong support systems can make a difference. This chart
                highlights the correlation between support and recovery.
              </p>
            </div>
          </div>
        </section>

        <CTA />
        
      </main>
    </Lenis>
  );
}
