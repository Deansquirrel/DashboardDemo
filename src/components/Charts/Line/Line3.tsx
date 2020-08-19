import React from 'react';
import { ILine2Data } from './Line2Data';
import { Chart, Line, Point } from 'bizcharts';

export interface ILineTowProps {
  list: ILine2Data[];
}

export default (props: ILineTowProps) => {
  const { list } = props;
  return (
    <Chart
      scale={{ temperature: { min: 0 } }}
      padding={[30, 20, 50, 40]}
      autoFit
      // height={320}
      data={list}
    >
      <Line
        shape="smooth"
        position="month*temperature"
        color="city"
        label={['temperature', { style: { fill: 'white' } }]}
      />
      <Point position="month*temperature" color="city" />
    </Chart>
  );
};
