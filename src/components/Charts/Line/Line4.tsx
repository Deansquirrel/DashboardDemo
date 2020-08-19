import React from 'react';
import { ILine4Data } from './Line4Data';
import { Chart, Line } from 'bizcharts';

export interface ILine4Props {
  list: ILine4Data[];
}

export default (props: ILine4Props) => {
  const { list } = props;
  return (
    <Chart
      scale={{ value: { min: 0 } }}
      padding={[10, 20, 50, 40]}
      autoFit
      height={500}
      data={list}
    >
      <Line shape="hv" position="month*value" />
    </Chart>
  );
};
