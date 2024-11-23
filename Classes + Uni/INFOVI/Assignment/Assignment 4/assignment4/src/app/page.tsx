'use client'

import RateGraphWrapper from "@/components/graphwrapper";
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
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center h-screen px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Raising Awareness About Men's Depression
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            OLD YELLOW BRICKS, looks a risk, quite the little as good pologist,
            
          </p>
          <a
            href="#charts"
            className="mt-8 bg-accent text-primary px-6 py-3 rounded-lg text-lg hover:bg-highlight transition"
          >
            Explore the Data
          </a>
        </section>

        {/* Data Visualization Section */}
        <section id="charts" className="py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Chart 1: Rising Trends</h2>
              <RateGraphWrapper data={data1} />
              <p className="mt-4 text-lg">
                This chart shows the rising prevalence of depression among men
                over the years. Notice the steep incline in recent times.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Chart 2: Stigma's Impact</h2>
              <RateGraphWrapper data={data2} />
              <p className="mt-4 text-lg">
                A significant barrier to men seeking help is the stigma
                surrounding mental health. This chart visualizes its impact.
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

        {/* Call to Action */}
        <section className="bg-secondary text-primary py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">Take Action</h2>
          <p className="text-xl mb-8">
            Join us in spreading awareness and providing support to those who
            need it most. Together, we can make a difference.
          </p>
          <a
            href="#"
            className="bg-accent text-primary px-8 py-4 rounded-lg text-lg hover:bg-highlight transition"
          >
            Get Involved
          </a>
        </section>
      </main>
    </Lenis>
  );
}
