"use client";

import Card from "@/components/card";
import CTA from "@/components/cta";
import RateGraphWrapper from "@/components/graphwrapper";
import Hero from "@/components/hero";
import RateGraph from "@/components/rategraph";
import { loadRatesData } from "@/libs/api";
import { DataPoint, Dataset } from "@/types/types";
import { Lenis, ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadRatesData();
      setDatasets(data);
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <Lenis root>
      <main className="bg-primary text-background min-h-screen">
        <Hero />

        <section className="text-center px-6 md:px-12 py-10">
          <h1 className="text-4xl font-bold mb-8">Men's Mental Health Rates</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Chart Column */}
            <div className="flex-1">
              {datasets.length > 0 && <RateGraphWrapper datasets={datasets} />}
            </div>

            {/* Placeholder Column */}
            <div className="flex-1 bg-secondary text-primary p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
              <div className="space-y-6">
                <Card
                  bigText="9 percent"
                  infoText="The percentage of men in the United States who have daily feelings of depression or anxiety, according to data from the National Health Interview Survey (2010–13)."
                />
                <Card
                  bigText="1 in 3"
                  infoText="The share of those men who took medication because of those feelings, according to the survey."
                />
                <Card
                  bigText="1 in 4"
                  infoText="The share who spoke to a mental health professional, according to the survey."
                />
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
    </Lenis>
  );
}
