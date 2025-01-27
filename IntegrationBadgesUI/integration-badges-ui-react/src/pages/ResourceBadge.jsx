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
        tasks = badgeTaskMap[badgeId].map(taskId => {
            return taskMap[taskId];
        });
    }
    console.log("badgeTaskMap ", tasks)


    let prerequisiteBadges;
    if (badge && badge.prerequisites && badgeMap) {
        prerequisiteBadges = badge.prerequisites.map(badge => {
            return badgeMap[badge.badge_id];
        });
    }

    if (resource && organization && badge) {
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
                                    <label className="text-secondary">Badge Type</label>
                                    <div>{resource.cider_type}</div>
                                </div>
                                <div className="col">
                                    <label className="text-secondary">Latest Status</label>
                                    <div>{getLatestStatus(resource)}</div>
                                </div>
                                <div className="col">
                                    <label className="text-secondary">RP Roles</label>
                                    <div>{resource.info_resourceid}</div>
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
                <div className="w-100">
                    {prerequisiteBadges && prerequisiteBadges.map((badge, taskIndex) => {
                        return <div key={taskIndex}>
                            <h4>{badge.name}</h4>
                            <p>{badge.resource_provider_summary}</p>
                        </div>
                    })}
                </div>
            </div>

            <div className="row">
                <h3>To-Do Tasks</h3>
                <div className="w-100">
                    {tasks && tasks.map((task, taskIndex) => {
                        return <div key={taskIndex}>
                            <h4>{task.name}</h4>
                            <p>{task.technical_summary}</p>
                        </div>
                    })}
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