import { Backdrop, Fade, Modal } from "@material-ui/core";
import React, { ReactElement, useState } from "react";

const PhoneNumberModal = (): ReactElement => {
  const state = useState();
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
        <div>
          <h2 id="transition-modal-title">Transition modal</h2>
          <p id="transition-modal-description">
            react-transition-group animates me.
          </p>
          <button
            onClick={() =>
              localStorage.setItem("firstresponderphonenumber", "6043189666")
            }
          >
            Submit
          </button>
        </div>
      </Fade>
    </Modal>
  );
};

export default PhoneNumberModal;
