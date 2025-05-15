import {Dropdown, Modal} from "react-bootstrap";
import {BadgeTaskWorkflowStatus} from "../../contexts/TaskContext.jsx";
import {BadgeWorkflowStatus, useBadges} from "../../contexts/BadgeContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import Translate from "../../locales/Translate.jsx";
import {useState} from "react";

export default function ResourceBadgeTasks({resourceId, roadmapId, badgeId}) {
    const {
        getResourceRoadmapBadgeTasks, getResourceRoadmapBadge,
        setResourceRoadmapBadgeTaskWorkflowStatus
    } = useResources();

    const [taskActionStatusProcessing, setTaskActionStatusProcessing] = useState({});
    const [showTaskReopenModal, setShowTaskReopenModal] = useState(false);

    const badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
    let tasks = getResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});

    const clickTaskAction = async (taskId, status) => {
        setTaskActionStatusProcessing({
            ...taskActionStatusProcessing, [taskId]: true
        });
        await setResourceRoadmapBadgeTaskWorkflowStatus({resourceId, roadmapId, badgeId, taskId, status})
        setTaskActionStatusProcessing({
            ...taskActionStatusProcessing, [taskId]: false
        });

        setShowTaskReopenModal(false);
    };

    if (badge && tasks) {
        return <div className="w-100">
            {tasks && tasks.length === 0 && <div className="w-100 p-3 text-center lead">
                No Tasks Available
            </div>}
            {tasks && tasks.map((task, taskIndex) => {
                const taskId = task.task_id;

                return <div key={taskIndex} className="w-100 pt-2">

                    <div className="row rounded-3 border-gray-200 border border-1">


                        <div className="col-sm-4 ps-0 d-flex flex-row align-items-center">
                            <div
                                className="p-4 h-100 bg-gray-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                                role="button">
                            </div>
                            <h4 className="flex-fill p-2 ps-3 m-0 fs-6">{task.name}</h4>
                        </div>

                        <p className="col-sm-5 pt-2 pb-2 m-0 align-content-center">
                            {task.technical_summary}
                            <a className="btn btn-link" href={task.detailed_instructions_url}>View Details</a>
                        </p>
                        <div className="col-sm-3 pt-2 pb-2 align-content-center">
                            <Dropdown>
                                <Dropdown.Toggle variant={task.status ? 'outline-dark' : 'dark'}
                                                 id="dropdown-basic"
                                                 bsPrefix="w-100 btn-sm rounded-3 d-flex flex-row">
                                            <span className="flex-fill text-start">
                                                {!task.status ? <i className="bi bi-layers"></i> :
                                                    <i className="bi bi-check-circle-fill"></i>}
                                                <span
                                                    className="ps-3 pe-3">{!task.status ? "Incomplete" : task.status === BadgeTaskWorkflowStatus.NOT_COMPLETED ? "Not Applicable" : "Completed"}</span>
                                            </span>
                                    <span>
                                                <i className="bi bi-chevron-down"></i>
                                            </span>
                                </Dropdown.Toggle>

                                {(badge.status === BadgeWorkflowStatus.VERIFIED ||
                                        badge.status === BadgeWorkflowStatus.TASK_COMPLETED) &&
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={setShowTaskReopenModal.bind(this, {
                                                taskId,
                                                status: BadgeTaskWorkflowStatus.COMPLETED
                                            })}>
                                            Completed</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={setShowTaskReopenModal.bind(this, {
                                                taskId,
                                                status: BadgeTaskWorkflowStatus.NOT_COMPLETED
                                            })}>
                                            Not Applicable</Dropdown.Item>
                                    </Dropdown.Menu>}


                                {(badge.status === BadgeWorkflowStatus.PLANNED ||
                                        badge.status === BadgeWorkflowStatus.VERIFICATION_FAILED) &&
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={clickTaskAction.bind(this, taskId, BadgeTaskWorkflowStatus.COMPLETED)}>
                                            Completed</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={clickTaskAction.bind(this, taskId, BadgeTaskWorkflowStatus.NOT_COMPLETED)}>
                                            Not Applicable</Dropdown.Item>
                                    </Dropdown.Menu>}
                            </Dropdown>
                        </div>
                    </div>
                </div>
            })}


            <Modal show={showTaskReopenModal} onHide={setShowTaskReopenModal.bind(this, false)}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>
                        <i className="bi bi-question-octagon-fill"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You're about to make changes to a
                    "<Translate>badgeWorkflowStatus.{badge.status}</Translate>" badge.
                    These changes may require the badge to be re-verified by a concierge.
                    Do you want to continue?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-dark rounded-1"
                            onClick={setShowTaskReopenModal.bind(this, false)}>
                        No
                    </button>
                    <button className="btn btn-dark rounded-1"
                            onClick={clickTaskAction.bind(this, showTaskReopenModal.taskId, showTaskReopenModal.status)}>
                        Yes
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}