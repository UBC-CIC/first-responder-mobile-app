import { FullAvailabilityType } from "../../../types";

export const getSpecialistProfile = /* GraphQL */ `
  query GetSpecialistProfile($phone_number: String!) {
    getSpecialistProfile(phone_number: $phone_number) {
    availability {
      overrides {
        end_time
        override_type
        start_time
      }
      schedules {
        availability_type
        day_of_week
        start_seconds_since_midnight
        end_seconds_since_midnight
        timezone
      }
    }
    phone_number
  }
  }
`;

export const updateSpecialistProfile = /* GraphQL */ `
  mutation UpdateSpecialistProfile($input: UpdateSpecialistProfileInput!) {
    updateSpecialistProfile(input: $input) {
    availability {
      overrides {
        end_time
        override_type
        start_time
      }
      schedules {
        availability_type
        day_of_week
        start_seconds_since_midnight
        end_seconds_since_midnight
        timezone
      }
    }
    phone_number
    }
  }
`;

export type UpdateSpecialistProfileInput = {
  availability?: FullAvailabilityType | null,
  created_date_time?: string | null,
  email?: string | null,
  first_name?: string | null,
  is_paged?: boolean | null,
  last_name?: string | null,
  notes?: string | null,
  organization?: string | null,
  phone_number: string,
  profile_picture?: string | null,
  updated_date_time?: string | null,
  user_role?: string | null,
  user_status?: string | null,
};

export type UpdateSpecialistProfileMutation = {
  updateSpecialistProfile?: {
    __typename: "SpecialistProfile",
    availability?: string | null,
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
  } | null,
};

export type GetSpecialistProfileQuery = {
  getSpecialistProfile?: {
    __typename: "SpecialistProfile",
    availability?: FullAvailabilityType | null,
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
  } | null,
};
