export interface Data {
  actual: number;
  efficiency: number;
  maximum: number;
  minimum: number;
  plan: number;
  timestamp: number | string;
}

export interface DataSet {
  labels: string[];
  datasets: {
    order: number;
    label?: string;
    data: Data[];
    backgroundColor?: string[];
    borderColor?: string[];
    type?: "line" | "bar";
    yAxisID: string;
    xAxisID: string;
    pointRadius?: number;
    borderWidth?: number;
  }[];
}

export interface Theme {
  plan: string;
  maxmin: string;
  actual: string;
  efficiency: string;
}
