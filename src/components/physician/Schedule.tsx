import React from 'react';

const DAYS_OF_WEEK = [
  "   ",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HOURS_OF_DAY = [
  "12AM", 
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12AM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];

const SHORT_DAYS_OF_WEEK = DAYS_OF_WEEK.map(day => day.substring(0,3).toUpperCase())
const Schedule = () => {

  const renderBox = (n = 1) => {
    const list = Array(n).fill(<div className="box"></div>);
    return list;
  }

  const renderHours = () => {
    const list = Array(24).fill(0).map((_, i) => <div key={i} style={{color:"white", alignSelf: "center"}}>{HOURS_OF_DAY[i]}</div>);
    return list;
  }

  const renderDaysOfWeek = () => {
    const list = SHORT_DAYS_OF_WEEK.map((day, index) => <div style={{textAlign: "center", color: "#fff", alignSelf:"center"}} key={index}>{day}</div>)
    return list;
  }
  return (
    <div className="ffc">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="grid">
          <div
            style={
              {
                display: "grid",
                gridRow: "1 / 2",
                gridColumn: "1 / 9",
                gridTemplateColumns: "repeat(8, 1fr)",
              }}
          >
            {renderDaysOfWeek()}
          </div>
          <div
            style={{
              display: "grid",
              gridRow: "2 / -1",
              gridColumn: "1 / 2",
              gridTemplateRows: "repeat(24, 1fr)",
            }}
          >
            {renderHours()}
          </div>
          <div
            style={{
              display: "grid",
              gridRow: "2 / 25",
              gridColumn: "2 / 9",
              gridTemplateRows: "repeat(24, 1fr)",
              gridTemplateColumns: "repeat(7, 1fr)",
            }}
          >
            {renderBox(168)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;