import React from 'react';
import Checkbox from '../components/checkbox';

const RunLapList = ( lapActive, lapNo, lapTime, lapDistance ) => (
  <div>
    <p>Active Lap <Checkbox checked={lapActive}> </Checkbox> lapNo {lapNo}, lapTime {lapTime} lapDistance {lapDistance}</p>
  </div>
);

export default RunLapList;
