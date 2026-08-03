import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { T, HC_BASE } from "../constants/theme";
import { Card } from "./Card";
import { Dot } from "./Dot";

const verticalBarGradient = (hex) => ({
  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
  stops: [
    [0, hex],
    [1, Highcharts.color(hex).brighten(-0.35).get("rgb")],
  ],
});

function buildSeries(data) {
  return [
    {
      name: "Pending calls",
      data: data.callStatusDetails.map((d) => d.pending),
      color: verticalBarGradient(T.amber),
    },
    {
      name: "Part Pending",
      data: data.callStatusDetails.map((d) => d.partPending),
      color: verticalBarGradient(T.teal),
    },
    {
      name: "Closed calls",
      data: data.callStatusDetails.map((d) => d.closed),
      color: verticalBarGradient(T.green),
    },
    {
      name: "Cancelled calls",
      data: data.callStatusDetails.map((d) => d.cancelled),
      color: verticalBarGradient(T.red),
    },
  ];
}

function buildOptions(data, { labelFontSize }) {
  return {
    ...HC_BASE,
    chart: { type: "column", backgroundColor: "transparent", spacing: [8, 8, 8, 0] },
    xAxis: {
      categories: data.callStatusDetails.map((d) => d.day),
      lineColor: T.border,
      tickColor: T.border,
      labels: { style: { fontSize: labelFontSize, color: "#374151" } },
    },
    yAxis: {
      title: { text: null },
      min: 0,
      max: 120,
      tickInterval: 20,
      gridLineDashStyle: "Dash",
      gridLineColor: T.border,
      labels: { style: { fontSize: labelFontSize, color: "#374151" } },
    },
    legend: { enabled: false },
    tooltip: { shared: true },
    plotOptions: {
      column: {
        borderRadiusTopLeft: 4,
        borderRadiusTopRight: 4,
        borderWidth: 0,
        groupPadding: 0.12,
        pointPadding: 0.04,
      },
    },
    series: buildSeries(data),
  };
}

export function CallStatusDetailsCard({ data, onExpand }) {
  return (
    <Card
      title="Call Status Details"
      expandable
      onExpand={onExpand}
      className="col-span-2"
      centerTitle
      titleFontSize={22}
      expandedContent={
        <div className="flex flex-col -mt-10">
          <div style={{ height: "30vh" }}>
            <HighchartsReact
              highcharts={Highcharts}
              containerProps={{ style: { width: "100%", height: "100%" } }}
              options={buildOptions(data, { labelFontSize: "13px" })}
            />
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-10 shrink-0 justify-center text-[16px]">
            <Dot color={T.amber} label="Pending calls" />
            <Dot color={T.teal} label="Part Pending" />
            <Dot color={T.green} label="Closed calls" />
            <Dot color={T.red} label="Cancelled calls" />
          </div>
        </div>
      }
    >
      <div className="overflow-x-auto shrink-0">
        <div style={{ minWidth: 480, height: 480 }}>
          <HighchartsReact
            highcharts={Highcharts}
            containerProps={{ style: { width: "100%", height: "100%" } }}
            options={buildOptions(data, { labelFontSize: "11px" })}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-1.5 mt-3 shrink-0 text-[17px] font-bold">
        <Dot color={T.amber} label="Pending calls" />
        <Dot color={T.teal} label="Part Pending" />
        <Dot color={T.green} label="Closed calls" />
        <Dot color={T.red} label="Cancelled calls" />
      </div>
    </Card>
  );
}