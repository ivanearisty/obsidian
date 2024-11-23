'use client'

import CTA from "@/components/cta";
import RateGraphWrapper from "@/components/graphwrapper";
import Hero from "@/components/hero";
import RateGraph from "@/components/rategraph";
import { loadRatesData } from "@/libs/api";
import { DataPoint, Dataset } from "@/types/types";
import {Lenis, ReactLenis, useLenis} from "lenis/react"
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

        <section className="text-center ">
          <h1 className="text-4xl font-bold mb-8">Men's Mental Health Rates</h1>
          {datasets.length > 0 && <RateGraphWrapper datasets={datasets} />}
        </section>

        <CTA />

      </main>
    </Lenis>
  );
}
