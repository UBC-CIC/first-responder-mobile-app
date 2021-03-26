export const getSpecialistProfile = /* GraphQL */ `
  query GetSpecialistProfile($phone_number: String!) {
    getSpecialistProfile(phone_number: $phone_number) {
    created_date_time
    email
    first_name
    is_paged
    last_name
    notes
    organization
    profile_picture
    phone_number
    updated_date_time
    user_role
    user_status
  }
  }
`;

export const updateSpecialistProfile = /* GraphQL */ `
  mutation UpdateSpecialistProfile($input: UpdateSpecialistProfileInput!) {
    updateSpecialistProfile(input: $input) {
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

export const createSpecialistProfile = /* GraphQL */ `
  mutation CreateSpecialistProfile($input: CreateSpecialistProfileInput!) {
    createSpecialistProfile(input: $input) {
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
