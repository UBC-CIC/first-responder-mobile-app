import { useEffect, useState } from "react";


const usePhoneNumber = (): string | null => {
  const [phone, setPhone] = useState<string | null>("");

  useEffect(() => {
    setPhone(localStorage.getItem("firstresponderphonenumber"))
  }, [localStorage.getItem("firstresponderphonenumber")])
  return localStorage.getItem("firstresponderphonenumber");
}

export default usePhoneNumber;