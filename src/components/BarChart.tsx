import { DataSet, Theme } from "../utils/interfaces";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeScale,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { useCallback, useRef } from "react";
import CustomButton from "./CustomButton";
import { downloadPdf } from "../utils/utils";
import CustomContainer from "./CustomContainer";
import Spacer from "./Spacer";
import { useFullScreenHandle } from "react-full-screen";
import FullScreenComponent from "./FullScreenComponent";

ChartJS.register(
  LinearScale,
  CategoryScale,
  TimeScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export interface Props {
  chartData: DataSet;
  theme: Theme;
}
const BarChart = ({ chartData, theme }: Props) => {
  let ref = useRef<any>(null);

  const handle = useFullScreenHandle();

  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "HydroChart.png";
    if (ref.current != null) {
      link.href = ref["current"].toBase64Image();
      link.click();
    }
  }, []);

  return (
    <div>
      <FullScreenComponent handle={handle}>
        <Chart
          ref={ref}
          className="hydro-chart"
          type="bar"
          data={chartData}
          options={{
            responsive: true,
            interaction: {
              mode: "index" as const,
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
                text: "Operate hydro with efficiency",
              },
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  filter: function (legendItem: any, chartData: any) {
                    if (
                      legendItem.text !== "Power Minimum" &&
                      legendItem.text !== "Power Maximum"
                    ) {
                      return legendItem.text;
                    }
                  },
                },
              },
            },
            scales: {
              x: {
                type: "time",
                display: true,
                time: {
                  displayFormats: {
                    day: "DD MMM 'YY",
                  },
                  unit: "day",
                },
              },
              y: {
                beginAtZero: true,
                type: "linear",
                display: true,
                position: "left",
                title: {
                  display: true,
                  text: "MW",
                },
              },
              y1: {
                beginAtZero: true,
                type: "linear",
                display: true,
                position: "right",
                grid: {
                  drawOnChartArea: false,
                },
                title: {
                  display: true,
                  text: "Efficiency %",
                  color: theme.efficiency,
                },
                ticks: {
                  color: theme.efficiency,
                },
              },
            },
          }}
          width={1200}
          height={600}
        />
      </FullScreenComponent>

      <CustomContainer
        width={800}
        height={80}
        style={{ flexDirection: "row", padding: 0, margin: 0 }}
      >
        <CustomButton
          text={"Go fullscreen"}
          backgroundColor={theme.efficiency}
          textColor={theme.plan}
          width={70}
          height={30}
          onClick={handle.enter}
        />
        <CustomButton
          text={"Download as image"}
          backgroundColor={theme.efficiency}
          textColor={theme.plan}
          width={80}
          height={60}
          onClick={downloadImage}
        />
        <Spacer height={40} />
        <CustomButton
          text={"Download as pdf"}
          backgroundColor={theme.efficiency}
          textColor={theme.plan}
          width={80}
          height={60}
          onClick={downloadPdf}
        />
      </CustomContainer>
    </div>
  );
};

export default BarChart;
