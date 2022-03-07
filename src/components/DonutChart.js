import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = ({series = [], labels = [], width = 400, legendPos = 'bottom'}) => {
  const options = {
    chart: {
      width: width,
      type: 'donut',
    },
    dataLabels: {
      enabled: false
    },
    labels: labels,
    legend: {
      position: legendPos,
      horizontalAlign: 'left',
      show: true,
    }
  };

  return (
    <ReactApexChart 
      options={options} 
      series={series} 
      type="donut"
      width={width}
    />
  );
};

export default DonutChart;