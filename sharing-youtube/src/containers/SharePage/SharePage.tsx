import React, { Component } from "react";
import ShareBox from "../../components/ShareBox/ShareBox";
interface Props {
    userInfo: string;
}
interface State {}
class SharePage extends Component<Props, State> {
    render = () => {
        return (
            <div className="share-page">
                <ShareBox userInfo={this.props.userInfo} />
            </div>
        );
    };
}
export default SharePage;
