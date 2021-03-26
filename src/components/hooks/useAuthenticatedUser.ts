import Auth from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import { CognitoUser } from "../../types";
import config from "../../aws-exports";
import passwordless from "../../passwordless-aws-exports";

const useAuthenticatedUser = () => {
  const [user, setUser] = useState<CognitoUser | undefined>();
  useEffect(() => {
    const f = async () => {
      const u = await Auth.currentAuthenticatedUser();
      setUser(u);
    };
    f();
  }, []);
  if (user?.pool.userPoolId === config.aws_user_pools_id) {
    return [user, "physician"] as [CognitoUser, string];
  }
  if (user?.pool.userPoolId === passwordless.userPoolId) {
    return [user, "firstresponder"] as [CognitoUser, string];
  }

  return [user, ""] as [CognitoUser, string];
};

export default useAuthenticatedUser;
