import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import DefaultReducer from "./reducers/DefaultReducer";
import {useResources} from "./ResourcesContext";

const TaskContext = createContext({
    taskMap: {},
    badgeTaskMap: {},
    fetchTasks: ({badgeId}) => {
    },
    setBadgeTaskWorkflowStatus: ({resourceId, badgeId, taskId, status}) => {
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
    const {fetchResource} = useResources();

    const [taskMap, setTaskMap] = useReducer(DefaultReducer, {});
    const [badgeTaskMap, setBadgeTaskMap] = useReducer(DefaultReducer, {});

    const fetchTasks = async ({badgeId}) => {
        try {
            const response = await axios.get(`/task/${badgeId}`);
            const _tasks = response.data.results;
            const _taskMap = {}
            const _taskIds = [];
            for (let i = 0; i < _tasks.length; i++) {
                const _task = _tasks[i].task;
                _taskMap[_task.task_id] = _task;
                _taskIds.push(_task.task_id)
            }
            setTaskMap({...taskMap, ..._taskMap});
            setBadgeTaskMap({...badgeTaskMap, [badgeId]: _taskIds});

            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    const markBadgeTaskAsCompleted = async ({badgeId, taskId}) => {
    }

    const setBadgeTaskWorkflowStatus = async ({resourceId, badgeId, taskId, status}) => {
        try {
            const response = await axios.post(
                `/resource/${resourceId}/badge/${badgeId}/task/${taskId}/workflow/${status}`,
            );
            fetchResource({resourceId})

            return response.data.results;
        } catch (error) {
            return error;
        }
    }

    return (
        <TaskContext.Provider value={{taskMap, badgeTaskMap, fetchTasks, setBadgeTaskWorkflowStatus}}>
            {children}
        </TaskContext.Provider>
    );
};
