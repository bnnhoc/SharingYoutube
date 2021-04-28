import React, { Component } from "react";
import YoutubeEmbed from "../components/Video/YoutubeEmbed/EmbededVideos";
import Header from "../components/Header/Header";
import firebase from "../firebase";
import "./styles.scss";
import { sessionStore } from "../utils/utils";
interface Props {}
interface State {
    user: {
        email: string;
        pw: string;
    };
    isLoggedIn: boolean;
    isLoading: boolean;
    listVideos: Array<any>;
}
class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            listVideos: [],
            isLoading: true,
            isLoggedIn: false,
            user: {
                email: "",
                pw: "",
            },
        };
    }
    componentDidMount = async () => {
        const userId = sessionStorage.getItem("userId");
        if (userId) {
            const itemsRef = firebase.database().ref("users");
            itemsRef.on("value", (snapshot) => {
                let items = snapshot.val();
                let user;
                if (items && items[userId]) {
                    user = {
                        email: items[userId].email,
                        pw: items[userId].pw,
                    };
                }
                if (user) {
                    this.setState({ user, isLoggedIn: true, isLoading: false });
                } else {
                    this.setState({ isLoading: false });
                }
            });
        } else {
            this.setState({ isLoading: false });
        }
        const itemsRef = firebase.database().ref("listVideos");
        itemsRef.on("value", (snapshot) => {
            let items = snapshot.val();
            let listVideos = [];
            for (let item in items) {
                listVideos.push({ ...items[item] });
            }
            this.setState({ listVideos });
        });
    };
    handleRegister = (username: string, pw: string) => {
        try {
            const userRef = firebase.database().ref("users");
            const users = {
                email: username,
                pw: pw,
            };
            const key = userRef.push(users).key;
            this.setState({ isLoggedIn: true }, () => {
                key && sessionStore(key);
            });
        } catch {}
    };
    handleLogOut = () => {
        this.setState(
            {
                user: {
                    email: "",
                    pw: "",
                },
                isLoggedIn: false,
            },
            () => {
                sessionStorage.removeItem("userId");
            }
        );
    };
    handleLogin = (username: string, pw: string) => {
        const itemsRef = firebase.database().ref("users");
        itemsRef.on("value", (snapshot) => {
            let items = snapshot.val();
            let user;
            let key = "";
            for (let item in items) {
                if (items && items[item].email === username) {
                    user = {
                        email: items[item].email,
                        pw: items[item].pw,
                    };
                    key = item;
                    break;
                }
            }
            if (user) {
                this.setState({ user, isLoggedIn: true }, () => {
                    key && sessionStore(key);
                });
            } else {
                this.handleRegister(username, pw);
            }
        });
    };
    render = () => {
        const { user, isLoggedIn, isLoading, listVideos } = this.state;
        console.log(listVideos);
        return (
            <div className="app-container">
                <Header
                    handleLogOut={this.handleLogOut}
                    user={user}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    handleLogin={this.handleLogin}
                />
                <div className="home">
                    {listVideos.map((video) => {
                        return <YoutubeEmbed video={video} />;
                    })}
                </div>
            </div>
        );
    };
}

export default App;
