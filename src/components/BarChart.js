import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({series = [], labels = [], width = 400}) => {
  const options = {
    chart: {
      width: width,
      type: 'bar',
    },
    xaxis: {
      categories: labels,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };


  return (
    <ReactApexChart 
      options={options} 
      series={[{data: series}]} 
      type="bar"
      width={width}
    />
  );
};

export default BarChart;