import { withKnobs, boolean } from "@storybook/addon-knobs";
import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import "../../index.css";
import { BrowserRouter } from "react-router-dom";
import CenterHdr, {
  PropsType,
} from "../../components/molecules/Header/CenterHeader";

export default {
  title: "Molecules/CenterHeader",
  component: CenterHdr,
  decorators: [withKnobs],
  argTypes: {
    children: { control: "text" },
    backButton: { control: "backButton" },
  },
} as Meta;

const Template: Story<PropsType> = (args) => (
  <BrowserRouter>
    <CenterHdr backButton={boolean("backButton", false)}>
      {args.children}
    </CenterHdr>
  </BrowserRouter>
);

export const CenterHeader = Template.bind({});
CenterHeader.args = {
  children: "Hello World",
};
