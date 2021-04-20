import { makeStyles, TextField } from "@material-ui/core";
import { ChatBubble, useAudioVideo } from "amazon-chime-sdk-component-library-react";
import { AudioVideoFacade } from "amazon-chime-sdk-js";
import React, {
  ReactElement, useEffect, useReducer, useState,
} from "react";
import ScrollableFeed from "react-scrollable-feed";
import "../../styles/Chat.css";
import { Message } from "../../types";
import Colors from "../styling/Colors";
import { DarkModeTextField } from "../ui/DarkModeTextField";

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
  const handleSendMessage = (body: string) => {
    const message:Message = {
      body, senderId: attendeeId as string,
    };
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
          return (
            <ChatBubble
              variant={type}
              senderName={name}
              className={`${type} message`}
            >
              {message?.body}
            </ChatBubble>
          );
        })}
      </ScrollableFeed>
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
        className={classes.textField}
        onKeyUp={(e) => handleSubmit(e)}
      />
      {/* <Button onClick={() => handleSendMessage("reallyreallyreallyreallyreallyreallyreallyreallylongmessage")}>
        Send a message
      </Button> */}
    </div>
  );
};

export default Chat;
