import { Fab, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { ReactElement, useEffect, useState } from "react";
import "../../styles/physician/Availability.css";
import {
  FormattedTimeBlock,
  FullAvailabilityType,
} from "../../types";
import fetchSpecialistAvailability from "../calls/fetchSpecialistAvailability";
import updateSpecialistAvailability from "../calls/updateSpecialistAvailability";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

type GroupedTimeBlocks = {
  0: FormattedTimeBlock[];
  1: FormattedTimeBlock[];
  2: FormattedTimeBlock[];
  3: FormattedTimeBlock[];
  4: FormattedTimeBlock[];
  5: FormattedTimeBlock[];
  6: FormattedTimeBlock[];
};

type AvailabilityPropsType = {
  onUnmount?: (success: boolean) => void;
};

const useStyles = makeStyles({
  icon: {
    marginRight: 10,
  },
});
const Overrides = ({
  onUnmount = () => undefined,
}: AvailabilityPropsType): ReactElement => {
  const [user] = useAuthenticatedUser();
  const [formattedAvailability, setFormattedAvailability] = useState<
    FullAvailabilityType | undefined
  >();
  const [formattedSchedule, setFormattedSchedule] = useState<
    FormattedTimeBlock[] | undefined
  >();
  const [fetchedAvailability, setFetchedAvailability] = useState<
    FullAvailabilityType | undefined
  >();
  const [initialSchedule, setInitialSchedule] = useState<boolean[][]>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  useEffect(() => () => {
    const f = async () => {
      if (formattedAvailability) {
        const res = await updateSpecialistAvailability({
          input: {
            availability: JSON.stringify(formattedAvailability),
            phone_number: phoneNumber,
          },
        });

        onUnmount(!!res.data);
      }
    };
    f();
  }, [formattedAvailability, phoneNumber]);
  useEffect(() => {
    const userPhone = user?.attributes.phone_number;
    setPhoneNumber(userPhone);
    const f = async () => {
      const availability = await (
        await fetchSpecialistAvailability({ phone_number: userPhone })
      ).data?.getSpecialistProfile?.availability;
      if (!availability) return;
      setFetchedAvailability(availability);
    };
    if (!fetchedAvailability) f();
  }, [user]);

  useEffect(() => {
    if (fetchedAvailability) {
      const init = convertAvailabilityToBoolean(fetchedAvailability);
      setInitialSchedule(init);
    }
  }, [fetchedAvailability]);

  const groupBy = function (
    arr: FormattedTimeBlock[],
    key: keyof FormattedTimeBlock,
  ) {
    return arr.reduce((accumulator: any, x) => {
      const retObj = accumulator;
      (retObj[x[key]] = retObj[x[key]] || []).push(x);
      return retObj;
    }, {});
  };

  const convertAvailabilityToBoolean = (formatted: FullAvailabilityType) => {
    const { schedules } = formatted;
    const grouped: GroupedTimeBlocks = groupBy(schedules, "day_of_week");
    const simpleBooleanArray: boolean[][] = [];
    Object.values(grouped).forEach((timeBlockArray) => {
      let weekdayBoolArr: boolean[] = [];
      timeBlockArray.forEach(
        (timeBlock) => {
          (weekdayBoolArr = weekdayBoolArr.concat(
            convertTimeBlockToBooleanArray(timeBlock),
          ));
        },
      );
      simpleBooleanArray.push(weekdayBoolArr);
    });
    return simpleBooleanArray;
  };

  const convertTimeBlockToBooleanArray = (
    timeBlock: FormattedTimeBlock,
  ): boolean[] => {
    const numberOfEntries = (timeBlock.end_seconds_since_midnight
        - timeBlock.start_seconds_since_midnight)
      / 1800;
    const toFill = timeBlock.availability_type === "AVAILABLE";
    return Array(numberOfEntries).fill(toFill);
  };

  const formatDayOfWeek = (dayOfWeek: boolean[], index: number) => {
    let currBool = dayOfWeek[0];
    // Gets chunks of dayOfWeek that are of the same value
    const splitIndices: number[] = [];
    splitIndices.push(0);
    dayOfWeek.forEach((bool, i) => {
      if (bool !== currBool) {
        currBool = !currBool;
        splitIndices.push(i);
      }
    });
    splitIndices.push(dayOfWeek.length);

    const chunkArray: FormattedTimeBlock[] = [];
    let currSecondsSinceMidnight = 0;

    for (let i = 1; i < splitIndices.length; i += 1) {
      const calculatedSecondsOfTimeBlock = 1800 * (splitIndices[i] - splitIndices[i - 1]);
      const formattedTime: FormattedTimeBlock = {
        start_seconds_since_midnight: currSecondsSinceMidnight,
        end_seconds_since_midnight:
          calculatedSecondsOfTimeBlock + currSecondsSinceMidnight,
        day_of_week: index,
        timezone: "America/Vancouver",
        availability_type: dayOfWeek[splitIndices[i - 1]]
          ? "AVAILABLE"
          : "NOT_AVAILABLE",
      };
      chunkArray.push(formattedTime);
      currSecondsSinceMidnight += calculatedSecondsOfTimeBlock;
    }

    return chunkArray;
  };

  const handleChangeSchedule = (schedule: boolean[][]) => {
    const returnFormattedSchedule: FormattedTimeBlock[] = [];
    for (let i = 0; i < schedule.length; i += 1) {
      returnFormattedSchedule.push(...formatDayOfWeek(schedule[i], i));
    }
    setFormattedSchedule(returnFormattedSchedule);
    const fullAvailability: FullAvailabilityType = {
      overrides: [],
      schedules: returnFormattedSchedule,
    };

    setFormattedAvailability(fullAvailability);
  };

  return (
    <Layout flexColumn title="Book Time On / Off" parent="/physician/profile">
      {/* root */}
      <div className="ffc align">
        <div style={{ width: "60%" }} className="flex column align">
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
          >
            <Add className={classes.icon} />
            Add Event
          </Fab>
        </div>
      </div>
    </Layout>
  );
};

export default Overrides;
