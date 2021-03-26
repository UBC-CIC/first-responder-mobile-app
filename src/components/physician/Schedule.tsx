import { CircularProgress } from "@material-ui/core";
import _ from "lodash";
import React, { ReactElement, useEffect, useState } from "react";

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
  "12PM",
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

const SHORT_DAYS_OF_WEEK = DAYS_OF_WEEK.map((day) => day.substring(0, 3).toUpperCase());

const FALSE_BOOLEAN_ARRAY:boolean[][] = new Array(7).fill([]);
for (let i = 0; i < FALSE_BOOLEAN_ARRAY.length; i++) {
  FALSE_BOOLEAN_ARRAY[i] = new Array(48).fill(false);
}
type ScheduleProps = {
  onChange?: (schedule:boolean[][]) => void;
  initialSchedule?: boolean[][];
};

const Schedule = ({ initialSchedule, onChange = (arr: boolean[][]) => undefined }: ScheduleProps): ReactElement => {
  const [highlighted, setHighlighted] = useState(_.cloneDeep(FALSE_BOOLEAN_ARRAY));
  const [selected, setSelected] = useState(initialSchedule || _.cloneDeep(FALSE_BOOLEAN_ARRAY));
  const [startIndex, setStartIndex] = useState<number | undefined>();
  const [currIndex, setCurrIndex] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelected(initialSchedule || _.cloneDeep(FALSE_BOOLEAN_ARRAY));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [initialSchedule]);

  const handleTouchStart = (
    index: number,
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    setStartIndex(index);
    setCurrIndex(index);
  };

  const handleMouseStart = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setStartIndex(index);
    setCurrIndex(index);
  };

  const handleMouseMove = (
    endIndex: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    if (typeof startIndex === "undefined") {
      return;
    }
    handleHighlight(startIndex, endIndex);
    setCurrIndex(endIndex);
  };

  const handleMouseEnd = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    resetHighlights();
    event.preventDefault();
    event.stopPropagation();
    if (typeof startIndex === "undefined" || typeof currIndex === "undefined") {
      console.error("Error Selecting Availability, please try again");
      return;
    }
    resetHighlights();
    setHighlighted(_.cloneDeep(FALSE_BOOLEAN_ARRAY));

    handleSelect(startIndex, currIndex);
    setCurrIndex(undefined);
    setStartIndex(undefined);
    onChange(selected);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (typeof startIndex === "undefined") {
      return;
    }
    const { clientX, clientY } = event.changedTouches[0];
    const targetElement = document.elementFromPoint(clientX, clientY);
    const id = targetElement?.getAttribute("id");
    let endIndex: number;
    if (!id) {
      if (!currIndex) {
        console.error("Somethign went wrong!");
        return;
      }
      endIndex = currIndex;
    } else endIndex = Number(id?.split("-")[1]);
    handleHighlight(startIndex, endIndex);
    setCurrIndex(endIndex);
  };

  const handleTouchEnd = (
    index: number,
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    resetHighlights();
    if (typeof startIndex === "undefined") {
      console.error("Error Selecting Availability, please try again");
      return;
    }

    const { clientX, clientY } = event.changedTouches[0];
    const targetElement = document.elementFromPoint(clientX, clientY);
    const id = targetElement?.getAttribute("id");
    let endIndex: number;
    if (!id) {
      if (!currIndex) {
        console.error("Somethign went wrong!");
        return;
      }
      endIndex = currIndex;
    } else endIndex = Number(id?.split("-")[1]);
    setHighlighted(_.cloneDeep(FALSE_BOOLEAN_ARRAY));
    handleSelect(startIndex, endIndex);
    setCurrIndex(undefined);
    setStartIndex(undefined);
    onChange(selected);
  };

  const handleReleaseOffBox = () => {
    if (typeof startIndex === "undefined" || typeof currIndex === "undefined") {
      reset();
      return;
    }
    handleSelect(startIndex, currIndex);
    reset();
  };

  const indexToCoordinates = (index: number) => ({
    x: index % 7,
    y: Math.floor(index / 7) % 48,
  });

  /**
   * toggles all items in selected corner to the value of the initally clicked box.
   * @param start coordinates of start corner of select rectangle
   * @param end coordinates of end corner of select rectangle
   */
  const handleSelect = (firstIndex: number, endIndex: number) => {
    const start = indexToCoordinates(firstIndex);
    const end = indexToCoordinates(endIndex);

    const startXIndex = Math.min(end.x, start.x);
    const endXIndex = Math.max(end.x, start.x);
    const startYIndex = Math.min(end.y, start.y);
    const endYIndex = Math.max(end.y, start.y);

    const toSet = !selected[start.x][start.y];
    for (let i = startXIndex; i <= endXIndex; i++) {
      for (let j = startYIndex; j <= endYIndex; j++) {
        selected[i][j] = toSet;
      }
    }
  };

  /**
   * toggles all items in selected corner to the value of the initally clicked box.
   * @param start coordinates of start corner of select rectangle
   * @param end coordinates of end corner of select rectangle
   */
  const handleHighlight = (firstIndex: number, endIndex: number) => {
    const start = indexToCoordinates(firstIndex);
    const end = indexToCoordinates(endIndex);

    const startXIndex = Math.min(end.x, start.x);
    const endXIndex = Math.max(end.x, start.x);
    const startYIndex = Math.min(end.y, start.y);
    const endYIndex = Math.max(end.y, start.y);

    resetHighlights();
    for (let i = startXIndex; i <= endXIndex; i++) {
      for (let j = startYIndex; j <= endYIndex; j++) {
        highlighted[i][j] = true;
      }
    }
  };

  const resetHighlights = () => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 48; j++) {
        highlighted[i][j] = false;
      }
    }
  };

  const renderBox = (n = 1) => {
    const list = Array(n)
      .fill(0)
      .map((__, i) => {
        const rowNumber = Math.floor(i / 7);
        const topIndex = rowNumber * 14 + (i % 7);
        const botIndex = topIndex + 7;
        const topCoords = indexToCoordinates(topIndex);
        const botCoords = indexToCoordinates(botIndex);
        let topBgColor: string;
        if (highlighted[topCoords.x][topCoords.y]) {
          topBgColor = "red";
        } else if (selected[topCoords.x][topCoords.y]) {
          topBgColor = "green";
        } else topBgColor = "";

        let botBgColor: string;
        if (highlighted[botCoords.x][botCoords.y]) {
          botBgColor = "red";
        } else if (selected[botCoords.x][botCoords.y]) {
          botBgColor = "green";
        } else botBgColor = "";
        return (
          <div key={i} className="box">
            <div
              style={{
                backgroundColor: topBgColor,
              }}
              id={`box-${topIndex}`}
              key={topIndex}
              className="smallbox-1"
              onTouchStart={(e) => handleTouchStart(topIndex, e)}
              onMouseDown={(e) => handleTouchStart(topIndex, e)}
              onMouseUp={(e) => handleMouseEnd(e)}
              onTouchEnd={(e) => handleTouchEnd(topIndex, e)}
              onTouchMove={(e) => handleTouchMove(e)}
              onMouseMove={(e) => handleMouseMove(topIndex, e)}
            />
            <div
              style={{
                backgroundColor: botBgColor,
              }}
              id={`box-${botIndex}`}
              key={botIndex}
              className="smallbox-2"
              onTouchStart={(e) => handleTouchStart(botIndex, e)}
              onTouchEnd={(e) => handleTouchEnd(botIndex, e)}
              onTouchMove={(e) => handleTouchMove(e)}
              onMouseDown={(e) => handleMouseStart(botIndex, e)}
              onMouseUp={(e) => handleMouseEnd(e)}
              onMouseMove={(e) => handleMouseMove(botIndex, e)}
            />
          </div>
        );
      });
    return list;
  };

  const renderHours = () => {
    const list = Array(24)
      .fill(0)
      .map((__, i) => (
        <div
          key={i}
          style={{ color: "white", alignSelf: "center", justifySelf: "center" }}
        >
          {HOURS_OF_DAY[i]}
        </div>
      ));
    return list;
  };

  const reset = () => {
    setHighlighted(_.cloneDeep(FALSE_BOOLEAN_ARRAY));
    setCurrIndex(undefined);
    setStartIndex(undefined);
  };

  const renderDaysOfWeek = () => {
    const list = SHORT_DAYS_OF_WEEK.map((day, index) => (
      <div
        style={{ textAlign: "center", color: "#fff", alignSelf: "center" }}
        key={index}
      >
        {day}
      </div>
    ));
    return list;
  };

  if (loading) {
    return (
      <div className="ffc align justify">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="ffc">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="grid">
          <div
            style={{
              display: "grid",
              gridRow: "1 / 2",
              gridColumn: "1 / 9",
              gridTemplateColumns: "repeat(8, 1fr)",
            }}
            onMouseUp={() => handleReleaseOffBox()}
          >
            <div />
            {renderDaysOfWeek()}
          </div>
          <div
            style={{
              display: "grid",
              gridRow: "2 / -1",
              gridColumn: "1 / 2",
              gridTemplateRows: "repeat(24, 1fr)",
            }}
            onMouseUp={() => handleReleaseOffBox()}
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
            onMouseUp={() => handleReleaseOffBox()}
          >
            {renderBox(168)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
