import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  CircularProgress, Fab, makeStyles, Snackbar,
} from "@material-ui/core";
import { Check, Close, Save } from "@material-ui/icons";
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
import { FR_NAME } from "../../Constants";
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
import SnackBarActions from "../ui/Alert";
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
  icon: {
    color: Colors.theme.platinum,
    marginRight: 10,
  },
  header: {
    color: Colors.theme.platinum,
    fontFamily: "Signika Negative",
  },
  success: {
    backgroundColor: Colors.theme.success,
    color: Colors.theme.platinum,
  },
  failure: {
    backgroundColor: Colors.theme.error,
    color: Colors.theme.platinum,
  },
});

/** Screen for updating profile information. Currently collects super basic info.
 * This schema should be make more concrete in a production-ready app.
 */
const FirstResponderProfile = (): ReactElement => {
  const phone = usePhoneNumber();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
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
        console.error(e);

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
      console.error(response.errors);
      throw response.errors;
    }
  };

  const updateProfile = async (options: CreateFirstResponderProfileInput) => {
    try {
      const response = (await API.graphql({
        ...graphqlOperation(updateFirstResponderProfile, { input: options }),
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<UpdateFirstResponderProfileMutation>;
    } catch (response) {
      console.error(response);

      if (
        response.errors[0].errorType
        === "DynamoDB:ConditionalCheckFailedException"
      ) {
        handleCreateProfile();
      } else {
        throw response;
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
    try {
      await updateProfile(form);
      setLoading(false);
      setSuccess(true);
      setFailure(false);
    } catch (e) {
      setFailure(true);
      setSuccess(false);
    }
  };

  /** Quick TextField Component */
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
    <Layout title={`${FR_NAME.full} Home`} parent="/main" flexColumn>
      <div className={classes.root}>
        <h3 className={classes.header}>
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
      <Snackbar
        open={success}
        onClose={() => setSuccess(false)}
        ContentProps={{ className: classes.success }}
        action={<SnackBarActions icon={<Check fontSize="small" />} />}
        message="Successfully saved profile!"
        autoHideDuration={1000}
      />
      <Snackbar
        open={failure}
        onClose={() => setFailure(false)}
        ContentProps={{ className: classes.failure }}
        action={(
          <SnackBarActions
            handleClose={() => setFailure(false)}
            icon={<Close fontSize="small" />}
          />
        )}
        message="Failed to save your profile, please try again"
        autoHideDuration={3000}
      />
    </Layout>
  );
};

export default FirstResponderProfile;
