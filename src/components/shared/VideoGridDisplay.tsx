import { VideoGrid, VideoTile } from "amazon-chime-sdk-component-library-react";
import { ReactElement } from "react";

const VideoGridDisplay = (): ReactElement => {
  return (
    <div style={{ padding: "1rem", height: "70vh", boxSizing: "border-box" }}>
      <VideoGrid>
        <VideoTile
          style={{
            border: "1px solid grey",
            gridArea: "",
          }}
          nameplate="Me"
        >
          <video id="meeting-video"></video>
        </VideoTile>
        <VideoTile
          style={{
            border: "1px solid grey",
            gridArea: "",
          }}
          nameplate="Tile 2"
        />
      </VideoGrid>
    </div>
  );
};

export default VideoGridDisplay;
