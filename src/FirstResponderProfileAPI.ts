export type CreateFirstResponderProfileInput = {
  phone_number: string | null,
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
};

export type ModelFirstResponderProfileConditionInput = {
  phone_number: string | null,
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  and?: Array< ModelFirstResponderProfileConditionInput | null > | null,
  or?: Array< ModelFirstResponderProfileConditionInput | null > | null,
  not?: ModelFirstResponderProfileConditionInput | null,
};

export type FirstResponderProfile = {
  __typename: "FirstResponderProfile",
  phone_number: string | null,
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateFirstResponderProfileInput = {
  phone_number: string | null,
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
};

export type DeleteFirstResponderProfileInput = {
  phone_number?: string | null,
};

export type ModelFirstResponderProfileFilterInput = {
  phone_number: string | null,
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  and?: Array< ModelFirstResponderProfileFilterInput | null > | null,
  or?: Array< ModelFirstResponderProfileFilterInput | null > | null,
  not?: ModelFirstResponderProfileFilterInput | null,
};

export type ModelFirstResponderProfileConnection = {
  __typename: "ModelFirstResponderProfileConnection",
  items?:  Array<FirstResponderProfile | null > | null,
  nextToken?: string | null,
};

export type CreateFirstResponderProfileMutationVariables = {
  input?: CreateFirstResponderProfileInput,
  condition?: ModelFirstResponderProfileConditionInput | null,
};

export type CreateFirstResponderProfileMutation = {
  createFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    phone_number: string | null,
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFirstResponderProfileMutationVariables = {
  input?: UpdateFirstResponderProfileInput,
  condition?: ModelFirstResponderProfileConditionInput | null,
};

export type UpdateFirstResponderProfileMutation = {
  updateFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    phone_number: string | null,
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFirstResponderProfileMutationVariables = {
  input?: DeleteFirstResponderProfileInput,
  condition?: ModelFirstResponderProfileConditionInput | null,
};

export type DeleteFirstResponderProfileMutation = {
  deleteFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    phone_number: string | null,
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetFirstResponderProfileQueryVariables = {
  phone_number?: string,
};

export type GetFirstResponderProfileQuery = {
  getFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    phone_number: string | null,
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFirstResponderProfilesQueryVariables = {
  filter?: ModelFirstResponderProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFirstResponderProfilesQuery = {
  listFirstResponderProfiles?:  {
    __typename: "ModelFirstResponderProfileConnection",
    items?:  Array< {
      __typename: "FirstResponderProfile",
      phone_number: string | null,
      first_name?: string | null,
      last_name?: string | null,
      occupation?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFirstResponderProfileSubscription = {
  onCreateFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    phone_number: string | null,
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFirstResponderProfileSubscription = {
  onUpdateFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    phone_number: string | null,
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFirstResponderProfileSubscription = {
  onDeleteFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    phone_number: string | null,
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export const getFirstResponderProfile = /* GraphQL */ `
  query GetFirstResponderProfile($phone_number: String!) {
    getFirstResponderProfile(phone_number: $phone_number) {
      phone_number
      first_name
      last_name
      occupation
      createdAt
      updatedAt
    }
  }
`;