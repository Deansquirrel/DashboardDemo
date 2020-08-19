import React from 'react';
import { ILine2Data } from './Line2Data';
import { Chart, LineAdvance } from 'bizcharts';

export interface ILineTowProps {
  list: ILine2Data[];
}

export default (props: ILineTowProps) => {
  const { list } = props;
  return (
    <Chart
      padding={[10, 20, 50, 40]}
      autoFit
      // height={300}
      data={list}
    >
      <LineAdvance
        shape="smooth"
        point
        area
        position="month*temperature"
        color="city"
      />
    </Chart>
  );
};
