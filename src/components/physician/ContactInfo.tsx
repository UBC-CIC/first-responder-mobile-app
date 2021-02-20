import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { ReactElement, useEffect, useState } from "react";
import {
  CreatePhysicianProfileInput,
  CreatePhysicianProfileMutation,
  GetPhysicianProfileQuery,
  GetPhysicianProfileQueryVariables,
  UpdatePhysicianProfileMutation,
} from "../../API";
import {
  createPhysicianProfile,
  updatePhysicianProfile,
} from "../../graphql/mutations";
import { getPhysicianProfile } from "../../graphql/queries";
import "../../styles/physician/ContactInfo.css";
import { CognitoUser } from "../../styles/types";
import Colors from "../styling/Colors";
import Layout from "../styling/Layout";

const useStyles = makeStyles({
  label: {},
});

const ContactInfo = (): ReactElement => {
  const [form, setForm] = useState<CreatePhysicianProfileInput>({
    id: "",
    FirstName: "",
    LastName: "",
    Organization: "",
  });

  const classes = useStyles();

  /** Fetch Profile Info */
  useEffect(() => {
    const f = async () => {
      try {
        const u: CognitoUser = await Auth.currentAuthenticatedUser();
        console.log(u);
        const id = u.attributes.sub;

        const profile = await getProfile({ id });
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

  const getProfile = async (options: GetPhysicianProfileQueryVariables) => {
    const response = (await API.graphql({
      ...graphqlOperation(getPhysicianProfile, options),
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<GetPhysicianProfileQuery>;
    if (response.errors) {
      console.log(response.errors);
    } else {
      const profile = response.data?.getPhysicianProfile;
      return {
        id: profile?.id,
        FirstName: profile?.FirstName,
        LastName: profile?.LastName,
        Organization: profile?.Organization,
      } as CreatePhysicianProfileInput;
    }
  };

  const createProfile = async (options: CreatePhysicianProfileInput) => {
    const response = (await API.graphql(
      graphqlOperation(createPhysicianProfile, { input: options })
    )) as GraphQLResult<CreatePhysicianProfileMutation>;
    if (response.errors) {
      console.log(response.errors);
    }
  };

  const updateProfile = async (options: CreatePhysicianProfileInput) => {
    try {
      const response = (await API.graphql(
        graphqlOperation(updatePhysicianProfile, { input: options })
      )) as GraphQLResult<UpdatePhysicianProfileMutation>;
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

  return (
    <Layout className="ffc" title="Contact Info">
      <div className="ffc">
        <form
          className="contact-info-form"
          style={{
            backgroundColor: Colors.theme.platinum,
          }}
        >
          <TextField
            className={classes.label}
            label="First Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, FirstName: e.currentTarget.value });
            }}
            value={form.FirstName}
            required
          />
          <TextField
            className={classes.label}
            value={form.LastName}
            label="Last Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, LastName: e.currentTarget.value });
            }}
            required
          />
          <TextField
            className={classes.label}
            value={form.Organization}
            label="Organization"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, Organization: e.currentTarget.value });
            }}
          />
        </form>
      </div>
      <div className="ffc">
        <Button
          onClick={() => {
            console.log(form);
            handleUpdateProfile();
          }}
        >
          Save Profile
        </Button>
      </div>
    </Layout>
  );
};

export default ContactInfo;
