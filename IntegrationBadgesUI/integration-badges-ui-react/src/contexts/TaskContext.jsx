import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const TaskContext = createContext({
    fetchTasks: () => {},
    getTasks: () => {},
    getTask: ({taskId}) => {
    }
});

export const useTasks = () => useContext(TaskContext);

export const BadgeTaskWorkflowStatus = {
    COMPLETED: "completed",
    NOT_COMPLETED: "not-completed",
    ACTION_NEEDED: "action-needed",
}

/**
 * Context provider for tasks
 * @param children
 */
export const TaskProvider = ({children}) => {
    const [taskIds, setTaskIds] = useReducer(DefaultReducer, []);
    const [taskMap, setTaskMap] = useReducer(DefaultReducer, {});

    const fetchTasks = async () => {
        try {
            const response = await dashboardAxiosInstance.get(`/tasks`);
            const _tasks = response.data.results;
            const _taskMap = {}
            const _taskIds = [];
            for (let i = 0; i < _tasks.length; i++) {
                const _task = _tasks[i];

                _taskMap[_task.task_id] = _task;
                _taskIds.push(_task.task_id)
            }
            setTaskMap({...taskMap, ..._taskMap});
            setTaskIds(_taskIds);

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getTasks = () => {
        return taskIds.map(taskId => getTask({taskId}));
    };

    const getTask = ({taskId}) => {
        return taskMap[taskId];
    };

    return (
        <TaskContext.Provider value={{fetchTasks, getTasks, getTask}}>
            {children}
        </TaskContext.Provider>
    );
};
