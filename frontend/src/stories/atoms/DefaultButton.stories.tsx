import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import "../../index.css";
import DefaultButton, {
  PropsType,
} from "../../components/atoms/Button/DefaultButton";

export default {
  title: "Atoms/Button/DefaultButton",
  component: DefaultButton,
  decorators: [withKnobs],
  argTypes: {
    children: { control: "text" },
    disabled: { control: "disabled" },
  },
} as Meta;

const Template: Story<PropsType> = (args) => (
  <DefaultButton
    onClick={action("Hello")}
    disabled={boolean("disabled", false)}
  >
    {args.children}
  </DefaultButton>
);

export const Default = Template.bind({});
Default.args = {
  children: "Default Button",
  disabled: false,
};
