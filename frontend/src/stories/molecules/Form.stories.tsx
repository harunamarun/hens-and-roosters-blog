import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import "../../index.css";
import Frm from "../../components/molecules/Form/Form";
import { StateProvider } from "../../store/ThemeContext";

export default {
  title: "Molecules/Form",
  component: Frm,
} as Meta;
const Template: Story = () => (
  <StateProvider>
    <Frm />
  </StateProvider>
);

export const Form = Template.bind({});
