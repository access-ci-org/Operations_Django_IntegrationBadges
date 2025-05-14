import {Link, useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";
import {BadgeTaskWorkflowStatus, useTasks} from "../contexts/TaskContext";
import {Dropdown, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import ResourceBadgeStatus from "../components/status/ResourceBadgeStatus.jsx";
import Translate from "../locales/Translate.jsx";

export default function ResourceBadge() {
    let {resourceId, roadmapId, badgeId} = useParams();
    roadmapId = parseInt(roadmapId);
    badgeId = parseInt(badgeId);

    const {
        fetchResource,
        fetchResourceRoadmapBadges,
        fetchResourceRoadmapBadgeTasks,
        getResource,
        getResourceRoadmapBadge,
        getResourceRoadmapBadgePrerequisites,
        getResourceOrganization,
        getResourceRoadmapBadgeTasks,
        setResourceRoadmapBadgeWorkflowStatus,
        setResourceRoadmapBadgeTaskWorkflowStatus
    } = useResources();
    const {fetchBadge} = useBadges();
    const {fetchBadgeTasks} = useTasks();

    const [taskActionStatusProcessing, setTaskActionStatusProcessing] = useState({});
    const [badgeActionStatusProcessing, setBadgeActionStatusProcessing] = useState(false);
    const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showTaskReopenModal, setShowTaskReopenModal] = useState(false);

    const resource = getResource({resourceId});
    const organization = getResourceOrganization({resourceId});
    let badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
    let tasks = getResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});
    let prerequisiteBadges = getResourceRoadmapBadgePrerequisites({resourceId, roadmapId, badgeId});

    useEffect(() => {
        fetchResource({resourceId});
        fetchResourceRoadmapBadges({resourceId, roadmapId});
        fetchResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});
        fetchBadge({badgeId});
        fetchBadgeTasks({badgeId});
    }, [resourceId, badgeId]);

    // useEffect(() => {
    //     if (prerequisiteBadges) {
    //         for (let i = 0; i < prerequisiteBadges.length-1; i++) {
    //             const prerequisiteBadge = prerequisiteBadges[i];
    //             console.log("#### prerequisiteBadge ", prerequisiteBadge)
    //             fetchResourceRoadmapBadge({resourceId, roadmapId, badgeId: prerequisiteBadge.badge_id});
    //         }
    //     }
    // }, [prerequisiteBadges.length]);

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

    const clickBadgeAction = async (status) => {
        setShowSaveConfirmationModal(false);
        setBadgeActionStatusProcessing(true);
        await setResourceRoadmapBadgeWorkflowStatus({resourceId, roadmapId, badgeId, status})
        setBadgeActionStatusProcessing(false);

        if (status === BadgeWorkflowStatus.TASK_COMPLETED) setShowSavedModal(true);
    };

    if (resource && organization && badge && tasks && prerequisiteBadges) {

        const isReadyToSubmit = tasks.filter(t => !t.status).length === 0 &&
            prerequisiteBadges.filter(pb => pb.status !== BadgeWorkflowStatus.VERIFIED).length === 0;

        return <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="row">
                        <h1>{resource.resource_descriptive_name}</h1>
                        <div>
                            By&nbsp;&nbsp;
                            <Link to={`/organizations/${organization.organization_id}`}
                                  className="btn btn-link text-dark">
                                {organization.organization_name}
                            </Link>
                        </div>
                    </div>
                    <div className="row pt-5">
                        <div className="col-sm-2 background-image-center-no-repeat mb-3"
                             style={{backgroundImage: `url(${badge.graphic})`, minHeight: 100}}>

                        </div>
                        <div className="col mb-3">
                            <h2>{badge.name}</h2>
                            <div className="row">
                                <label className="text-secondary">RP Roles</label>
                                <div>{getImplementorRoles(tasks).join(", ")}</div>
                            </div>
                        </div>
                        <div className="col-sm-3 ps-1 mb-3">
                            <div className="border-2 border rounded-3 pt-4 pb-4 ps-2 pe-2 text-center">
                                <label className="text-black d-inline fw-bold">Badge Status : </label>
                                <div className="ps-2 d-inline">
                                    <ResourceBadgeStatus resourceId={resourceId} roadmapId={roadmapId}
                                                         badgeId={badgeId}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 pt-5 pb-3">
                        <p className="lead">{badge.resource_provider_summary}</p>
                    </div>
                </div>
            </div>

            <div className="w-100 d-flex flex-row pt-3 pb-4">
                <div className="ps-3 pe-3  text-yellow fs-3">
                    <i className="bi bi-megaphone-fill"></i>
                </div>
                <p className="text-medium flex-fill fs-5">
                    We recommend completing any prerequisite badges before starting the tasks for this badge. Please
                    note that some tasks may be informational—review the details, complete them as needed, and update
                    the status to 'Completed' or 'Not Applicable' based on your situation.</p>
            </div>

            <div className="row">

                <div className="w-100 text-start pb-2">
                    <h3 className="d-inline me-4 text-black">Pre-Requisite Badges</h3>
                    <OverlayTrigger placement="right" delayShow={300} delayHide={150}
                                    overlay={<Tooltip id="tooltip-tasks">
                                        Prerequisite badges must be completed before submitting this badge for concierge
                                        verification. Click badge details to view and complete the required tasks.
                                    </Tooltip>}>
                        <button className="btn btn-link text-yellow d-inline">
                            <i className="bi bi-question-square-fill"></i></button>
                    </OverlayTrigger>
                </div>

                <div className="w-100 pb-3">
                    {prerequisiteBadges && prerequisiteBadges.length === 0 &&
                        <div className="w-100 p-3 text-center lead">
                            No Prerequisites
                        </div>}
                    {prerequisiteBadges && prerequisiteBadges.map((prerequisiteBadge, taskIndex) => {
                        return <div key={taskIndex} className="w-100 pt-2">
                            <div className="row rounded-3 border-gray-200 border border-1 border-left-wide">

                                <div className="col-sm-4 ps-0 d-flex flex-row align-items-center">
                                    <div
                                        className="p-4 h-100 bg-warning-subtle rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                                        role="button">
                                    </div>
                                    <div className="mt-2 mb-2 p-4 background-image-center-no-repeat"
                                         style={{backgroundImage: `url(${prerequisiteBadge.graphic})`}}>

                                    </div>
                                    <h4 className="flex-fill p-2 ps-3 m-0 fs-6">{prerequisiteBadge.name}</h4>
                                </div>
                                <p className="col-sm-5 pt-2 pb-2 m-0 align-content-center">
                                    {prerequisiteBadge.resource_provider_summary}
                                </p>
                                <div className="col-sm-3 pt-2 pb-2 align-content-center text-center">


                                    {!!prerequisiteBadge && <Link
                                        to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}/badges/${prerequisiteBadge.badge_id}`}
                                        className="w-100 btn btn-outline-dark btn-sm rounded-3 d-flex flex-row">

                                        {!prerequisiteBadge.status &&
                                            <>
                                                <span className="flex-fill text-start text-orange">
                                                    <i className="bi bi-info-circle-fill"></i>
                                                    <span className="ps-3 pe-3">Not Planned - Take Action</span>
                                                </span>
                                                <span className="text-orange">
                                                    <i className="bi bi-chevron-right"></i>
                                                </span>
                                            </>}

                                        {prerequisiteBadge.status === BadgeWorkflowStatus.VERIFIED &&
                                            <>
                                                <span className="flex-fill text-start">
                                                    <i className="bi bi-check-circle-fill"></i>
                                                    <span className="ps-3 pe-3">Verification Approved</span>
                                                </span>
                                                <span>
                                                    <i className="bi bi-chevron-right"></i>
                                                </span>
                                            </>}

                                        {[BadgeWorkflowStatus.PLANNED, BadgeWorkflowStatus.TASK_COMPLETED, BadgeWorkflowStatus.VERIFICATION_FAILED].indexOf(prerequisiteBadge.status) >= 0 &&
                                            <>
                                                <span className="flex-fill text-start">
                                                    <i className="bi bi-layers"></i>
                                                    <span className="ps-3 pe-3">Incomplete Badge - Take Action</span>
                                                </span>
                                                <span>
                                                    <i className="bi bi-chevron-right"></i>
                                                </span>
                                            </>}
                                    </Link>}
                                </div>

                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className="row pt-4">

                <div className="w-100 text-start pb-2">
                    <h3 className="d-inline me-4 text-black">Key Tasks & Tips</h3>
                    <OverlayTrigger placement="right" delayShow={300} delayHide={150}
                                    overlay={<Tooltip id="tooltip-tasks">
                                        Some tasks are informational, while others require action. Review them, return
                                        here, and mark each as Complete or N/A.
                                    </Tooltip>}>
                        <button className="btn btn-link text-yellow d-inline">
                            <i className="bi bi-question-square-fill"></i></button>
                    </OverlayTrigger>
                </div>

                <div className="w-100">
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
                </div>
            </div>

            <div className="w-100 d-flex flex-row pt-5 pb-5">
                <div className="flex-fill"></div>
                <div style={{maxWidth: 400}}>
                    {(() => {
                        if (badgeActionStatusProcessing) {
                            return <button className="w-100 btn btn-dark rounded-3">
                                                <span className="spinner-border spinner-border-sm me-3" role="status"
                                                      aria-hidden="true"></span>
                                Loading...
                            </button>
                        } else if (!badge.status || badge.status === BadgeWorkflowStatus.NOT_PLANNED) {
                            return <button className="w-100 btn btn-outline-dark rounded-3"
                                           onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.PLANNED)}>
                                Add this badge to the resource
                            </button>
                        } else if (badge.status === BadgeWorkflowStatus.PLANNED ||
                            badge.status === BadgeWorkflowStatus.VERIFICATION_FAILED) {
                            return <button className="w-100 btn btn-outline-dark rounded-3" disabled={!isReadyToSubmit}
                                           onClick={setShowSaveConfirmationModal.bind(this, true)}>
                                Submit for Verification
                            </button>
                        } else if (badge.status === BadgeWorkflowStatus.TASK_COMPLETED ||
                            badge.status === BadgeWorkflowStatus.VERIFIED) {
                            return <button className="w-100 btn btn-outline-dark rounded-3"
                                           onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.PLANNED)}>
                                Reopen
                            </button>
                        }
                    })()}


                    <Modal show={showSaveConfirmationModal} onHide={setShowSaveConfirmationModal.bind(this, false)}>
                        <Modal.Header closeButton className="bg-light">
                            <Modal.Title>
                                <i className="bi bi-question-octagon-fill"></i>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure that you want to submit this badge for verification?
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-dark rounded-1"
                                    onClick={setShowSaveConfirmationModal.bind(this, false)}>
                                No
                            </button>
                            <button className="btn btn-dark rounded-1"
                                    onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.TASK_COMPLETED)}>
                                Yes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showSavedModal} onHide={setShowSavedModal.bind(this, false)}>
                        <Modal.Header closeButton className="bg-light">
                            <Modal.Title>
                                <i className="bi bi-floppy-fill"></i>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Badge completion has been sent to a concierge for verification.
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-dark rounded-1"
                                    onClick={setShowSavedModal.bind(this, false)}>
                                Exit
                            </button>
                        </Modal.Footer>
                    </Modal>


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

                    <div className="pt-3 d-flex flex-row">
                        <div className="text-yellow fs-4 p-2">
                            <i className="bi bi-megaphone-fill"></i>
                        </div>
                        <p className="flex-fill ps-1 text-medium">
                            Once you’ve completed the tasks, please submit them for concierge approval. A concierge will
                            review the completed tasks, and you’ll receive a follow-up email with next steps.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    }
}


function getImplementorRoles(tasks) {
    let implementorRoles = [];
    for (let i = 0; i < tasks.length; i++) {
        implementorRoles = [...implementorRoles, ...tasks[i].implementor_roles.split(/ *, */ig)]
    }

    return Array.from(new Set(implementorRoles))
}