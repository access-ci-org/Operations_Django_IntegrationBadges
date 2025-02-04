import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import DefaultReducer from "./reducers/DefaultReducer";

const TaskContext = createContext({
    taskMap: {},
    badgeTaskMap: {},
    fetchTasks: ({badgeId}) => {
    }
});

export const useTasks = () => useContext(TaskContext);

/**
 * Context provider for tasks
 * @param children
 */
export const TaskProvider = ({children}) => {
    const [taskMap, setTaskMap] = useReducer(DefaultReducer, {});
    const [badgeTaskMap, setBadgeTaskMap] = useReducer(DefaultReducer, {});

    const fetchTasks = async ({badgeId}) => {
        try {
            const response = await axios.get(`/task/${badgeId}`);
            const _tasks = response.data.results;
            console.log("_tasks : ", _tasks)
            const _taskMap = {}
            const _taskIds = [];
            for (let i = 0; i < _tasks.length; i++) {
                const _task = _tasks[i].task;
                _taskMap[_task.task_id] = _task;
                _taskIds.push(_task.task_id)
            }
            console.log("_taskMap", _taskMap)
            console.log("_taskIds", _taskIds)
            setTaskMap({...taskMap, ..._taskMap});
            setBadgeTaskMap({...badgeTaskMap, [badgeId]: _taskIds});

            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    return (
        <TaskContext.Provider value={{taskMap, badgeTaskMap, fetchTasks}}>
            {children}
        </TaskContext.Provider>
    );
};
