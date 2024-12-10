import WarningIcon from '../../../assets/img/icons/alert-triangle.svg';
import EmptyPage from "../../fragments/EmptyPage";
import {useEffect, useState} from "react";
import axios from "axios";
import {workflow_states} from "../../../App";

/**
 * The task component that displays the task details.
 * @param {number} index - The index of the task.
 * @param {string} parentId - The parent ID of the task.
 * @param {task} task - The task info.
 */
function BadgeTask({index, parentId, task}) {
    const openTaskDetails = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div className="accordion-item task-wrapper">
            <h2 className="accordion-header" id={`heading${parentId}${index}`}>
                <button className="accordion-button collapsed task-title"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${parentId}${index}`}
                        aria-expanded="false"
                        aria-controls={parentId + index}>
                    {task.name}
                </button>
            </h2>
            <div id={`${parentId}${index}`}
                 className="accordion-collapse task-content collapse"
                 aria-labelledby={`heading${parentId}${index}`}>
                <div className="accordion-body">
                    <p className="task-summary">{task.technical_summary}</p>
                    <div className="task-options-wrapper">
                        <div className="task-options">
                            <div className="task-option-box">
                                <p>Implementor Roles</p>
                                <p>{task.implementor_roles}</p>
                            </div>
                            <div className="task-option-box">
                                <p>Task Experts</p>
                                <p>{task.task_experts}</p>
                            </div>
                        </div>
                        <button className="btn btn-medium"
                                onClick={() => openTaskDetails(task.detailed_instructions_url)}>
                            View Task Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * The container that displays the tasks associated with the badge.
 * @param {number} resource_id - The resource ID.
 * @param {string} resource_name - The resource name.
 * @param {CombinedBadge} badge - The badge info.
 * @param {Array<Task>} tasks - The tasks associated with the badge.
 * @param {Function} setResource - The function to set the resource.
 */
export default function TaskContainer({resource_id, resource_name, badge, tasks, setResource}) {
    const [planned, setPlanned] = useState("disabled");
    const resourceNameWithoutSpaces = resource_name.replace(/\s/g, '');

    useEffect(() => {
        let newState = "disabled";

        if (!badge.state) {
            newState = "disabled";
        } else if (badge.state === workflow_states.NOT_PLANNED) {
            newState = "disabled";
        } else if (badge.state === workflow_states.PLANNED) {
            newState = "";
        } else if (badge.state !== workflow_states.VERIFIED) {
            // besides verified and the first two, share the same style
            newState = "planned-style";
        } else if (badge.state === workflow_states.VERIFIED) {
            newState = "disabled";
        }

        setPlanned(newState);
    }, [badge.state]);

    const handleTaskCompleted = async () => {
        try {
            const response = await axios.post(`resource/${resource_id}/${badge.badge_id}/task_completed`);
            console.log('Successfully mark state task completed:', response.data);

            // Fetch the updated badge status
            const badgeStatusResponse = await axios.get(`resource/${resource_id}/state`);
            const updatedBadgeStatus = badgeStatusResponse.data.results.badge_status;
            console.log('Successfully updated badge status:', updatedBadgeStatus);

            if (updatedBadgeStatus) {
                setResource(prevState => {
                    const updatedResource = {...prevState};
                    updatedResource.badge_status = updatedBadgeStatus;
                    return updatedResource;
                });
            }
        } catch (error) {
            console.error('Error posting resource-badge (task completed):', error);
        }
    };

    const handleTaskUncompleted = async () => {
        try {
            const response = await axios.post(`resource/${resource_id}/${badge.badge_id}/task_uncompleted`);
            console.log('Successfully mark state task uncompleted:', response.data);

            // Fetch the updated badge status
            const badgeStatusResponse = await axios.get(`resource/${resource_id}/state`);
            const updatedBadgeStatus = badgeStatusResponse.data.results.badge_status;
            console.log('Successfully updated badge status:', updatedBadgeStatus);

            if (updatedBadgeStatus) {
                setResource(prevState => {
                    const updatedResource = {...prevState};
                    updatedResource.badge_status = updatedBadgeStatus;
                    return updatedResource;
                });
            }
        } catch (error) {
            console.error('Error posting resource-badge (task uncompleted):', error);
        }
    };

    return (
        <div className="task-container">
            <div className="task-container-header">
                <div className="task-container-title">
                    <h4>Associated Tasks</h4>
                    {(!badge.state || badge.state === workflow_states.NOT_PLANNED) &&
                        <p><span><img src={WarningIcon}/></span> Please plan the badge first to mark tasks as completed.</p>
                    }
                </div>
                <button className={`btn btn-medium ` + planned} style={{minHeight: '36px'}}
                        onClick={planned === "planned-style" ? handleTaskUncompleted : handleTaskCompleted}>
                    {planned === "planned-style" ? "Mark as Uncompleted" : "Mark as Completed"}
                </button>
            </div>
            {tasks.length === 0 ?
                <EmptyPage text={"No available tasks"} task/> :
                <div className="accordion task-list" id={`BadgeTaskContainer${resource_id}${resourceNameWithoutSpaces}${badge.badge_id}`}>
                    {tasks.map((task, index) => (
                        <BadgeTask key={index}
                                   index={index}
                                   parentId={`BadgeTaskContainer${resource_id}${resourceNameWithoutSpaces}${badge.badge_id}`}
                                   task={task.task}/>
                    ))}
                </div>
            }
        </div>
    );
}