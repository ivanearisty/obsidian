export type DataPoint = {
    x: number;
    y: number;
  };
  
  export type Dataset = {
    label: string;
    data: DataPoint[];
    color: string;
  };
  
  export type RateGraphProps = {
    datasets: Dataset[];
  };
  