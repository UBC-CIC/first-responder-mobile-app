import { IconButton, makeStyles, TextField } from "@material-ui/core";
import {
  ChatBubble, MessageAttachment, useAudioVideo,
} from "amazon-chime-sdk-component-library-react";
import { AudioVideoFacade } from "amazon-chime-sdk-js";
import { Picker } from "aws-amplify-react";
import React, {
  ReactElement, useEffect, useReducer, useState,
} from "react";
import ScrollableFeed from "react-scrollable-feed";
import "../../styles/Chat.css";
import byteSize from "byte-size";
import { RemoveCircleOutline } from "@material-ui/icons";
import Storage from "@aws-amplify/storage";
import { Message, PickerType } from "../../types";
import Colors from "../styling/Colors";

type ChatReducerState = {
  messages:Message[]
}

const initialState = { messages: [] as Message[] };

function reducer(state:ChatReducerState, action:any) {
  switch (action.type) {
  case "set":
    return { messages: action.payload };
  case "add":
    return { messages: [...state.messages, action.payload] };
  default: return state;
  }
}

function useMessageSubscription(audioVideo: AudioVideoFacade) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (audioVideo) {
      audioVideo?.realtimeSubscribeToReceiveDataMessage("chat", (message) => {
        const body = Buffer.from(message.data).toString();
        const formattedMessage: Message = {
          body, senderId: message.senderAttendeeId,
        };
        dispatch({ type: "add", payload: formattedMessage });
      });
    }
    return () => audioVideo?.realtimeUnsubscribeFromReceiveDataMessage("chat");
  }, [audioVideo]);

  const { messages }: {messages: Message[]} = state;
  return { messages, dispatch };
}

const useStyles = makeStyles({
  textField: {
    margin: 10,
    color: Colors.theme.space,
    "& Mui-disabled": {
      color: Colors.theme.space,
    },
  },
  inputLabel: {
    color: Colors.theme.space,
    fontFamily: "Montserrat",
    "& Mui-disabled": {
      color: Colors.theme.space,
    },
  },
});

const Chat = ({ attendeeId, attendees }: {attendeeId?: string, attendees?:any}): ReactElement => {
  const audioVideo = useAudioVideo();
  const { messages, dispatch } = useMessageSubscription(audioVideo as AudioVideoFacade);
  const [currMessage, setCurrMessage] = useState("");
  const classes = useStyles();
  const [currFile, setCurrFile] = useState<PickerType | undefined>();
  const handleSendMessage = (body: string) => {
    const message:Message = {
      body,
      senderId: attendeeId as string,
      attachment: currFile,
    };

    setCurrFile(undefined);
    audioVideo?.realtimeSendDataMessage("chat", body);
    dispatch({ type: "add", payload: message });
    setCurrMessage("");
  };
  const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!currMessage) return;
    if (e.key !== "Enter") return;
    handleSendMessage(currMessage);
  };
  if (!audioVideo) {
    return (
      <div className="flex column align" style={{ width: "100%", color: Colors.theme.platinum }}>
        Chat not available
      </div>
    );
  }

  const handleUpload = async (e: PickerType) => {
    setCurrFile(() => e);
    const res = await Storage.put("file", e, { level: "public" });
    console.log(res);

    console.log(e);
  };
  return (
    <div className="flex column align chatContainer">
      <h4 className="chatTitle">
        Chat
      </h4>
      <ScrollableFeed className="messageContainer">
        {messages.map((message, index) => {
          const type = message.senderId === attendeeId ? "outgoing" : "incoming";
          let name: string;
          if (!attendees || !attendees[message.senderId]) {
            name = "User";
          } else {
            const sender = attendees[message.senderId];
            name = sender.name;
          }
          if (type === "outgoing") name = "Me";
          const { attachment } = message;
          return (
            <ChatBubble
              key={index}
              variant={type}
              senderName={name}
              className={`${type} message`}
            >
              {message?.body}
              {attachment && (
                <MessageAttachment
                  name={attachment.name}
                  size={`${byteSize(attachment.size)}`}
                  downloadUrl=""
                />
              ) }
            </ChatBubble>
          );
        })}
      </ScrollableFeed>
      <div className="flex row justify align">
        <div className="flex row" style={{ width: "100%", color: "#000" }}>
          {currFile && (
            <div className="flex x">
              <RemoveCircleOutline onClick={() => setCurrFile(undefined)} />
            </div>
          )}
          <TextField
            value={currMessage}
            label="Send a message"
            onChange={(e) => setCurrMessage(e.target.value)}
            InputLabelProps={{
              className: classes.inputLabel,
            }}
            InputProps={{
              className: classes.inputLabel,
            }}
            helperText={currFile ? `Current File: ${currFile.name}` : ""}
            className={classes.textField}
            onKeyUp={(e) => handleSubmit(e)}
          />
        </div>
        <Picker title=" " onPick={(e) => handleUpload(e)} />
      </div>
    </div>
  );
};

export default Chat;
