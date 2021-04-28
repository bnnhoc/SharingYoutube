import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./styles.scss";
const Title = () => {
    return (
        <div className="title-container">
            <FontAwesomeIcon icon={faHome} size="3x" color="#fff" />
            <div className="title">Funny Movies</div>
        </div>
    );
};
export default Title;
