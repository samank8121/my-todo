import React, { useState, useEffect } from "react";
import TimePicker from 'react-time-picker';

export default function CustomTime(props: { initTime: Date, onChangeTime: any; }) {
    const { initTime, onChangeTime } = props;
    const [timeState, setTime] = useState(initTime ? initTime : new Date());
    useEffect(() => {
        setTime(initTime);
    }, [initTime]);
    return (
        <>
            <TimePicker
                disableClock={true}
                clearIcon={null}
                clockIcon={null}
                value={timeState}
                onChange={onChangeTime}
            />
        </>
    );
}
