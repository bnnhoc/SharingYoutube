import React from "react";
import App from "../../containers/App";
import { shallow } from "enzyme";

import toJson from "enzyme-to-json";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);
it("renders correctly enzyme", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
});
