import React from "react";
import LoginGroup from "./LoginGroup/LoginGroup";
import "./styles.scss";
import Title from "./TitleGroups/Title";
import UserGroup from "./UserGroup/UserGroup";
interface TaskBarProps {
    user: any;
    isLoggedIn: boolean;
    isLoading: boolean;
    handleLogin: (username: string, pw: string) => void;
    handleLogOut: () => void;
}
const TaskBar = (props: TaskBarProps) => {
    const { user, handleLogOut } = props;
    return (
        <div className="task-bar-container">
            <Title />
            {!props.isLoading &&
                (props.isLoggedIn ? (
                    <UserGroup
                        handleLogOut={handleLogOut}
                        userName={user.email}
                    />
                ) : (
                    <LoginGroup handleLogin={props.handleLogin} />
                ))}
        </div>
    );
};

export default TaskBar;
