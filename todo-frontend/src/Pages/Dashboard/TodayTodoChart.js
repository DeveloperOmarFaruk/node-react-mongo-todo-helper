import React from "react";
import Chart from "react-apexcharts";

//  "#3498DB", "#EC7063"

const TodayTodoChart = ({ todosFilter, todosCompleteFilter }) => {
  const series = [todosCompleteFilter.length, todosFilter.length];
  const options = {
    chart: {
      width: 380,
      type: "donut",
      foreColor: "#ccc",
    },
    colors: ["#3498DB", "#EC7063"],
    labels: ["Todo Complete", "Todo Incomplete"],
    title: {
      text: "Today's Todo Chart",
      style: {
        fontSize: "23px",
      },
    },
    legend: {
      position: "left",
      offsetY: 40,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <>
      <div id="chart">
        <Chart options={options} series={series} type="donut" height={350} />
      </div>
    </>
  );
};

export default TodayTodoChart;
