import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const TaskContext = createContext({
    // taskMap: {},
    // badgeTaskIdMap: {},
    fetchBadgeTasks: ({badgeId}) => {
    },
    getTask: ({taskId}) => {
    },
    getBadgeTasks: ({badgeId}) => {
    }
});

export const useTasks = () => useContext(TaskContext);

export const BadgeTaskWorkflowStatus = {
    COMPLETED: "completed",
    NOT_COMPLETED: "not-completed",
}

/**
 * Context provider for tasks
 * @param children
 */
export const TaskProvider = ({children}) => {
    const [taskMap, setTaskMap] = useReducer(DefaultReducer, {});
    const [badgeTaskIdMap, setBadgeTaskIdMap] = useReducer(DefaultReducer, {});

    const fetchBadgeTasks = async ({badgeId}) => {
        try {
            const response = await dashboardAxiosInstance.get(`/badge/${badgeId}/tasks`);
            const _tasks = response.data.results;
            const _taskMap = {}
            const _taskIds = [];
            for (let i = 0; i < _tasks.length; i++) {
                const _task = _tasks[i].task;
                _task.required = _tasks[i].required;
                _task.sequence_no = _tasks[i].sequence_no;

                _taskMap[_task.task_id] = _task;
                _taskIds.push(_task.task_id)
            }
            setTaskMap({...taskMap, ..._taskMap});
            setBadgeTaskIdMap({...badgeTaskIdMap, [badgeId]: _taskIds});

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const getTask = ({taskId}) => {
        return taskMap[taskId];
    };

    const getBadgeTasks = ({badgeId}) => {
        if (badgeTaskIdMap[badgeId]) {
            return badgeTaskIdMap[badgeId].map(taskId => getTask({taskId}));
        }
    };

    return (
        <TaskContext.Provider value={{fetchBadgeTasks, getTask, getBadgeTasks}}>
            {children}
        </TaskContext.Provider>
    );
};
