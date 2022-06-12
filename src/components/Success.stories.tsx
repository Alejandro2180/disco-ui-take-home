import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Success } from "./Success";

export default {
  title: "Disco Elements",
  component: Success,
} as ComponentMeta<typeof Success>;

const Template: ComponentStory<typeof Success> = ({recipient}) => <Success recipient={recipient}>Success!</Success>;

export const success = Template.bind({});
