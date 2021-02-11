import { createRef, ReactElement, ReactNode, useEffect, useState } from "react";
import Layout from "../styling/Layout";
import ScheduleSelector from "react-schedule-selector";
import { Button } from "@material-ui/core";

const DAYS_OF_WEEK: DayIndex[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DayMap = {
  Monday: number[];
  Tuesday: number[];
  Wednesday: number[];
  Thursday: number[];
  Friday: number[];
  Saturday: number[];
  Sunday: number[];
};

type DayIndex = keyof DayMap;

const Availability = (): ReactElement => {
  const [schedule, setSchedule] = useState([] as Date[]);
  const [selectedDays, setSelectedDays] = useState({} as DayMap);
  return (
    <Layout>
      {/* root */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "90%", height: "100%", marginTop: 10 }}>
          {/* TODO might need to implement this myself */}
          <ScheduleSelector
            selection={schedule}
            numDays={7}
            minTime={0}
            maxTime={24}
            hourlyChunks={1}
            dateFormat="dd"
            startDate={"Sunday, February 14, 2021 12:00:00 AM"}
            // Start on sunday. Specifically Feb 14th, 2021 at 12AM
            onChange={(data: Date[]) => {
              const days: DayMap = {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: [],
              };
              data.forEach((date: Date) => {
                days[DAYS_OF_WEEK[date.getDay()] as DayIndex].push(
                  date.getHours()
                );
              });
              console.log(days);

              setSchedule(data);
              //   TODO call to backend, convert Date[] to days of week
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Availability;
