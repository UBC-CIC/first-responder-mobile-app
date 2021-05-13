import Storage from "@aws-amplify/storage";
import { makeStyles, TextField } from "@material-ui/core";
import { RemoveCircleOutline } from "@material-ui/icons";
import {
  ChatBubble, MessageAttachment, useAudioVideo,
} from "amazon-chime-sdk-component-library-react";
import { AudioVideoFacade } from "amazon-chime-sdk-js";
import byteSize from "byte-size";
import React, {
  ReactElement, useEffect, useReducer, useState,
} from "react";
import ScrollableFeed from "react-scrollable-feed";
import "../../../styles/Chat.css";
import { Message, PickerType } from "../../../types";
import Colors from "../../styling/Colors";

type ChatReducerState = {
  messages:Message[]
}

const initialState = { messages: [] as Message[] };

/** Reducer is used to handle the state of the current messages.
 * This was required due to details with GraphQL Subscriptions
 * and UseEffect.
 */
function reducer(state:ChatReducerState, action:any) {
  switch (action.type) {
  case "set":
    return { messages: action.payload };
  case "add":
    return { messages: [...state.messages, action.payload] };
  default: return state;
  }
}
/** Helper Hook for connecting to GraphQL Subscriptions and updating the context */
function useMessageSubscription(audioVideo: AudioVideoFacade) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (audioVideo) {
      audioVideo?.realtimeSubscribeToReceiveDataMessage("chat", async (message) => {
        const messageData = JSON.parse(Buffer.from(message.data).toString()) as Message;
        messageData.url = await getS3URL(messageData, messageData.meetingId as string);
        dispatch({ type: "add", payload: messageData });
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

const getS3URL = async (message: Message, meetingId:string) => {
  if (message.name && message.size) {
    return await Storage.get(`${meetingId}/${message.size}${message.name}`, { level: "public" }) as string;
  }
};

type ChatProps = {attendeeId?: string,
  attendees?:any,
  meetingId: string}

/** Component for text chat during meeting. Allows for sending files using S3.  */

const Chat = ({ attendeeId, attendees, meetingId }: ChatProps): ReactElement => {
  const audioVideo = useAudioVideo();
  const [error, setError] = useState("");
  const { messages, dispatch } = useMessageSubscription(audioVideo as AudioVideoFacade);
  const [currMessage, setCurrMessage] = useState("");
  const classes = useStyles();
  const [currFile, setCurrFile] = useState<PickerType>();

  // handler for before meeting is finished creation
  if (!audioVideo) {
    return (
      <div className="flex column align" style={{ width: "100%", color: Colors.theme.platinum }}>
        Chat not available
      </div>
    );
  }

  /** Sends a JSON of the message, including a body, senderId, name and size of an optional file */
  const handleSendMessage = async (body: string) => {
    const message:Message = {
      body,
      senderId: attendeeId as string,
      meetingId,
      size: currFile?.size,
      name: currFile?.name,
    };

    setCurrFile(undefined);
    const size = Buffer.from(JSON.stringify(message)).byteLength;
    if (size > 2048) {
      setError("Your message is too big to send");
      return;
    }

    audioVideo?.realtimeSendDataMessage("chat", message);
    message.url = await getS3URL(message, meetingId);
    dispatch({ type: "add", payload: message });
    setCurrMessage("");
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!currMessage && !currFile) return;
    if (e.key !== "Enter") return;
    handleSendMessage(currMessage);
  };

  const handleUpload = async (e: PickerType) => {
    // naive way of making unique file names per file
    setCurrFile(() => e);
    await Storage.put(`${meetingId}/${e.size}${e.name}`, e.file, { level: "public" });
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
          const { name: fileName, size, url } = message;

          return (
            <ChatBubble
              key={index}
              variant={type}
              senderName={name}
              className={`${type} message`}
            >
              {message?.body}
              {url && (
                <div className="attachment">
                  <MessageAttachment
                    name={fileName || "Attachment"}
                    size={`${byteSize(size)}`}
                    downloadUrl={url as string}
                  />
                </div>
              ) }
            </ChatBubble>
          );
        })}
      </ScrollableFeed>
      <div className="flex row justify align">
        <div className="flex row" style={{ width: "100%", color: "#000" }}>
          {currFile && (
            <div className="flex x">
              <RemoveCircleOutline onClick={() => {
                setCurrFile(undefined);
              }}
              />
            </div>
          )}
          <div className="flex column">
            <TextField
              value={currMessage}
              label="Send a message"
              onChange={(e) => {
                setError("");
                setCurrMessage(e.target.value);
              }}
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
            <p>{error}</p>
          </div>
        </div>
        <div className="picker">
          <input
            className="picker-input"
            type="file"
            capture="camera"
            accept="image/*"
            onClick={(e) => {
              const element = e.target as HTMLInputElement;
              element.value = "";
            }}
            onChange={(e) => {
              if (e.target?.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileMetaData: PickerType = {
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  file,
                };
                handleUpload(fileMetaData);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
