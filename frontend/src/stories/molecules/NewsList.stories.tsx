import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import "../../index.css";
import NewsLst from "../../components/molecules/NewsList/NewsList";

export default {
  title: "Molecules/NewsList",
  component: NewsLst,
} as Meta;

const Template: Story = () => <NewsLst />;

export const NewsList = Template.bind({});
