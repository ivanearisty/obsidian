import RateGraph from "@/components/rategraph";
import { DataPoint } from "@/types/types";

export default function Home() {
  const sampleData: DataPoint[] = [
    { x: 0, y: 2 },
    { x: 10, y: 15 },
    { x: 20, y: 8 },
    { x: 30, y: 20 },
  ];

  return (
    <div>
      <RateGraph data={sampleData} />
    </div>
  );

}
