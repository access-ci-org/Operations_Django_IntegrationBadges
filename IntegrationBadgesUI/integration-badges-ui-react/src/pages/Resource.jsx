import {Link, useNavigate, useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {Collapse, Nav} from "react-bootstrap";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";

import LoadingBlock from "../components/LoadingBlock";
import ResourceBadgeCard from "../components/resource/resource-badge/ResourceBadgeCard.jsx";

export default function Resource() {
    const navigate = useNavigate();
    const {resourceId, roadmapId} = useParams();
    const {fetchRoadmap, getRoadmap} = useRoadmaps();
    const {
        fetchResource,
        fetchResourceRoadmapBadges,
        getResource,
        getResourceRoadmapBadges,
        getResourceOrganization
    } = useResources();
    const [activeTabIndex, setActiveTabIndex] = useState(1);

    const resource = getResource({resourceId});
    let organization = getResourceOrganization({resourceId})
    let badges = getResourceRoadmapBadges({resourceId, roadmapId});
    let roadmap = getRoadmap({roadmapId});

    useEffect(() => {
        fetchResource({resourceId});
    }, [resourceId]);

    useEffect(() => {
        resourceId && roadmapId && fetchResourceRoadmapBadges({resourceId, roadmapId});
    }, [resourceId, roadmapId]);

    useEffect(() => {
        if (!!resource && !!resource.roadmaps && !roadmapId) {
            if (resource.roadmaps.length > 0) {
                navigate(`/resources/${resourceId}/roadmaps/${resource.roadmaps[0].roadmap.roadmap_id}`, {replace: true});
            } else {
                navigate(`/resources/${resource.info_resourceid}/edit`, {replace: true})
            }
        }
    }, [resource, roadmapId]);

    useEffect(() => {
        !!roadmapId && fetchRoadmap({roadmapId});
    }, [roadmapId]);


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


    if (resource && roadmap && organization) {
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
                    <div className="col">
                        <label className="text-secondary">Roadmap</label>
                        <div>{roadmap.name}</div>
                    </div>
                </div>
            </div>
            <div className="w-100 pt-3 pb-3">
                <p>{resource.resource_description}</p>
                {/*<Link to={resource.user_guide_url} className="btn btn-dark">View User Guide</Link>*/}
            </div>

            <div className=" w-100 pt-5 pb-5 text-medium lead fst-italic">
                Review the list of badges waiting for completion and start completing tasks to earn badges and track
                your progress!
            </div>

            <div className="row">
                <h2>Badges</h2>
                <Nav variant="underline" defaultActiveKey="1" className="ps-3" onSelect={setActiveTabIndex}>
                    <Nav.Item>
                        <Nav.Link eventKey="0" disabled={tabs[0].length < 1}>
                            Verification Approved ({tabs[0].length})
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="1" disabled={tabs[1].length < 1}>All ({tabs[1].length})</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2" disabled={tabs[2].length < 0}>
                            Verification Pending({tabs[2].length})
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="3" disabled={tabs[3].length < 0}>Verification Failed
                            ({tabs[3].length})
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                {tabs.map((tabBadges, tabIndex) => {
                    return <Collapse in={tabIndex == activeTabIndex} key={tabIndex}>
                        <div className="w-100 pt-2 pb-5 row row-cols-lg-3 row-cols-md-2 row-cols-1">
                            {tabBadges && tabBadges.map((badge) => {
                                return <div className="col p-3" key={badge.badge_id}>
                                    <ResourceBadgeCard resourceId={resourceId} roadmapId={roadmapId} badgeId={badge.badge_id}/>
                                </div>
                            })}
                            {tabBadges && tabBadges.length === 0 &&
                                <div className="w-100 p-3 text-center lead">
                                    No badges available
                                </div>}
                        </div>
                    </Collapse>
                })}

            </div>
        </div>
    } else {
        return <LoadingBlock processing={true}/>
    }

}

