import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Fab, makeStyles } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { API, graphqlOperation } from "aws-amplify";
import {
  default as React,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { DarkModeTextField } from "../ui/DarkModeTextField";
import Layout from "../ui/Layout";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1",
    alignItems: "center",
  },
  button: {
    backgroundColor: `${Colors.theme.coral} !important`,
    color: Colors.theme.platinum,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
});

const FirstResponderProfile = (): ReactElement => {
  const phone = usePhoneNumber();
  const classes = useStyles();
  const [form, setForm] = useState<FirstResponderProfileType>({
    id: phone,
    verified: false,
    FirstName: "",
    LastName: "",
    Occupation: "",
  });

  useEffect(() => {
    const f = async () => {
      const id: string = phone || "";
      try {
        const profile = await fetchFirstResponderProfile({
          id,
        });
        if (profile) {
          setForm({ ...profile, id });
        } else {
          setForm({ ...form, id });
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (navigator.onLine && !offline) {
      f();
    }
  }, []);
  const { offline } = useContext(OfflineContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    const tryString = e.target.value;
    if (tryString.length == 0) {
      setForm({ ...form, id: tryString });
      return;
    }
    if (tryString.length > 10) {
      return;
    }
    if (!tryString.charAt(tryString.length - 1).match(/[0-9]/)) return;

    setForm({ ...form, id: tryString });
  };

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
        response.errors[0].errorType ===
        "DynamoDB:ConditionalCheckFailedException"
      ) {
        handleCreateProfile();
      }
    }
  };

  const handleCreateProfile = async () => {
    if (!form.id) {
      console.error("No PhoneNumber Provided for UpdateProfile");
      return;
    }
    createProfile(form);
  };

  const handleUpdateProfile = async () => {
    if (!form.id) {
      console.error("No PhoneNumber Provided for UpdateProfile");
      return;
    }
    updateProfile(form);
  };

  return (
    <Layout title="First Responder Profile" parent="/firstresponder" flexColumn>
      <div className={classes.root}>
        <DarkModeTextField
          label="Phone Number"
          type="tel"
          onChange={handleChange}
          value={form.id}
          disabled={offline}
        />
        <DarkModeTextField
          label="First Name"
          type="tel"
          onChange={(e) => setForm({ ...form, FirstName: e.target.value })}
          value={form.FirstName}
          disabled={offline}
        />
        <DarkModeTextField
          label="Last Name"
          type="tel"
          onChange={(e) => setForm({ ...form, LastName: e.target.value })}
          value={form.LastName}
          disabled={offline}
        />
        <DarkModeTextField
          label="Occupation"
          type="tel"
          onChange={(e) => setForm({ ...form, Occupation: e.target.value })}
          value={form.Occupation}
          disabled={offline}
        />
      </div>
      <Fab
        variant="extended"
        className={classes.button}
        onClick={() => handleUpdateProfile()}
        disabled={offline}
      >
        <Save className={classes.icon} />
        Update Profile
      </Fab>
    </Layout>
  );
};

export default FirstResponderProfile;
