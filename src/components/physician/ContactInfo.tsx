import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Fab, makeStyles, Paper } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { CSSProperties } from "@material-ui/styles";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { ReactElement, useEffect, useState } from "react";
import {
  CreatePhysicianProfileInput,
  CreatePhysicianProfileMutation,
  UpdatePhysicianProfileMutation,
} from "../../API";
import "../../styles/physician/ContactInfo.css";
import { CognitoUser, PhysicianProfileType, UserProfileType } from "../../types";
import { createUserProfile, CreateUserProfileInput, CreateUserProfileMutation, updateUserProfile, UpdateUserProfileMutation } from "../../UserProfileAPI";
import fetchPhysicianProfile from "../calls/fetchPhysicianProfile";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
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
});
const headerStyle:CSSProperties = {
  color: Colors.theme.platinum,
  fontFamily: "Signika Negative",
  textAlign: "center"
};

const ContactInfo = (): ReactElement => {
  const [form, setForm] = useState<UserProfileType>({
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
        console.log(u.attributes);
        


        console.log(email);
        
        const profile = await fetchPhysicianProfile({ email });
        console.log(profile);
        
        if (profile) {
          setForm({ ...profile, email, phone_number });
        } else {
          setForm({ ...form, email, phone_number });
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, []);

  const createProfile = async (options: UserProfileType) => {
    const response = (await API.graphql({
      ...graphqlOperation(createUserProfile, { input: options }),
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<CreateUserProfileMutation>;
    console.log(response);
    
    if (response.errors) {
      console.log(response.errors);
    }
  };

  const updateProfile = async (options: UserProfileType) => {
    try {
      const response = (await API.graphql({
        ...graphqlOperation(updateUserProfile, { input: options }),
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<UpdateUserProfileMutation>;
      console.log(response);
    } catch (response) {
      console.log(response);
      if (
        response.errors[0].errorType ===
        "DynamoDB:ConditionalCheckFailedException"
      ) {
        console.warn("UpdateProfile failed, creating profile instead");
        handleCreateProfile();
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (!form.email) {
      console.error("No email Provided for UpdateProfile");
      return;
    }
    updateProfile(form);
  };

  const handleCreateProfile = async () => {
    if (!form.email) {
      console.error("No ID Provided for UpdateProfile");
      return;
    }
    createProfile(form);
  };


  const renderTextField = (field: keyof UserProfileType, label?: string) => {
    return <DarkModeTextField
      label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.currentTarget.value });
      }}
      value={form[field]}
      required
    />
  }

  /** TODO style this more, add more fields */
  return (
    <Layout className="ffc" title="Contact Info" parent="/physician/profile">
      <Paper
        component="form"
        className={classes.contactInfoForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProfile();
        }}
      >
        <div className="ffc align">
          <h3 style={headerStyle}>Phone Number: {form.phone_number}</h3>
          <h3 style={headerStyle}>Email: {form.email}</h3>
          <div className="form-name">
            {renderTextField("first_name", "First Name")}
            {renderTextField("last_name", "Last Name")}
          </div>
          {renderTextField("organization", "Organization")}
          {renderTextField("user_role", "Occupation")}
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
        </div>
      </Paper>
    </Layout>
  );
};

export default ContactInfo;
