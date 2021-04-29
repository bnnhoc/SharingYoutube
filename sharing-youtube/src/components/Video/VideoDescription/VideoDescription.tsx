import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import "./styles.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { userInfo } from "node:os";
interface Props {
    video: any;
    isLoggedIn: boolean;
    userInfo: string;
}
const VideoDescription = (props: Props) => {
    const { video, isLoggedIn, userInfo } = props;
    const [likeStatus, setLikeStatus] = useState(
        props.video.vote?.includes(props.userInfo)
            ? true
            : props.video.disvote?.includes(props.userInfo)
            ? false
            : undefined
    );
    const [videoInfo, setVideoInfo] = useState({
        title: "",
        description: "",
    });
    useEffect(() => {
        setLikeStatus(
            video.vote?.includes(props.userInfo)
                ? true
                : video.disvote?.includes(props.userInfo)
                ? false
                : undefined
        );
    }, [userInfo]);
    const getVideoInfo = async () => {
        try {
            const response = await axios.request({
                method: "get",
                url: `https://www.googleapis.com/youtube/v3/videos`,
                params: {
                    part: "snippet",
                    id: video.id,
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
    const handleLikeAction = () => {
        const videoRef = firebase
            .database()
            .ref(`listVideos/${props.video.id}/vote`);
        if (likeStatus === undefined) {
            const voteList = props.video.vote || [];
            voteList.push(props.userInfo);
            videoRef.set(voteList);
            setLikeStatus(true);
            return;
        }
        const voteList = props.video.vote || [];
        const newVoteList = voteList.filter(
            (item: string) => item !== props.userInfo
        );
        videoRef.set(newVoteList);
        setLikeStatus(undefined);
    };
    const handleDisLikeAction = () => {
        const videoRef = firebase
            .database()
            .ref(`listVideos/${props.video.id}/disvote`);
        const disVoteList = props.video.disvote || [];

        if (likeStatus === undefined) {
            disVoteList.push(props.userInfo);
            videoRef.set(disVoteList);
            setLikeStatus(false);
            return;
        }
        const newDisVoteList = disVoteList.filter(
            (item: string) => item !== props.userInfo
        );
        videoRef.set(newDisVoteList);
        setLikeStatus(undefined);
    };

    return (
        <div className="video-description-container">
            <div className="video-des-head">
                <div className="title-container">
                    <div className="video-title">{videoInfo.title}</div>
                    <div className="sharing-info">{`Shared by ${video.shareBy}`}</div>
                </div>
                {isLoggedIn && (
                    <div className="group-vote">
                        {(likeStatus === true || likeStatus === undefined) && (
                            <FontAwesomeIcon
                                style={{ marginRight: "10px" }}
                                icon={faThumbsUp}
                                size="2x"
                                color={likeStatus === true ? "#1ea0f0" : "#fff"}
                                className="thumb-up-icon"
                                onClick={handleLikeAction}
                            />
                        )}
                        {(likeStatus === false || likeStatus === undefined) && (
                            <FontAwesomeIcon
                                icon={faThumbsDown}
                                size="2x"
                                color={
                                    likeStatus === false ? "#EA0271" : "#fff"
                                }
                                onClick={handleDisLikeAction}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="description">
                <span className="label">Description:</span>
                <span className="description-content">
                    {videoInfo.description}
                </span>
            </div>
        </div>
    );
};

export default VideoDescription;
