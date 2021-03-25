import { ReactElement, useEffect, useState } from "react";
import Layout from "../ui/Layout";
import Schedule from "./Schedule"
import "../../styles/physician/Availability.css";
import updateSpecialistAvailability from "../calls/updateSpecialistAvailability";
import { CognitoUser, FormattedTimeBlock, FullAvailabilityType } from "../../types";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import fetchSpecialistAvailability from "../calls/fetchSpecialistAvailability";
import { CircularProgress } from "@material-ui/core";

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
  onUnmount?: (success:boolean) => void; 
}


const Availability = ({onUnmount = () => undefined}:AvailabilityPropsType): ReactElement => {
  const [user] = useAuthenticatedUser();
  const [formattedAvailability, setFormattedAvailability] = useState<FullAvailabilityType | undefined>();
  const [formattedSchedule, setFormattedSchedule] = useState<FormattedTimeBlock[] | undefined>();
  const [fetchedAvailability, setFetchedAvailability] = useState<FullAvailabilityType | undefined>();
  const [initialSchedule, setInitialSchedule] = useState<boolean[][]>();
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    return () => {
      const f = async () => {
        if (formattedAvailability){
          const res = await updateSpecialistAvailability({
            input: {
              availability: JSON.stringify(formattedAvailability),
              phone_number: phoneNumber
            },
          });

          onUnmount(!!res.data);
        }
      }
      f();
    }
  }, [formattedAvailability, phoneNumber])
  useEffect(() => {
    const userPhone = user?.attributes.phone_number;
    setPhoneNumber(userPhone);
    const f = async () => {
      const availability = await(
        await fetchSpecialistAvailability({ phone_number: userPhone })
      ).data?.getSpecialistProfile?.availability;
      if (!availability) return;
      console.log(availability);
      setFetchedAvailability(availability);
    }
    if (!fetchedAvailability)
      f();
  }, [user]);

  useEffect(() => {
    if (fetchedAvailability) {
      const init = convertAvailabilityToBoolean(fetchedAvailability);
      console.log(init);
      setInitialSchedule(init);
    }

  }, [fetchedAvailability])
  
  const groupBy = function (arr: FormattedTimeBlock[], key:keyof FormattedTimeBlock) {
    return arr.reduce(function (retObj:any, x) {
      (retObj[x[key]] = retObj[x[key]] || []).push(x);
      return retObj;
    }, {});
  };

  const convertAvailabilityToBoolean = (formatted: FullAvailabilityType) => {
    const {schedules} = formatted;
    const grouped:GroupedTimeBlocks = groupBy(schedules, "day_of_week")
    console.log(grouped);
    const simpleBooleanArray:boolean[][] = [];
    for (const timeBlockArray of Object.values(grouped)) {
      let weekdayBoolArr:boolean[] = [];
      timeBlockArray.forEach(
        (timeBlock) =>
          (weekdayBoolArr = weekdayBoolArr.concat(
            convertTimeBlockToBooleanArray(timeBlock)
          ))
      );
      simpleBooleanArray.push(weekdayBoolArr);
    }
    return simpleBooleanArray;
  }

  const convertTimeBlockToBooleanArray = (timeBlock:FormattedTimeBlock):boolean[] => {
    const numberOfEntries = (timeBlock.end_seconds_since_midnight - timeBlock.start_seconds_since_midnight) / 1800;
    const toFill = timeBlock.availability_type === "AVAILABLE";
    return Array(numberOfEntries).fill(toFill);
  }

  const formatDayOfWeek = (dayOfWeek: boolean[], index: number) => {
    let currBool = dayOfWeek[0];
    // Gets chunks of dayOfWeek that are of the same value
    const splitIndices:number[] = [];
    splitIndices.push(0);
    dayOfWeek.forEach((bool, index) => {
      if (bool !== currBool){
        currBool = !currBool;
        splitIndices.push(index);
      }
    });
    splitIndices.push(dayOfWeek.length);

    const chunkArray: FormattedTimeBlock[] = [];
    let currSecondsSinceMidnight = 0;

    for (let i = 1; i < splitIndices.length; i++) {
      const calculatedSecondsOfTimeBlock = 1800 * (splitIndices[i] - splitIndices[i-1]);
      const formattedTime: FormattedTimeBlock = {
        start_seconds_since_midnight: currSecondsSinceMidnight,
        end_seconds_since_midnight: calculatedSecondsOfTimeBlock + currSecondsSinceMidnight,
        day_of_week: index,
        timezone: "America/Vancouver",
        availability_type: dayOfWeek[splitIndices[i-1]] ? "AVAILABLE" : "NOT_AVAILABLE"
      }
      chunkArray.push(formattedTime);
      currSecondsSinceMidnight += calculatedSecondsOfTimeBlock;
    }

    return chunkArray;
  }

  const handleChangeSchedule = (schedule:boolean[][] ) => {
    const formattedSchedule: FormattedTimeBlock[] = [];
    for (let i = 0; i < schedule.length; i++) {
      formattedSchedule.push(...formatDayOfWeek(schedule[i], i));
    }
    console.log(formattedSchedule);
    setFormattedSchedule(formattedSchedule);
    const fullAvailability: FullAvailabilityType = {
      overrides: [],
      schedules: formattedSchedule,
    }
    console.log(fullAvailability);
    
    setFormattedAvailability(fullAvailability);
    
  }

  return (
    <Layout flexColumn title="Availability" parent="/physician/profile">
      {/* root */}
      <div className="ffc" >
        <div className="availability-container">
          <Schedule initialSchedule={initialSchedule} onChange={handleChangeSchedule}/>
        </div>
      </div>
    </Layout>
  );
};

export default Availability;
