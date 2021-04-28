import React, { FormEvent, useState } from "react";
import { validateEmail } from "../../../utils/utils";
import "./styles.scss";
interface Props {
    handleLogin: (username: string, pw: string) => void;
}
const LoginGroup = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateEmail(username)) {
            alert("Invalid Email");
        } else {
            props.handleLogin(username, password);
        }
    };
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="login-btn">Login/Register</button>
        </form>
    );
};
export default LoginGroup;
