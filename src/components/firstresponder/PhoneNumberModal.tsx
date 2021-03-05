import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import PhoneNumberModalContent from "./PhoneNumberModalContent";

const PhoneNumberModal = (): ReactElement => {
  const [state, setState] = useState({ reload: false });
  const open = !localStorage.getItem("firstresponderphonenumber");
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
            console.log("hello");
            setState({ reload: !state.reload });
          }}
        />
      </Fade>
    </Modal>
  );
};

export default PhoneNumberModal;
