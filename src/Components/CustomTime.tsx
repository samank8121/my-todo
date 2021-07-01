import React, { useState } from "react";
import TimePicker from 'react-time-picker';

export default function CustomTime(props: { initTime: Date, onChangeTime: any; }) {
    const { initTime, onChangeTime } = props;
    const [timeState, setTime] = useState(initTime ? initTime : new Date());

    return (
        <>
            <TimePicker
                value={timeState}
                onChange={onChangeTime}
            />
        </>
    );
}
