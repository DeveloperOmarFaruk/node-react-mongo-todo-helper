import React from "react";
import Chart from "react-apexcharts";

const TotalTodoChart = ({ todos, todosComplete }) => {
  const series = [todosComplete.length, todos.length];
  const options = {
    chart: {
      width: 380,
      type: "donut",
      foreColor: "#ccc",
    },
    colors: ["#A569BD", "#DC7633"],
    labels: ["Total Todo Complete", "Total Todo Incomplete"],
    // title: {
    //   text: "Total Todo Chart",
    //   style: {
    //     fontSize: "23px",
    //     marginBottom: "40px",
    //   },
    // },
    legend: {
      position: "left",
      offsetY: 0,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
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

export default TotalTodoChart;
