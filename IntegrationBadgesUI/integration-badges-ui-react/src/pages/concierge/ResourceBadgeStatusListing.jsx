import {useEffect} from "react";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link, useLocation} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import BadgeStatus from "../../components/status/BadgeStatus.jsx";

export default function ResourceBadgeStatusListing() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const badgeWorkflowStatus = queryParams.get('badgeWorkflowStatus');

    const {
        fetchResourceRoadmapBadges,
        getResourceRoadmapBadges, getResource
    } = useResources();
    const {getBadge} = useBadges();
    const {getRoadmap} = useRoadmaps();

    const resourceRoadmapBadges = getResourceRoadmapBadges({badgeWorkflowStatus});

    useEffect(() => {
        fetchResourceRoadmapBadges({badgeWorkflowStatus});
    }, [badgeWorkflowStatus])

    if (resourceRoadmapBadges) {
        return <div className="container">
            <div className="row">
                <h1>Resource Roadmap Badge Status</h1>
                <p>View All Badges Marked as <BadgeStatus>{badgeWorkflowStatus}</BadgeStatus></p>
            </div>

            <div className="row pt-3">
                <div className="col-md-6 d-flex">
                    {/*<div className="p-1">*/}
                    {/*    <h2>Projects</h2>*/}
                    {/*</div>*/}
                    <div className="flex-fill p-1">
                        <input className="form-control" type="text"
                               placeholder="Type in a Badge or a Resource Name to Search..."
                               aria-label="Type in a Badge or a Resource Name to Search..." onChange={(e) => null}/>
                    </div>
                </div>

                <div className="col-md-6 d-flex">
                    <div className="flex-fill"></div>
                    <div className="p-1">
                        <button type="button" className="btn btn-light">
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    <div className="p-1">
                        <button type="button" className="btn btn-dark">
                            <i className="bi bi-grid-3x3-gap-fill"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row pt-4">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Resource</th>
                        <th scope="col">Roadmap</th>
                        <th scope="col">Badge</th>
                        <th scope="col">Last Updated</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resourceRoadmapBadges.map((resourceRoadmapBadge, resourceRoadmapBadgeIndex) => {
                        const resourceId = resourceRoadmapBadge.info_resourceid;
                        const roadmapId = resourceRoadmapBadge.roadmap_id;
                        const badgeId = resourceRoadmapBadge.badge_id;

                        const resource = getResource({resourceId});
                        const roadmap = getRoadmap({roadmapId});
                        const badge = getBadge({badgeId});

                        const lastUpdatedAt = new Date(Date.parse(resourceRoadmapBadge.status_updated_at));
                        const lastUpdatedBy = resourceRoadmapBadge.status_updated_by;

                        return <tr key={resourceRoadmapBadgeIndex}>
                            <th scope="row">{resourceRoadmapBadgeIndex + 1}</th>
                            <td>
                                {resource && <OverlayTrigger placement="bottom" delayShow={300} delayHide={150}
                                                             overlay={<Tooltip id="tooltip-tasks">
                                                                 {resource.resource_descriptive_name}
                                                             </Tooltip>}>
                                    <div className="text-truncate" style={{maxWidth: 200}}>
                                        {resource.resource_descriptive_name}</div>
                                </OverlayTrigger>}
                            </td>
                            <td>
                                <div className="text-truncate" style={{maxWidth: 200}}>{roadmap.name}</div>
                            </td>
                            <td>
                                <div className="text-truncate" style={{maxWidth: 200}}>{badge.name}</div>
                            </td>
                            <td><small>{lastUpdatedAt.toLocaleString()}</small></td>
                            <td>{resourceRoadmapBadge.status}</td>
                            <td>
                                <Link
                                    to={`/resources/${resourceId}/roadmaps/${roadmapId}/badges/${badgeId}?concierge=true`}
                                    className="btn btn-link" target="_blank">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
