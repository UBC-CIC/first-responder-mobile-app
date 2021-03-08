

const usePhoneNumber = (): string | null => {
  return localStorage.getItem("firstresponderphonenumber");
}

export default usePhoneNumber;