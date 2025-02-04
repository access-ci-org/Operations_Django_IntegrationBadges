import {Link, useParams} from "react-router-dom";
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useResources} from "../contexts/ResourcesContext";
import {useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";

import defaultBadgeIcon from "../assets/badge_icon_default.png"
import {useTasks} from "../contexts/TaskContext";
import Accordion from "react-bootstrap/Accordion";

export default function ResourceBadge() {
    const {resourceId, badgeId} = useParams();
    const {organizations, organizationMap, organizationMapByName, fetchOrganizations} = useOrganizations();
    const {resources, resourceMap, fetchResources, fetchResource, fetchSelectedResources} = useResources();
    const {badgeMap, fetchBadges, fetchBadge} = useBadges();
    const {taskMap, badgeTaskMap, fetchTasks} = useTasks();
    const [filterSelection, setFilterSelection] = useState({});

    useEffect(() => {
        fetchResource({resourceId});
        fetchOrganizations();
        fetchBadges();
        fetchBadge({badgeId});
        fetchTasks({badgeId});
    }, []);




    const resource = resourceMap[resourceId];

    let organization;
    if (resource) {
        console.log("organizationMapByName : ", organizationMapByName)
        console.log("resource : ", resource)
        organization = organizationMapByName[resource.organization_name];
    }

    let badge;
    if (badgeMap) {
        badge = badgeMap[badgeId]
    }

    let tasks;
    if (badgeTaskMap && badgeTaskMap[badgeId]) {
        const _tasks = badgeTaskMap[badgeId].map(taskId => {
            return taskMap[taskId];
        });
        if (_tasks.indexOf(undefined) < 0) {
            tasks = _tasks;
        }
    }
    console.log("tasks ", tasks)


    let prerequisiteBadges;
    if (badge && badge.prerequisites && badgeMap) {
        const _prerequisiteBadges = badge.prerequisites.map(prerequisiteBadge => {
            return badgeMap[prerequisiteBadge.prerequisite_badge_id];
        });
        console.log("badge.prerequisites ", badge.prerequisites)
        console.log("badgeMap ", badgeMap)
        console.log("_prerequisiteBadges ", _prerequisiteBadges)
        if (_prerequisiteBadges.indexOf(undefined) < 0) {
            prerequisiteBadges = _prerequisiteBadges;
        }
    }
    console.log("prerequisiteBadges ", prerequisiteBadges)

    if (resource && organization && badge && prerequisiteBadges && tasks) {
        return <div className="container">
            <div className="row">
                <div className="col-lg-9">
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
                        <div className="col-lg-2 background-image-center-no-repeat"
                             style={{backgroundImage: `url(${defaultBadgeIcon})`}}>

                        </div>
                        <div className="col-lg-10">
                            <h2>{badge.name}</h2>
                            <div className="row">
                                <div className="col">
                                    <label className="text-secondary">Resource Type</label>
                                    <div>{resource.cider_type}</div>
                                </div>
                                <div className="col">
                                    <label className="text-secondary">Latest Status</label>
                                    <div>{getLatestStatus(resource)}</div>
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
                <div className="col-lg-3 p-3">
                    <div className="w-100 h-100 rounded-4 p-5 bg-light">
                        <h3>Badge Status</h3>
                        <ul>
                            <li>Not Planned</li>
                            <li>Planned</li>
                            <li>Tasks Completed</li>
                            <li>Verification Pending</li>
                            <li>Verification Failed</li>
                            <li>Verified</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <h3>Pre-Requisite Badges</h3>
                <div className="w-100 pb-3">
                    {prerequisiteBadges && prerequisiteBadges.map((prerequisiteBadge, taskIndex) => {
                        console.log("###### WAIT prerequisiteBadge ", prerequisiteBadge)
                        return <div key={taskIndex} className="w-100 pt-2">
                            <div className="row resource_badge_prerequisite_card">
                                <div className="col-lg-4 d-flex flex-row">
                                    <div className="background-image-center-no-repeat"
                                         style={{backgroundImage: `url(${defaultBadgeIcon})`, width: 60, height: 60}}>
                                    </div>
                                    <h4 className="col-lg-3 h-100 flex-fill ps-2 pe-2 pt-3 text-center">{prerequisiteBadge.name}</h4>
                                </div>
                                <p className="col-lg-5 h-100 pt-3 pb-2">{prerequisiteBadge.resource_provider_summary}</p>
                                <div className="col-lg-3 h-100 pt-3">
                                    <button className="btn btn-dark btn-sm">Mark as Complete</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className="row pt-4">
                <h3>To-Do Tasks</h3>
                <div className="w-100">
                    {tasks && tasks.map((task, taskIndex) => {
                        return <div key={taskIndex} className="w-100 pt-2">
                            <div className="row resource_badge_prerequisite_card">
                                <div className="col-lg-4 d-flex flex-row">
                                    <h4 className="col-lg-3 h-100 flex-fill ps-2 pe-2 pt-3 text-center">{task.name}</h4>
                                </div>
                                <p className="col-lg-5 h-100 pt-3 pb-2">
                                    {task.technical_summary}
                                    <a className="btn btn-link" href={task.detailed_instructions_url}>View Details</a>
                                </p>
                                <div className="col-lg-3 h-100 pt-3">
                                    <button className="btn btn-dark btn-sm">Mark as Complete</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className="w-100 d-flex flex-row pt-5 pb-5">
                <div className="flex-fill"></div>
                <div style={{maxWidth: 400}}>
                    <button className="btn btn-outline-dark">Submit for Verification</button>
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

function getLatestStatus(resource) {
    if (resource.badge_status && resource.badge_status.length > 0) {
        return resource.badge_status[resource.badge_status.length - 1].state;
    } else {
        return "Not Started"
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