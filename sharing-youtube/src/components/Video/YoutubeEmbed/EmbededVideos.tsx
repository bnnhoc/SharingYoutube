import React from "react";

import ReactPlayer from "react-player";
import "./styles.scss";
import VideoDescription from "../VideoDescription/VideoDescription";
interface Props {
    video: any;
    isLoggedIn: boolean;
    userInfo: string;
}
const YoutubeEmbed = (props: Props) => {
    const { video, isLoggedIn, userInfo } = props;

    return (
        <div className="video-container">
            <ReactPlayer
                width="40%"
                height="100%"
                style={{
                    marginRight: "40px",
                    borderRadius: "15px",
                    overflow: "hidden",
                }}
                url={video.link}
            />
            <VideoDescription
                userInfo={userInfo}
                isLoggedIn={isLoggedIn}
                video={video}
            />
        </div>
    );
};

export default YoutubeEmbed;
