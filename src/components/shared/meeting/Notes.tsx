import { CircularProgress } from "@material-ui/core";
import { Sync } from "@material-ui/icons";
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalHeader,
} from "amazon-chime-sdk-component-library-react";
import React, { useEffect, useState } from "react";
import fetchMeetingDetail from "../../calls/fetchMeetingDetail";
import Colors from "../../styling/Colors";

type NotesProps = {
  show: boolean;
  setShow: Function;
  meetingId: string;
};

const Notes = ({
  show, setShow, meetingId,
}: NotesProps) => {
  const [meetingNotes, setMeetingNotes] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await fetchMeetingDetail({ meeting_id: meetingId });
        console.log(meetingId);
        console.log(res);

        const notes = res.data?.getMeetingDetail?.meeting_comments;
        setMeetingNotes(notes);
        console.log(notes);
      } catch (e) {
        setMeetingNotes("Failed to get meeting Notes");
      } finally {
        setLoading(false);
      }
    };
    if (show) {
      f();
    }
  }, [show, refresh]);

  return (
    <div>
      {show && (
        <Modal size="md" onClose={() => setShow(false)}>
          <ModalHeader title="Meeting Notes" />
          <ModalBody style={{ color: "white" }} className="ffc align ">
            {loading ? (
              <CircularProgress />
            ) : (
              <p color="white">{meetingNotes}</p>
            )}
            <ModalButton
              style={{ backgroundColor: Colors.theme.coral, margin: "1em" }}
              label=""
              icon={<Sync />}
              onClick={() => {
                /** This refresh should be replaced with a
                 * subscription in a production level app */
                setRefresh(!refresh);
                setLoading(true);
              }}
            />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default Notes;
