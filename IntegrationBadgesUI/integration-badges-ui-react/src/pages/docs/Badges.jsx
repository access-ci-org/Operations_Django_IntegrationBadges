import {BadgeWorkflowStatus, useBadges} from "../../contexts/BadgeContext.jsx";
import {Link} from "react-router-dom";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useEffect, useState} from "react";
import {Collapse, Nav} from "react-bootstrap";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";

export default function Badges() {
    const {fetchResourceRoadmapBadges, getResourceRoadmapBadges} = useResources();
    const {getResource} = useResources();
    const {getRoadmap} = useRoadmaps();
    const {getBadge} = useBadges();

    const [activeTabIndex, setActiveTabIndex] = useState(2);

    useEffect(() => {
        fetchResourceRoadmapBadges();
    }, []);

    const badges = getResourceRoadmapBadges();

    const tabs = [
        BadgeWorkflowStatus.NOT_PLANNED,
        BadgeWorkflowStatus.PLANNED,
        BadgeWorkflowStatus.TASK_COMPLETED,
        BadgeWorkflowStatus.VERIFIED,
        BadgeWorkflowStatus.VERIFICATION_FAILED,
        BadgeWorkflowStatus.DEPRECATED,
    ]
    const tabBadgesMap = {};
    for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        tabBadgesMap[tabs[tabIndex]] = [];
    }

    for (let i = 0; i < badges.length; i++) {
        if (!tabBadgesMap[badges[i].status]) {
            tabBadgesMap[badges[i].status] = [];
        }

        tabBadgesMap[badges[i].status].push(badges[i]);
    }

    return <div className="container">
        <div className="row pt-5">
            <h2>Badges Verification Status for Badge Owners and Concierge</h2>
            <div className="w-100 pt-2 pb-5">
                <Nav variant="underline" defaultActiveKey="2" className="ps-3" onSelect={setActiveTabIndex}>
                    {tabs.map((tabBadgeStatus, tabIndex) => <Nav.Item key={tabIndex}>
                        <Nav.Link eventKey={tabIndex}>
                            {tabBadgeStatus} ({tabBadgesMap[tabBadgeStatus].length})
                        </Nav.Link>
                    </Nav.Item>)}
                </Nav>

                {tabs.map((tabBadgeStatus, tabIndex) => {
                    const tabBadges = tabBadgesMap[tabBadgeStatus];

                    return <Collapse in={tabIndex == activeTabIndex} key={tabIndex}>
                        <div className="w-100 pt-2 pb-5 row">
                            {tabBadges && tabBadges.length !== 0 &&
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Resource</th>
                                        <th scope="col">Roadmap</th>
                                        <th scope="col">Badge</th>
                                        <th scope="col">Last Updated</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tabBadges && tabBadges.map((resourceBadge, badgeIndex) => {
                                        const resource = getResource({resourceId: resourceBadge.info_resourceid});
                                        const roadmap = getRoadmap({roadmapId: resourceBadge.roadmap_id});
                                        const badge = getBadge({badgeId: resourceBadge.badge_id});
                                        const lastUpdatedAt = new Date(Date.parse(resourceBadge.status_updated_at));
                                        const lastUpdatedBy = resourceBadge.status_updated_by;

                                        if (resource && roadmap && badge) {
                                            return <tr key={badgeIndex}>
                                                <th scope="row">{badgeIndex + 1}</th>
                                                <td>{resource.resource_descriptive_name}</td>
                                                <td>{roadmap.name}</td>
                                                <td>{badge.name}</td>
                                                <td>
                                                    {lastUpdatedAt.toLocaleString()}
                                                    {!lastUpdatedBy || lastUpdatedBy === "" ? "" : ` by ${lastUpdatedBy}`}
                                                </td>
                                                <td>
                                                    <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmap.roadmap_id}/badges/${badge.badge_id}`}>View more</Link>
                                                </td>
                                            </tr>
                                        }
                                    })}
                                    </tbody>
                                </table>}

                            {tabBadges && tabBadges.length === 0 &&
                                <div className="w-100 p-3 text-center lead">
                                    No badges available
                                </div>}
                        </div>
                    </Collapse>
                })}
            </div>
        </div>
    </div>
}
