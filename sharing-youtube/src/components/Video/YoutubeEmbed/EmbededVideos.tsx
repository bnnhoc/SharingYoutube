import React from "react";

import ReactPlayer from "react-player";
import "./styles.scss";
import VideoDescription from "../VideoDescription/VideoDescription";
interface Props {
    video: any;
}
const YoutubeEmbed = (props: Props) => {
    const { video } = props;

    return (
        <div className="video-container">
            <ReactPlayer
                width="50%"
                height="100%"
                style={{ marginRight: "10px" }}
                url={video.link}
            />
            <VideoDescription video={video} />
        </div>
    );
};

export default YoutubeEmbed;
