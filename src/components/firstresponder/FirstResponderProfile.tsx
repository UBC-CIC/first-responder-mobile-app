import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { CircularProgress, Fab, makeStyles } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, {
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { Redirect } from "react-router";
import {
  CreateFirstResponderProfileInput,
  CreateFirstResponderProfileMutation,
  UpdateFirstResponderProfileMutation,
} from "../../API";
import {
  createFirstResponderProfile,
  updateFirstResponderProfile,
} from "../../graphql/mutations";
import { FirstResponderProfileType } from "../../types";
import fetchFirstResponderProfile from "../calls/fetchFirstResponderProfile";
import OfflineContext from "../context/OfflineContext";
import usePhoneNumber from "../hooks/usePhoneNumber";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import { DarkModeTextField } from "../ui/DarkModeTextField";
import Layout from "../ui/Layout";

const headerStyle = {
  color: Colors.theme.platinum,
  fontFamily: "Signika Negative",
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1",
    alignItems: "center",
  },
  icon: {
    color: Colors.theme.platinum,
    marginRight: 10,
  },
});

const FirstResponderProfile = (): ReactElement => {
  const phone = usePhoneNumber();
  if (!phone) return <Redirect to="/" />;
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FirstResponderProfileType>({
    phone_number: phone,
    first_name: "",
    last_name: "",
    occupation: "",
  });

  useEffect(() => {
    const f = async () => {
      let phone_number: string;
      try {
        const user = await Auth.currentAuthenticatedUser();
        phone_number = user.attributes.phone_number;
      } catch (e) {
        phone_number = phone || "";
      }
      try {
        const profile = await fetchFirstResponderProfile({
          phone_number,
        });
        if (profile) {
          setForm({ ...profile, phone_number });
        } else {
          setForm({ ...form, phone_number });
        }
      } catch (e) {
        console.log("e");
        console.log(phone);

        setForm({
          phone_number,
          first_name: "",
          last_name: "",
          occupation: "",
        });
      }
    };
    if (navigator.onLine && !offline) {
      f();
    }
  }, []);
  const { offline } = useContext(OfflineContext);

  const createProfile = async (options: CreateFirstResponderProfileInput) => {
    const response = (await API.graphql({
      ...graphqlOperation(createFirstResponderProfile, { input: options }),
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<CreateFirstResponderProfileMutation>;
    if (response.errors) {
      console.log(response.errors);
    }
  };

  const updateProfile = async (options: CreateFirstResponderProfileInput) => {
    try {
      const response = (await API.graphql({
        ...graphqlOperation(updateFirstResponderProfile, { input: options }),
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<UpdateFirstResponderProfileMutation>;
      console.log(response);
    } catch (response) {
      console.error(response);

      if (
        response.errors[0].errorType
        === "DynamoDB:ConditionalCheckFailedException"
      ) {
        handleCreateProfile();
      }
    }
  };

  const handleCreateProfile = async () => {
    if (!form.phone_number) {
      console.error("No PhoneNumber Provided for UpdateProfile");
      return;
    }
    if (form.phone_number) { createProfile(form); }
  };

  const handleUpdateProfile = async () => {
    if (!form.phone_number) {
      console.error("No PhoneNumber Provided for UpdateProfile");
      return;
    }
    setLoading(true);
    await updateProfile(form);
    // Artificially loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const renderTextField = (field: keyof FirstResponderProfileType, label?: string) => (
    <DarkModeTextField
      label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.currentTarget.value });
      }}
      disabled={offline || !navigator.onLine}
      value={form[field]}
      required
    />
  );

  return (
    <Layout title="First Responder Profile" parent="/firstresponder" flexColumn>
      <div className={classes.root}>
        <h3 style={headerStyle}>
          Your Phone Number:
          {" "}
          {form.phone_number}
        </h3>

        {renderTextField("first_name", "First Name")}
        {renderTextField("last_name", "Last Name")}
        {renderTextField("occupation", "Occupation")}
      </div>
      <Fab
        variant="extended"
        className={`${globalClasses.button} ${globalClasses.coral}`}
        onClick={() => handleUpdateProfile()}
        disabled={offline || loading}
      >
        {loading ? (
          <CircularProgress className={classes.icon} />
        ) : (
          <Save className={classes.icon} />
        )}
        Update Profile
      </Fab>
    </Layout>
  );
};

export default FirstResponderProfile;
