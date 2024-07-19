import {ReactComponent as WarningIcon} from '../../../assets/img/icons/alert-triangle.svg';
import {ReactComponent as ArrowIcon} from '../../../assets/img/icons/arrow-right.svg';
import EmptyPage from "../../fragments/EmptyPage";
import {useEffect, useState} from "react";
import axios from "axios";

function BadgeTask({index, parentId, task}) {
    const targetId = `#${parentId}${index}`;

    const openTaskDetails = (url) => {
        window.open(url, '_blank');
    }

    return (
        <div className="accordion-item task-wrapper">
            <h2 className="accordion-header" id={`heading${parentId}${index}`}>
                <button className="accordion-button collapsed task-title" type="button"
                        data-bs-toggle="collapse" data-bs-target={targetId}
                        aria-expanded="false" aria-controls={parentId + index}>
                    {task.name}
                </button>
            </h2>
            <div id={parentId + index} className="accordion-collapse collapse task-content"
                 aria-labelledby={`heading${parentId}${index}`}>
                <div className="accordion-body">
                    <p className="task-summary">{task.technical_summary}</p>
                    <div className="task-options-wrapper">
                        <div className="task-options">
                            <div className="task-option-box">
                                <p>Implementation Roles</p>
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


export default function TaskContainer({resource_id, badge, tasks, setResource}) {
    const [planned, setPlanned] = useState("disabled");

    useEffect(() => {
        let newState = "disabled";

        if (!badge.state) {
            newState = "disabled";
        } else if (badge.state === "Not Planned") {
            newState = "disabled";
        } else if (badge.state === "Planned") {
            newState = "";
        } else if (badge.state === "Task Completed") {
            newState = "completed";
        } else {
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

    return (
        <div className="task-container">
            <div className="task-container-header">
                <div className="task-container-title">
                    <h4>Associated Tasks</h4>
                    {(!badge.state || badge.state === "Not Planned") &&
                        <p><span><WarningIcon/></span> Please plan the badge first to mark tasks as completed.</p>
                    }
                </div>
                <button className={`btn btn-medium ` + planned} style={{minHeight: '36px'}} onClick={handleTaskCompleted}>
                    Mark as Completed
                </button>
            </div>
            {tasks.length === 0 ?
                <EmptyPage text={"No available tasks"} task/> :
                <div className="accordion task-list" id={`BadgeTaskContainer${badge.badge_id}`}>
                    {tasks.map((task, index) => (
                        <BadgeTask key={index}
                                   index={index}
                                   parentId={`BadgeTaskContainer${badge.badge_id}`}
                                   task={task.task}/>
                    ))}
                </div>
            }
        </div>
    );
}