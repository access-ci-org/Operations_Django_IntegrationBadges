import {Link, useParams} from "react-router-dom";
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useResources} from "../contexts/ResourcesContext";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";

import {BadgeTaskWorkflowStatus, useTasks} from "../contexts/TaskContext";
import Accordion from "react-bootstrap/Accordion";
import {useTranslation} from "react-i18next";
import {Modal} from "react-bootstrap";

export default function ResourceBadge() {
    const {t} = useTranslation();
    let {resourceId, roadmapId, badgeId} = useParams();
    roadmapId = parseInt(roadmapId);
    badgeId = parseInt(badgeId);

    const {fetchOrganizations} = useOrganizations();
    const {
        fetchResource,
        fetchResourceRoadmapBadge,
        fetchResourceRoadmapBadgeTasks,
        getResource,
        getResourceRoadmapBadge,
        getResourceRoadmapBadgePrerequisites,
        getResourceOrganization,
        getResourceRoadmapBadgeTasks,
        setResourceBadgeWorkflowStatus,
        setResourceBadgeTaskWorkflowStatus
    } = useResources();
    const {fetchBadges, fetchBadge, getBadge} = useBadges();
    const {fetchBadgeTasks} = useTasks();
    const [filterSelection, setFilterSelection] = useState({});

    const [taskActionStatusProcessing, setTaskActionStatusProcessing] = useState({});
    const [badgeActionStatusProcessing, setBadgeActionStatusProcessing] = useState(false);

    useEffect(() => {
        fetchResource({resourceId});
        fetchResourceRoadmapBadge({resourceId, roadmapId, badgeId});
        fetchResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});
        fetchBadge({badgeId});
        fetchBadgeTasks({badgeId});
    }, [resourceId, badgeId]);

    const clickTaskAction = async (taskId, status) => {
        setTaskActionStatusProcessing({
            ...taskActionStatusProcessing,
            [taskId]: true
        });
        await setResourceBadgeTaskWorkflowStatus({resourceId, badgeId, taskId, status})
        setTaskActionStatusProcessing({
            ...taskActionStatusProcessing,
            [taskId]: false
        });
    };

    const clickBadgeAction = async () => {
        setBadgeActionStatusProcessing(true);
        await setResourceBadgeWorkflowStatus({resourceId, badgeId, status: badgeActionStatusProcessing})
        setBadgeActionStatusProcessing(false);
    };


    const resource = getResource({resourceId});
    const organization = getResourceOrganization({resourceId});
    let badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
    let tasks = getResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});
    let prerequisiteBadges = getResourceRoadmapBadgePrerequisites({resourceId, roadmapId, badgeId});

    if (resource && organization && badge && tasks && prerequisiteBadges) {
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
                        <div className="col-sm-2 background-image-center-no-repeat"
                             style={{backgroundImage: `url(${badge.graphic})`}}>

                        </div>
                        <div className="col-sm-10">
                            <h2>{badge.name}</h2>
                            <div className="row">
                                <div className="col">
                                    <label className="text-secondary">Resource Type</label>
                                    <div>{resource.cider_type}</div>
                                </div>
                                <div className="col">
                                    <label className="text-secondary">Latest Status</label>
                                    <div>
                                        <small
                                            className={`ps-2 pe-2 pt-1 pb-1 rounded-1 ${t(`badgeWorkflowStatusClass.${badge.status}`)}`}>
                                            {t(`badgeWorkflowStatus.${badge.status}`)}
                                        </small>
                                    </div>
                                </div>
                                <div className="col">
                                    <label className="text-secondary">Implementor Roles</label>
                                    <div>{getImplementorRoles(tasks).join(", ")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 pt-5 pb-3">
                        <p>{badge.resource_provider_summary}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <h3>Pre-Requisite Badges</h3>
                <div className="w-100 pb-3">
                    {prerequisiteBadges && prerequisiteBadges.length === 0 &&
                        <div className="w-100 p-3 text-center lead">
                            No Prerequisites
                        </div>}
                    {prerequisiteBadges && prerequisiteBadges.map((prerequisiteBadge, taskIndex) => {
                        return <div key={taskIndex} className="w-100 pt-2">
                            <div className="row p-2 rounded-3 border-gray-200 border border-1 border-left-wide">

                                <div className="col-sm-4 ps-0 d-flex flex-row align-items-center">
                                    <div
                                        className="p-4 h-100 bg-gray-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                                        role="button">
                                    </div>
                                    <h4 className="flex-fill p-2 ps-3 m-0">{prerequisiteBadge.name}</h4>
                                </div>
                                <p className="col-sm-5 pt-2 pb-2 m-0 align-content-center">
                                    {prerequisiteBadge.resource_provider_summary}
                                </p>
                                <div className="col-sm-3 pt-2 pb-2 align-content-center">
                                    <Link
                                        to={`/resources/${resource.info_resourceid}/badges/${prerequisiteBadge.badge_id}`}
                                        className="w-100 btn btn-outline-dark btn-sm">
                                        <i className="bi bi-box-arrow-up-right me-3"></i>
                                        View Badge Details
                                    </Link>
                                </div>

                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className="row pt-4">
                <h3>To-Do Tasks</h3>
                <div className="w-100">
                    {tasks && tasks.length === 0 &&
                        <div className="w-100 p-3 text-center lead">
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
                                    <h4 className="flex-fill p-2 ps-3 m-0">{task.name}</h4>
                                </div>

                                <p className="col-sm-5 pt-2 pb-2 m-0 align-content-center">
                                    {task.technical_summary}
                                    <a className="btn btn-link" href={task.detailed_instructions_url}>View Details</a>
                                </p>
                                <div className="col-sm-3 pt-2 pb-2 align-content-center">
                                    {(() => {
                                        if (taskActionStatusProcessing[taskId]) {
                                            return <button className="w-100 btn btn-dark btn-sm">
                                                <span className="spinner-border spinner-border-sm me-3" role="status"
                                                      aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                        } else if (task.status === BadgeTaskWorkflowStatus.NOT_COMPLETED) {
                                            return <button className="w-100 btn btn-dark btn-sm"
                                                           onClick={() => clickTaskAction(taskId, BadgeTaskWorkflowStatus.COMPLETED)}>
                                                <i className="bi bi-exclamation-triangle-fill text-orange me-3"></i>
                                                Mark as Complete
                                            </button>
                                        } else if (task.status === BadgeTaskWorkflowStatus.COMPLETED) {
                                            return <button className="w-100 btn btn-outline-dark btn-sm"
                                                           onClick={() => clickTaskAction(taskId, BadgeTaskWorkflowStatus.NOT_COMPLETED)}>
                                                <i className="bi bi-check-square me-3"></i>
                                                Marked as Complete
                                            </button>
                                        }
                                    })()}
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
                            return <button className="w-100 btn btn-dark">
                                                <span className="spinner-border spinner-border-sm me-3" role="status"
                                                      aria-hidden="true"></span>
                                Loading...
                            </button>
                        } else if (!badge.status || badge.status === BadgeWorkflowStatus.NOT_PLANNED) {
                            return <button className="w-100 btn btn-outline-dark"
                                           onClick={setBadgeActionStatusProcessing.bind(this, BadgeWorkflowStatus.PLANNED)}>
                                <i className="bi bi-check-square me-3"></i>
                                Add this badge to the resource
                            </button>
                        } else if (badge.status === BadgeWorkflowStatus.PLANNED || badge.status === BadgeWorkflowStatus.VERIFICATION_FAILED) {
                            return <button className="w-100 btn btn-outline-dark"
                                           onClick={setBadgeActionStatusProcessing.bind(this, BadgeWorkflowStatus.TASK_COMPLETED)}>
                                <i className="bi bi-check-square me-3"></i>
                                Submit for Verification
                            </button>
                        } else if (badge.status === BadgeWorkflowStatus.TASK_COMPLETED) {
                            return <button className="w-100 btn btn-outline-dark"
                                           onClick={setBadgeActionStatusProcessing.bind(this, BadgeWorkflowStatus.PLANNED)}>
                                <i className="bi bi-check-square me-3"></i>
                                Reopen
                            </button>
                        } else if (badge.status === BadgeWorkflowStatus.VERIFIED) {
                            return <button className="w-100 btn btn-outline-dark"
                                           onClick={setBadgeActionStatusProcessing.bind(this, BadgeWorkflowStatus.TASK_COMPLETED)}>
                                <i className="bi bi-check-square me-3"></i>
                                Submit for Verification
                            </button>
                        }
                    })()}


                    <Modal show={badgeActionStatusProcessing} onHide={setBadgeActionStatusProcessing.bind(this, false)}>
                        <Modal.Header closeButton className="bg-light">
                            <Modal.Title>
                                <span hidden={true}>Badge Submit for Verification Confirmation</span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="text-center text-dark" style={{fontSize: 100}}>
                                <i className="bi bi-question-square-fill"></i>
                            </div>
                            <div className="lead">
                                Are you sure that you want to submit this badge for verification?
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-dark"
                                    onClick={setBadgeActionStatusProcessing.bind(this, false)}>
                                No
                            </button>
                            <button className="btn btn-dark"
                                    onClick={clickBadgeAction.bind(this, BadgeWorkflowStatus.TASK_COMPLETED)}>
                                Yes
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <div className="pt-3 d-flex flex-row">
                        <div>
                            <i className="bi bi-info-circle-fill text-yellow"></i>
                        </div>
                        <p className="flex-fill ps-1">
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
        implementorRoles = [
            ...implementorRoles,
            ...tasks[i].implementor_roles.split(/ *, */ig)
        ]
    }

    return Array.from(new Set(implementorRoles))
}