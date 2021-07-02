import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../Styles/Calendar.css";
import moment from "moment";

export default function CustomCalendar(props: { initDate: Date, onChangeDate: any; }) {
  const { initDate, onChangeDate } = props;
  const [dateState, setDateState] = useState(initDate ? initDate : new Date());

  useEffect(() => {
    setDateState(initDate);
  }, [initDate]);

  const formatShortWeekday = (locale: any, date: any) => {
    return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()];
  };

  const navigationLabel = ({ date, label, locale, view }: { date: any, label: any, locale: any, view: any }) => {
    return date === moment() ? `${moment(date).format("MMMM YY")}` : label;
  };
  return (
    <>
      <Calendar
        value={dateState}
        prev2Label=""
        next2Label=""
        calendarType="US"
        navigationLabel={navigationLabel}
        showNeighboringMonth={false}
        onChange={onChangeDate}
        formatShortWeekday={formatShortWeekday}
      />
    </>
  );
}
