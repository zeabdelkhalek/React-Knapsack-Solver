export const graphOptions = {
  chart: {
    type: "area",
    height: 350,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    align: "left",
    style: {
      fontSize: "14px",
    },
  },
  xaxis: {
    tickAmount: 20,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tickAmount: 10,
    floating: false,

    labels: {
      style: {
        colors: "#8e8da4",
      },
      offsetY: -7,
      offsetX: 0,
    },
  },
  fill: {
    opacity: 0.5,
  },
};
