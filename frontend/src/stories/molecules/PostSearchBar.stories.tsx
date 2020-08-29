import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import "../../index.css";
import { BrowserRouter } from "react-router-dom";
import PostSB from "../../components/molecules/PostSearchBar/PostSearchBar";

export default {
  title: "Molecules/PostSearchBar",
  component: PostSB,
} as Meta;

const Template: Story = () => (
  <BrowserRouter>
    <PostSB />
  </BrowserRouter>
);

export const PostSearchBar = Template.bind({});
