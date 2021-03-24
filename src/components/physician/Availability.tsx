import { ReactElement, useState } from "react";
import Layout from "../ui/Layout";
import Schedule from "./Schedule"
import "../../styles/physician/Availability.css";

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
  return (
    <Layout flexColumn title="Availability" parent="/physician/profile">
      {/* root */}
      <div className="ffc" >
        <div className="availability-container">
          {/* TODO might need to implement this myself */}
          <Schedule/>
        </div>
      </div>
    </Layout>
  );
};

export default Availability;
