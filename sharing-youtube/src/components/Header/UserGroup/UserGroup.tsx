import React, { FormEvent, useState } from "react";
import { Link, Route } from "react-router-dom";
import { validateEmail } from "../../../utils/utils";
import "./styles.scss";
interface Props {
    userName: string;
    handleLogOut: () => void;
}
const UserGroup = (props: Props) => {
    return (
        <div className="user-group-container">
            <span className="welcome-text">{"Welcome " + props.userName}</span>
            <div>
                <button>
                    <Link to="/share">Share a video</Link>
                </button>
                <button onClick={props.handleLogOut}>Log Out</button>
            </div>
        </div>
    );
};
export default UserGroup;
