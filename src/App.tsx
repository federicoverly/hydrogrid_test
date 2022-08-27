import { useEffect, useState } from "react";
import Chart from "./components/BarChart";
import { DataSet, Theme } from "./utils/interfaces";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
} from "chart.js";
import { Themes } from "./styles/globalStyles";
import SelectButton from "./components/SelectButton";
import { optionsData, optionsTheme } from "./utils/utils";
import { CircularProgress } from "@mui/material";
import CustomContainer from "./components/CustomContainer";
import Title from "./components/Title";
import Spacer from "./components/Spacer";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController
);

const App = () => {
  const [data, setData] = useState<DataSet>();
  const [theme, setTheme] = useState<Theme>(Themes.theme1);
  const [dataOption, setDataOption] = useState<string>(
    "https://run.mocky.io/v3/476d7474-9066-4da5-b40d-8990f09f5f3d"
  );

  useEffect(() => {
    fetch(dataOption)
      .then((response) => response.json())
      .then((data) =>
        setData({
          labels: data.data.map((d: any) => d.timestamp),
          datasets: [
            {
              order: 1,
              type: "bar",
              label: "Actual",
              data: data.data.map((d: any) => d.actual),
              backgroundColor: [theme.actual],
              yAxisID: "y",
              xAxisID: "x",
            },
            {
              order: 2,
              type: "bar",
              label: "Plan",
              data: data.data.map((d: any) => d.plan),
              backgroundColor: [theme.plan],
              yAxisID: "y",
              xAxisID: "x",
            },
            {
              order: 0,
              type: "line",
              label: "Efficiency",
              data: data.data.map((d: any) => d.efficiency),
              backgroundColor: [theme.efficiency],
              borderColor: [theme.efficiency],
              pointRadius: 0,
              yAxisID: "y1",
              xAxisID: "x",
            },
            {
              order: 3,
              type: "line",
              label: "Power Minimum",
              data: data.data.map((d: any) => d.minimum),
              backgroundColor: [theme.maxmin],
              pointRadius: 0.1,
              yAxisID: "y",
              xAxisID: "x",
            },
            {
              order: 4,
              type: "line",
              label: "Power Maximum",
              data: data.data.map((d: any) => d.maximum),
              backgroundColor: [theme.maxmin],
              pointRadius: 0.1,
              yAxisID: "y",
              xAxisID: "x",
            },
          ],
        })
      );
  }, [theme, dataOption]);

  const handleChangeTheme = (value: Theme) => {
    setTheme(value);
  };

  const handleChangeData = (value: string) => {
    setDataOption(value);
  };

  return (
    <>
      {data !== undefined ? (
        <CustomContainer width={1300} height={1000}>
          <Title
            text={"Operate your plant with insight"}
            color={theme.efficiency}
          />
          <CustomContainer
            width={1200}
            height={900}
            style={{ flexDirection: "row", padding: 0 }}
          >
            <Chart chartData={data} theme={theme} />
            <CustomContainer width={100} height={800}>
              <SelectButton
                title={"Theme"}
                handleChange={handleChangeTheme}
                value={theme}
                options={optionsTheme}
              />
              <Spacer height={20} />
              <SelectButton
                title={"Data"}
                handleChange={handleChangeData}
                value={dataOption}
                options={optionsData}
              />
            </CustomContainer>
          </CustomContainer>
        </CustomContainer>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default App;
