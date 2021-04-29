import React from "react";
import { shallow } from "enzyme";

import toJson from "enzyme-to-json";
import { cleanup, getByText } from "@testing-library/react";
import Home from "../../../containers/Home/Home";
afterEach(cleanup);
it("renders correctly enzyme", () => {
    const wrapper = shallow(
        <Home listVideos={[]} userInfo="test@gmail.com" isLoggedIn={false} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
});
