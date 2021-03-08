import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  Fab,
  makeStyles,
  Paper,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { ReactElement, useEffect, useState } from "react";
import {
  CreatePhysicianProfileInput,
  CreatePhysicianProfileMutation,
  UpdatePhysicianProfileMutation,
} from "../../API";
import {
  createPhysicianProfile,
  updatePhysicianProfile,
} from "../../graphql/mutations";
import "../../styles/physician/ContactInfo.css";
import { CognitoUser, PhysicianProfileType } from "../../types";
import fetchPhysicianProfile from "../calls/fetchPhysicianProfile";
import Colors from "../styling/Colors";
import { DarkModeTextField } from "../ui/DarkModeTextField";
import Layout from "../ui/Layout";

const useStyles = makeStyles({
  contactInfoForm: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    alignItems: "center",
    flex: "1",
    backgroundColor: Colors.theme.space,
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
    margin: 10,
  },
});

const ContactInfo = (): ReactElement => {
  const [form, setForm] = useState<PhysicianProfileType>({
    id: "",
    FirstName: "",
    LastName: "",
    Organization: "",
    Occupation: "",
  });

  const classes = useStyles();

  /** Fetch Profile Info */
  useEffect(() => {
    const f = async () => {
      try {
        const u: CognitoUser = await Auth.currentAuthenticatedUser();
        const id = u.attributes.sub;

        const profile = await fetchPhysicianProfile({ id });
        if (profile) {
          setForm({ ...profile, id });
        } else {
          setForm({ ...form, id });
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, []);

  const createProfile = async (options: CreatePhysicianProfileInput) => {
    const response = (await API.graphql({
      ...graphqlOperation(createPhysicianProfile, { input: options }),
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<CreatePhysicianProfileMutation>;
    if (response.errors) {
      console.log(response.errors);
    }
  };

  const updateProfile = async (options: CreatePhysicianProfileInput) => {
    try {
      const response = (await API.graphql({
        ...graphqlOperation(updatePhysicianProfile, { input: options }),
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdatePhysicianProfileMutation>;
      console.log(response);
    } catch (response) {
      console.warn("UpdateProfile failed, creating profile instead");

      if (
        response.errors[0].errorType ===
        "DynamoDB:ConditionalCheckFailedException"
      ) {
        handleCreateProfile();
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (!form.id) {
      console.error("No ID Provided for UpdateProfile");
      return;
    }
    updateProfile(form);
  };

  const handleCreateProfile = async () => {
    if (!form.id) {
      console.error("No ID Provided for UpdateProfile");
      return;
    }
    createProfile(form);
  };

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
        <div className="ffc">
          <div className="form-name">
            <DarkModeTextField
              label="First Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, FirstName: e.currentTarget.value });
              }}
              value={form.FirstName}
              required
            />
            <DarkModeTextField
              value={form.LastName}
              label="Last Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, LastName: e.currentTarget.value });
              }}
              required
            />
          </div>
          <div className="form-name">
            <DarkModeTextField
              value={form.Organization}
              label="Organization"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, Organization: e.currentTarget.value });
              }}
            />
            <DarkModeTextField
              value={form.Occupation}
              label="Occupation"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, Occupation: e.currentTarget.value });
              }}
            />
          </div>
        </div>
        <div className="ffc" style={{ flex: "0.3" }}>
          <Fab type="submit" variant="extended" className={classes.button}>
            <SaveIcon className={classes.icon} />
            Save Profile
          </Fab>
        </div>
      </Paper>
    </Layout>
  );
};

export default ContactInfo;
