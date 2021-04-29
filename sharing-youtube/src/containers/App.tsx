import React, { Component } from "react";
import YoutubeEmbed from "../components/Video/YoutubeEmbed/EmbededVideos";
import Header from "../components/Header/Header";
import firebase from "../firebase";
import "./styles.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from "react-router-dom";
import { sessionStore } from "../utils/utils";
import Home from "./Home/Home";
import SharePage from "./SharePage/SharePage";
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
            let isValidAcc = false;
            for (let item in items) {
                if (items && items[item].email === username) {
                    if (items[item].pw === pw) {
                        user = {
                            email: items[item].email,
                            pw: items[item].pw,
                        };
                        isValidAcc = true;
                        key = item;
                        break;
                    }
                }
            }
            if (isValidAcc) {
                if (user) {
                    this.setState({ user, isLoggedIn: true }, () => {
                        key && sessionStore(key);
                    });
                } else {
                    this.handleRegister(username, pw);
                }
            } else {
                alert("Wrong Id or Password");
            }
        });
    };
    render = () => {
        const { user, isLoggedIn, isLoading, listVideos } = this.state;
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div className="app-container">
                    <Header
                        handleLogOut={this.handleLogOut}
                        user={user}
                        isLoading={isLoading}
                        isLoggedIn={isLoggedIn}
                        handleLogin={this.handleLogin}
                    />
                    <Switch>
                        <Route path="/share">
                            <SharePage userInfo={user.email} />
                        </Route>
                        <Route path="/">
                            <Home
                                userInfo={user.email}
                                listVideos={listVideos}
                                isLoggedIn={isLoggedIn}
                            />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    };
}

export default App;
