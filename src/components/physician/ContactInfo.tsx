import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  Fab, makeStyles, Paper, Snackbar, withStyles,
} from "@material-ui/core";
import { Error } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import { CSSProperties } from "@material-ui/styles";
import { Check } from "amazon-chime-sdk-component-library-react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { ReactElement, useEffect, useState } from "react";
import { CreateSpecialistProfileMutation, UpdateSpecialistProfileMutation } from "../../API";
import "../../styles/physician/ContactInfo.css";
import { CognitoUser, SpecialistProfileType } from "../../types";
import fetchPhysicianProfile from "../calls/fetchPhysicianProfile";
import { createSpecialistProfile, updateSpecialistProfile } from "../calls/graphql/specialistProfile";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import SnackBarActions from "../ui/Alert";
import { DarkModeTextField } from "../ui/DarkModeTextField";
import Layout from "../ui/Layout";

const useStyles = makeStyles({
  contactInfoForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1",
    backgroundColor: Colors.theme.space,
  },
  icon: {
    margin: 10,
  },
  success: {
    backgroundColor: Colors.theme.success,
    color: Colors.theme.platinum,
  },
  failure: {
    backgroundColor: Colors.theme.error,
    color: Colors.theme.platinum,
  },
  header: {
    color: Colors.theme.platinum,
    fontFamily: "Signika Negative",
    textAlign: "center",
  },
});

const ContactInfo = (): ReactElement => {
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [form, setForm] = useState<SpecialistProfileType>({
    phone_number: phone,
    email: "",
    first_name: "",
    last_name: "",
    organization: "",
    user_role: "",
  });

  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  /** Fetch Profile Info */
  useEffect(() => {
    const f = async () => {
      try {
        const u: CognitoUser = await Auth.currentAuthenticatedUser();
        const { email, phone_number } = u.attributes;
        setPhone(phone_number);
        const profile = await fetchPhysicianProfile({ phone_number });

        if (profile) {
          setForm({ ...profile, phone_number });
        } else {
          setForm({ ...form, phone_number });
        }
      } catch (e) {
        console.error(e);
      }
    };
    f();
  }, []);

  const createProfile = async (options: SpecialistProfileType) => {
    const response = (await API.graphql({
      ...graphqlOperation(createSpecialistProfile, { input: options }),
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<CreateSpecialistProfileMutation>;
    if (response.errors) {
      console.error(response.errors);
      setFailure(true);
    } else {
      setSuccess(true);
    }
  };

  const updateProfile = async (options: SpecialistProfileType) => {
    try {
      const response = (await API.graphql({
        ...graphqlOperation(updateSpecialistProfile, { input: options }),
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<UpdateSpecialistProfileMutation>;
      if (response.data) {
        setSuccess(true);
      }
    } catch (response) {
      console.error(response);
      if (
        response.errors[0].errorType
        === "DynamoDB:ConditionalCheckFailedException"
      ) {
        console.warn("UpdateProfile failed, creating profile instead");
        handleCreateProfile();
      } else {
        setFailure(true);
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (!form.phone_number) {
      console.error("No phone Provided for UpdateProfile");
      return;
    }
    updateProfile(form);
  };

  const handleCreateProfile = async () => {
    if (!form.phone_number) {
      console.error("No phone Provided for UpdateProfile");
      return;
    }
    createProfile(form);
  };

  const renderTextField = (field: keyof SpecialistProfileType, label?: string, overrideStyles?:CSSProperties) => {
    (
      <DarkModeTextField
        label={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({ ...form, [field]: e.currentTarget.value });
        }}
        value={form[field]}
        required
      />
    );
    if (overrideStyles) {
      const StyledTextField = withStyles({ root: overrideStyles })(DarkModeTextField);
      return (
        <StyledTextField
          label={label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [field]: e.currentTarget.value });
          }}
          value={form[field]}
          required
        />
      );
    }
    return (
      <DarkModeTextField
        label={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({ ...form, [field]: e.currentTarget.value });
        }}
        value={form[field]}
        required
      />
    );
  };

  /** TODO style this more, add more fields */
  return (
    <Layout className="ffc" title="Contact Info" parent="/main/profile">
      <Paper
        component="form"
        className={classes.contactInfoForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProfile();
        }}
      >
        <div className="ffc align">
          <h3 className={classes.header}>
            Phone Number:
            {" "}
            {form.phone_number}
          </h3>
          <div className="form-name">
            {renderTextField("first_name", "First Name")}
            {renderTextField("last_name", "Last Name")}
          </div>
          {renderTextField("organization", "Organization")}
          {renderTextField("user_role", "Occupation")}
          {renderTextField("email", "Email", { width: "90%" })}
        </div>
        <div className="ffc" style={{ flex: "0.3" }}>
          <Fab
            type="submit"
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
          >
            <SaveIcon className={classes.icon} />
            Save Profile
          </Fab>

          <Snackbar
            open={success}
            onClose={() => setSuccess(false)}
            ContentProps={{ className: classes.success }}
            action={<SnackBarActions icon={<Check fontSize="large" />} />}
            message="Successfully saved profile!"
            autoHideDuration={1000}
          />

          <Snackbar
            open={failure}
            onClose={() => setFailure(false)}
            ContentProps={{ className: classes.failure }}
            action={<SnackBarActions icon={<Error fontSize="large" />} />}
            message="Failed to save your availability, please try again"
            autoHideDuration={3000}
          />
        </div>
      </Paper>
    </Layout>
  );
};

export default ContactInfo;
