import { ReactElement, useState } from "react";
import ScheduleSelector from "react-schedule-selector";
import Layout from "../ui/Layout";
import "../../styles/physician/Availability.css";

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
  return (
    <Layout title="Availability" parent="/physician/profile">
      {/* root */}
      <div className="ffc">
        <div className="availability-container">
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
              //   TODO call to backend
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Availability;
