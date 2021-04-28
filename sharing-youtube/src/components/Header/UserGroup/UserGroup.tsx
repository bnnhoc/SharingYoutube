import React, { FormEvent, useState } from "react";
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
            <button>Share a video</button>
            <button onClick={props.handleLogOut}>Log Out</button>
        </div>
    );
};
export default UserGroup;
