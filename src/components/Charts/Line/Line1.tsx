import React from 'react';
import { Chart, Line, Point, Tooltip } from 'bizcharts';
import { ILine1Data } from './Line1Data';

export interface ILineOneProps {
  list: ILine1Data[];
}

export default (props: ILineOneProps) => {
  const { list } = props;
  return (
    <Chart
      padding={[10, 20, 50, 40]}
      autoFit
      // height={'50vh'}
      data={list}
      scale={{ value: { min: 0 } }}
    >
      <Line position="year*value" />
      <Point position="year*value" />
      <Tooltip showCrosshairs />
    </Chart>
  );
};
