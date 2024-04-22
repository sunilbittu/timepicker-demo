import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ onSubmit, sameEndDate }) => {
  const timezone = "America/New_York";
  const [startDate, setStartDate] = useState(moment().tz(timezone).toDate());
  const [endDate, setEndDate] = useState(
    sameEndDate
      ? moment(startDate).tz(timezone).add(1, 'hour').toDate()
      : moment().tz(timezone).toDate()
  );

  const handleStartTimeChange = (date) => {
    const newStartDate = moment(date).tz(timezone).toDate();
    setStartDate(newStartDate);
    if (sameEndDate) {
      setEndDate(moment(newStartDate).tz(timezone).add(1, 'hour').toDate());
    }
  };

  const handleEndTimeChange = (date) => {
    const newEndDate = moment(date).tz(timezone).toDate();
    if (sameEndDate) {
      const maxEndDate = moment(startDate).tz(timezone).add(24, 'hours').toDate();
      setEndDate(newEndDate > maxEndDate ? maxEndDate : newEndDate);
    } else {
      setEndDate(newEndDate);
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() > selectedDate.getTime();
  };

  const filterEndTime = (time) => {
    const selectedTime = new Date(time);
    const limitEndTime = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    return selectedTime.getTime() <= limitEndTime.getTime() && selectedTime.getTime() >= startDate.getTime();
  };



  const handleSubmit = () => {
    // Convert selected dates to the desired timezone
    const startMoment = moment(startDate).tz("America/New_York").format('DD MM YYYY hh:mm:ss');
    const endMoment = moment(endDate).tz("America/New_York");

    
    ;  
    console.log(startMoment, endMoment);
    onSubmit(startMoment, endMoment.toDate());
  };

  return (
    <div style={{ display: "flex" }}>
      <DatePicker
        selected={startDate}
        onChange={handleStartTimeChange}
        dateFormat="MM/dd/yyyy"
        maxDate={new Date()}
        utcOffset={480}
        timeIntervals={30}

      />
      <DatePicker
        selected={startDate}
        onChange={handleStartTimeChange}
        showTimeSelect
        dateFormat="h:mm aa"
        filterTime={filterPassedTime}
        maxDate={new Date()}
        utcOffset={480}
        timeIntervals={30}
        showTimeSelectOnly
      />
        <DatePicker
          selected={endDate}
          onChange={handleEndTimeChange}
          maxDate={sameEndDate ? endDate : new Date()}
          dateFormat="MM/dd/yyyy"
          filterTime={sameEndDate ? filterEndTime : filterPassedTime}
          utcOffset={480}
          timeIntervals={30}
          minDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={handleEndTimeChange}
          maxDate={sameEndDate ? endDate : new Date()}
          dateFormat="h:mm aa"
          filterTime={sameEndDate ? filterEndTime : filterPassedTime}
          utcOffset={480}
          timeIntervals={30}
          minDate={endDate}
          showTimeSelect
          showTimeSelectOnly
        />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DateTimePicker;
