import axios from "axios";
import firebase from "firebase";
import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { validateYouTubeUrl } from "../../utils/utils";
import "./styles.scss";
interface Props {
    userInfo: string;
}

const ShareBox: React.FunctionComponent<Props> = (props: Props) => {
    const [url, setURL] = useState("");

    return (
        <div className="share-box-container">
            <span className="label-share">Share a Youtube Video</span>
            <div className="input-share-container">
                <div className="input-row">
                    <div className="input-container">
                        <input
                            value={url}
                            onChange={(e) => setURL(e.target.value)}
                        ></input>
                        <Route
                            render={({ history }) => (
                                <button
                                    onClick={() => {
                                        if (!props.userInfo) {
                                            alert(
                                                "Please Login To Share Video"
                                            );
                                            return;
                                        }
                                        const videoId = validateYouTubeUrl(url);
                                        if (videoId) {
                                            const videosRef = firebase
                                                .database()
                                                .ref("listVideos");
                                            videosRef.once(
                                                "value",
                                                async function (snapshot) {
                                                    const videoExist = snapshot
                                                        .child(videoId)
                                                        .exists();
                                                    if (!videoExist) {
                                                        try {
                                                            const response = await axios.request(
                                                                {
                                                                    method:
                                                                        "get",
                                                                    url:
                                                                        "https://www.googleapis.com/youtube/v3/videos",
                                                                    params: {
                                                                        id: videoId,
                                                                        key:
                                                                            process
                                                                                .env
                                                                                .REACT_APP_GOOGLE_API_KEY,
                                                                        part:
                                                                            "snippet",
                                                                    },
                                                                }
                                                            );

                                                            if (
                                                                response.data
                                                                    .items[0].id
                                                            ) {
                                                                videosRef
                                                                    .child(
                                                                        videoId
                                                                    )
                                                                    .set({
                                                                        id: videoId,
                                                                        link: url,
                                                                        shareBy:
                                                                            props.userInfo,
                                                                        dateShare: new Date().getTime(),
                                                                    });
                                                                history.push(
                                                                    "/"
                                                                );
                                                            } else {
                                                                alert(
                                                                    "Video Unavailble"
                                                                );
                                                            }
                                                        } catch (err) {
                                                            alert(
                                                                "Video Unavailble"
                                                            );
                                                        }
                                                    } else {
                                                        alert(
                                                            "Video Has Shared By Another User"
                                                        );
                                                    }
                                                }
                                            );
                                        } else {
                                            alert("Invalid Youtube URL");
                                        }
                                    }}
                                    className=""
                                >
                                    Share
                                </button>
                            )}
                        />
                    </div>
                    <div className="label">Youtube URL: </div>
                </div>
            </div>
        </div>
    );
};
export default ShareBox;
