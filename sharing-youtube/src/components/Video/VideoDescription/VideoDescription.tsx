import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import "./styles.scss";
import axios from "axios";
interface Props {
    video: any;
}
const VideoDescription = (props: Props) => {
    const { video } = props;
    const [videoInfo, setVideoInfo] = useState({
        title: "",
        description: "",
    });
    const getVideoInfo = async () => {
        try {
            const response = await axios.request({
                method: "get",
                url: `https://www.googleapis.com/youtube/v3/videos`,
                params: {
                    part: "snippet",
                    id: "VjGOVM7zDZI",
                    key: process.env.REACT_APP_GOOGLE_API_KEY,
                },
            });
            const data = response.data.items[0].snippet;
            setVideoInfo({
                title: data.title,
                description: data.description,
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getVideoInfo();
    }, []);

    return (
        <div className="video-description-container">
            <div className="title-container">
                <div className="video-title">{videoInfo.title}</div>
                <div className="sharing-info">{`Shared by ${video.shareBy}`}</div>
            </div>
            <div className="description">
                <span className="label">Description</span>
                <span className="description-content">
                    {videoInfo.description}
                </span>
            </div>
        </div>
    );
};

export default VideoDescription;
