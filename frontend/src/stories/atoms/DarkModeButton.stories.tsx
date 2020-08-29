import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import "../../index.css";
import DarkModeBtn from "../../components/atoms/Button/DarkModeButton";
import { StateProvider } from "../../store/ThemeContext";

export default {
  title: "Atoms/Button/DarkModeButton",
  component: DarkModeBtn,
} as Meta;

export const DarkModeButton: Story = () => (
  <StateProvider>
    <DarkModeBtn />
  </StateProvider>
);
