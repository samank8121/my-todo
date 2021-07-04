import React, { useState, useEffect } from 'react';
import TimePicker, { TimePickerValue } from 'react-time-picker';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function CustomTime(props: { initTime: Date; onChangeTime: (e: TimePickerValue) => void }) {
  const { initTime, onChangeTime } = props;
  const [timeState, setTime] = useState(initTime ? initTime : new Date());
  useEffect(() => {
    setTime(initTime);
  }, [initTime]);

  return (
    <>
      <TimePicker disableClock={true} clearIcon={null} clockIcon={null} value={timeState} onChange={onChangeTime} />
    </>
  );
}
