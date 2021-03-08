import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import usePhoneNumber from "../hooks/usePhoneNumber";
import PhoneNumberModalContent from "./PhoneNumberModalContent";

const PhoneNumberModal = (): ReactElement => {
  const [state, setState] = useState({ reload: false });
  const phone = usePhoneNumber();
  const open = !phone;
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <PhoneNumberModalContent
          onClick={(phoneNumber) => {
            localStorage.setItem("firstresponderphonenumber", phoneNumber);
            setState({ reload: !state.reload });
          }}
        />
      </Fade>
    </Modal>
  );
};

export default PhoneNumberModal;
