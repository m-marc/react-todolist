import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import SingleTask, {TaskListPropType} from "../SingleTask";

export default {
    title: "Todolist/SingleTask",
    component: SingleTask,
    args: {
        changeStatusCallback: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        deleteTaskCallback: action('Remove Button inside Task clicked')
    }
} as Meta;

const Template: Story<TaskListPropType> = (args) => <SingleTask {...args} />;

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    singleTask: {id: '1', isDone: true, title: "JS"},
    listId: "todolistId1"
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    singleTask: {id: '1', isDone: false, title: "JS"},
    listId: "todolistId1"
}
