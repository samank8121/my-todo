import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../Styles/Calendar.css';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function CustomCalendar(props: { initDate: Date; onChangeDate: (d: Date) => void }) {
  const { initDate, onChangeDate } = props;
  const [dateState, setDateState] = useState(initDate ? initDate : new Date());

  useEffect(() => {
    setDateState(initDate);
  }, [initDate]);

  const formatShortWeekday = (locale: string, date: Date) => {
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()];
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigationLabel = ({ date, label, locale, view }: { date: Date; label: string; locale: string; view: string }) => {
    return date ? `${moment(date).format('MMMM YY')}` : label;
  };
  return (
    <>
      <Calendar
        value={dateState}
        prev2Label=''
        next2Label=''
        calendarType='US'
        navigationLabel={navigationLabel}
        showNeighboringMonth={false}
        onChange={onChangeDate}
        formatShortWeekday={formatShortWeekday}
      />
    </>
  );
}
