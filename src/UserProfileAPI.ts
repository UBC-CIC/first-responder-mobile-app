/* tslint:disable */
/* eslint-disable */

import { ModelAttributeTypes, ModelStringInput } from "./API";

export type CreateUserProfileInput = {
  email: string,
  user_status?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string | null,
  user_role?: string | null,
  organization?: string | null,
  profile_picture?: string | null,
  notes?: string | null,
  is_paged?: boolean | null,
  availability?: string | null,
  created_date_time?: string | null,
  updated_date_time?: string | null,
};

export type ModelUserProfileConditionInput = {
  email?: ModelStringInput | null,
  user_status?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  user_role?: ModelStringInput | null,
  organization?: ModelStringInput | null,
  profile_picture?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  is_paged?: ModelBooleanInput | null,
  availability?: ModelStringInput | null,
  created_date_time?: ModelStringInput | null,
  updated_date_time?: ModelStringInput | null,
  and?: Array< ModelUserProfileConditionInput | null > | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  not?: ModelUserProfileConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UserProfile = {
  __typename: "UserProfile",
  email?: string,
  user_status?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string | null,
  user_role?: string | null,
  organization?: string | null,
  profile_picture?: string | null,
  notes?: string | null,
  is_paged?: boolean | null,
  availability?: string | null,
  created_date_time?: string | null,
  updated_date_time?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateUserProfileInput = {
  email?: string | null,
  user_status?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string | null,
  user_role?: string | null,
  organization?: string | null,
  profile_picture?: string | null,
  notes?: string | null,
  is_paged?: boolean | null,
  availability?: string | null,
  created_date_time?: string | null,
  updated_date_time?: string | null,
};

export type DeleteUserProfileInput = {
  email?: string | null,
};

export type ModelUserProfileFilterInput = {
  email?: ModelStringInput | null,
  user_status?: ModelStringInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  user_role?: ModelStringInput | null,
  organization?: ModelStringInput | null,
  profile_picture?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  is_paged?: ModelBooleanInput | null,
  availability?: ModelStringInput | null,
  created_date_time?: ModelStringInput | null,
  updated_date_time?: ModelStringInput | null,
  and?: Array< ModelUserProfileFilterInput | null > | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  not?: ModelUserProfileFilterInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items?:  Array<UserProfile | null > | null,
  nextToken?: string | null,
};

export type CreateUserProfileMutationVariables = {
  input?: CreateUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    email: string,
    user_status?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    phone_number?: string | null,
    user_role?: string | null,
    organization?: string | null,
    profile_picture?: string | null,
    notes?: string | null,
    is_paged?: boolean | null,
    availability?: string | null,
    created_date_time?: string | null,
    updated_date_time?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  input?: UpdateUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    email: string,
    user_status?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    phone_number?: string | null,
    user_role?: string | null,
    organization?: string | null,
    profile_picture?: string | null,
    notes?: string | null,
    is_paged?: boolean | null,
    availability?: string | null,
    created_date_time?: string | null,
    updated_date_time?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  input?: DeleteUserProfileInput,
  condition?: ModelUserProfileConditionInput | null,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    email: string,
    user_status?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    phone_number?: string | null,
    user_role?: string | null,
    organization?: string | null,
    profile_picture?: string | null,
    notes?: string | null,
    is_paged?: boolean | null,
    availability?: string | null,
    created_date_time?: string | null,
    updated_date_time?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserProfileQueryVariables = {
  email?: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    email: string,
    user_status?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    phone_number?: string | null,
    user_role?: string | null,
    organization?: string | null,
    profile_picture?: string | null,
    notes?: string | null,
    is_paged?: boolean | null,
    availability?: string | null,
    created_date_time?: string | null,
    updated_date_time?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items?:  Array< {
      __typename: "UserProfile",
      email: string,
      user_status?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number?: string | null,
      user_role?: string | null,
      organization?: string | null,
      profile_picture?: string | null,
      notes?: string | null,
      is_paged?: boolean | null,
      availability?: string | null,
      created_date_time?: string | null,
      updated_date_time?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    email: string,
    user_status?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    phone_number?: string | null,
    user_role?: string | null,
    organization?: string | null,
    profile_picture?: string | null,
    notes?: string | null,
    is_paged?: boolean | null,
    availability?: string | null,
    created_date_time?: string | null,
    updated_date_time?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    email: string,
    user_status?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    phone_number?: string | null,
    user_role?: string | null,
    organization?: string | null,
    profile_picture?: string | null,
    notes?: string | null,
    is_paged?: boolean | null,
    availability?: string | null,
    created_date_time?: string | null,
    updated_date_time?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    email: string,
    user_status?: string | null,
    first_name?: string | null,
    last_name?: string | null,
    phone_number?: string | null,
    user_role?: string | null,
    organization?: string | null,
    profile_picture?: string | null,
    notes?: string | null,
    is_paged?: boolean | null,
    availability?: string | null,
    created_date_time?: string | null,
    updated_date_time?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};


// Queries

export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($email: String!) {
    getUserProfile(email: $email) {
    availability
    created_date_time
    email
    first_name
    is_paged
    last_name
    notes
    organization
    phone_number
    profile_picture
    updated_date_time
    user_role
    user_status
  }
  }
`;

//Mutations

export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
  ) {
    createUserProfile(input: $input) {
        email
        availability
        created_date_time
        email
        first_name
        is_paged
        last_name
        notes
        organization
        phone_number
        profile_picture
        updated_date_time
        user_role
        user_status
    }
  }
`;
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
  ) {
    updateUserProfile(input: $input) {
        email
        availability
        created_date_time
        email
        first_name
        is_paged
        last_name
        notes
        organization
        phone_number
        profile_picture
        updated_date_time
        user_role
        user_status
    }
  }
`;
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
      email
        availability
        created_date_time
        email
        first_name
        is_paged
        last_name
        notes
        organization
        phone_number
        profile_picture
        updated_date_time
        user_role
        user_status
    }
  }
`;