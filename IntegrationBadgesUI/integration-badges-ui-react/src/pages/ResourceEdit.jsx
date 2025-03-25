import {Link, useParams} from "react-router-dom";
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {Collapse, Fade, Modal, Nav} from "react-bootstrap";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";

import {useTranslation} from "react-i18next";
import LoadingBlock from "../components/LoadingBlock";
import {BadgeTaskWorkflowStatus} from "../contexts/TaskContext.jsx";

export default function ResourceEdit() {
    const {t} = useTranslation();
    const {resourceId} = useParams();
    const {fetchOrganizations} = useOrganizations();
    const {fetchResource, getResource, getResourceBadges, getResourceOrganization} = useResources();
    const {fetchBadges} = useBadges();

    const [filterSelection, setFilterSelection] = useState({});
    const [activeTabIndex, setActiveTabIndex] = useState(1);

    useEffect(() => {
        fetchResource({resourceId});
        // fetchOrganizations();
        // fetchBadges();
    }, [resourceId]);

    const resource = getResource({resourceId});
    let organization = getResourceOrganization({resourceId})
    let badges = getResourceBadges({resourceId});

    let badgeGroups = {
        [BadgeWorkflowStatus.NOT_PLANNED]: [],
        [BadgeWorkflowStatus.PLANNED]: [],
        [BadgeWorkflowStatus.TASK_COMPLETED]: [],
        [BadgeWorkflowStatus.VERIFICATION_FAILED]: [],
        [BadgeWorkflowStatus.VERIFIED]: [],
        [BadgeWorkflowStatus.DEPRECATED]: [],
    };

    if (badges && badges.length > 0) {
        for (let i = 0; i < badges.length; i++) {
            const badge = badges[i];
            if (badge.status) {
                badgeGroups[badge.status].push(badge);
            }
        }
    }

    const tabs = [
        // Verified
        badgeGroups[BadgeWorkflowStatus.VERIFIED],

        // All
        badges ? badges : [],

        // Waiting for Verification
        badgeGroups[BadgeWorkflowStatus.TASK_COMPLETED],

        // Verification Failed
        badgeGroups[BadgeWorkflowStatus.VERIFICATION_FAILED]
    ];


    if (resource && organization) {
        return <div className="container">
            <div className="row">
                <h1>{resource.resource_descriptive_name}</h1>
                <div>
                    By&nbsp;&nbsp;
                    <Link to={`/organizations/${organization.organization_id}`} className="btn btn-link text-dark">
                        {organization.organization_name}
                    </Link>
                </div>
            </div>
            <div className="row pt-5">
                <h2>Overview</h2>
                <div className="row">
                    <div className="col">
                        <label className="text-secondary">Resource Type</label>
                        <div>{resource.cider_type}</div>
                    </div>
                    <div className="col">
                        <label className="text-secondary">Latest Status</label>
                        <div>{resource.latest_status}</div>
                    </div>
                    <div className="col">
                        <label className="text-secondary">Global Resource ID</label>
                        <div>{resource.info_resourceid}</div>
                    </div>
                </div>
            </div>
            {/*<div className="w-100 pt-3 pb-3">*/}
            {/*    <p>{resource.resource_description}</p>*/}
            {/*    /!*<Link to={resource.user_guide_url} className="btn btn-dark">View User Guide</Link>*!/*/}
            {/*</div>*/}
            {/*<div className=" w-100 pt-5 pb-5 text-medium lead fst-italic fs-3">*/}
            {/*    Review the list of badges waiting for completion and start completing tasks to earn badges and track*/}
            {/*    your progress!*/}
            {/*</div>*/}

            <div className="row">
                <h2>Badges</h2>

                <div className="w-100 pt-2 pb-5 row row-cols-3">
                    {badges && badges.map((badge) => {
                        return <div className="w-100 pt-2" key={badge.badge_id}>
                            {getBadgeCard(organization, resource, badge, t)}
                        </div>
                    })}
                    {badges && badges.length === 0 &&
                        <div className="w-100 p-3 text-center lead">
                            No badges available
                        </div>}
                </div>

            </div>


            <div className="w-100 text-end pt-3 pb-5">
                <button className="btn btn-outline-dark m-1">
                    Cancel
                </button>
                <button className="btn btn-dark m-1">
                    Save details
                </button>
            </div>
        </div>
    } else {
        return <LoadingBlock processing={true}/>
    }

}

function getBadgeCard(organization, resource, badge, t) {

    if (organization && resource && badge) {

        return <div className="row rounded-3 border-gray-200 border border-1">
            <div className="col-lg-4 ps-0 d-flex flex-row align-items-center">
                <div
                    className="p-3 h-100 bg-light rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                    role="button">
                    <input className="form-check-input" type="checkbox" id="checkboxNoLabel" role="button" value=""
                           aria-label="..."/>
                </div>
                <div className="mt-3 mb-3 ms-2 me-2 background-image-center-no-repeat badge-icon-small"
                     style={{backgroundImage: `url(${badge.graphic})`}}>
                </div>
                <h4 className="flex-fill p-2 m-0">{badge.name}</h4>
            </div>
            <p className="col-lg-5 pt-2 pb-2 m-0 align-content-center">
                {badge.resource_provider_summary}
            </p>
            <div className="col-lg-3 pt-2 pb-2 align-content-center">
                <Link to={`/resources/${resource.cider_resource_id}/badges/${badge.badge_id}`}
                      className="w-100 btn btn-outline-dark btn-sm">
                    View Additional Badge Details
                </Link>
            </div>
        </div>


        return
        <div className="row p-2">
            <div className="w-100 p-1 badge-card-header">
                <div className="badge-card-header-thumbnail">
                    <div className="background-image-center-no-repeat badge-icon-small"
                         style={{backgroundImage: `url(${badge.graphic})`}}>
                    </div>
                </div>
                <h3 className="w-100">{badge.name}</h3>
            </div>
            <div className="w-100 badge-card-body">
                <p className="w-100">
                    {badge.resource_provider_summary}
                </p>


                <div className="w-100 text-center">
                    <small className={`ps-2 pe-2 pt-1 pb-1 rounded-1 ${t(`badgeWorkflowStatusClass.${badge.status}`)}`}>
                        {badge.status ? t(`badgeWorkflowStatus.${badge.status}`) : "  "}
                    </small>
                </div>
            </div>
            <Link to={`/resources/${resource.cider_resource_id}/badges/${badge.badge_id}`}
                  className="btn btn-secondary w-100">
                View Additional Badge Details
            </Link>
        </div>
    }
}
