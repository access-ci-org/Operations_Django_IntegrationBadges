import {ReactComponent as WarningIcon} from '../../../assets/img/icons/alert-triangle.svg';
import {ReactComponent as ArrowIcon} from '../../../assets/img/icons/arrow-right.svg';

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


export default function TaskContainer({badgeId, tasks}) {
    return (
        <div className="task-container">
            <div className="task-container-header">
                <div className="task-container-title">
                    <h4>Associated Tasks</h4>
                    <p><span><WarningIcon/></span> Please complete tasks for all pre-requisite
                        badges before completing the tasks for this badge.</p>
                </div>
                <button className="btn btn-medium disabled" style={{minHeight: '36px'}}>
                    Mark as Completed
                </button>
            </div>
            <div className="accordion task-list" id={`BadgeTaskContainer${badgeId}`}>
                {tasks.map((task, index) => (
                    <BadgeTask key={index}
                               index={index}
                               parentId={`BadgeTaskContainer${badgeId}`}
                               task={task.task}/>
                ))}
            </div>
        </div>
    );
}