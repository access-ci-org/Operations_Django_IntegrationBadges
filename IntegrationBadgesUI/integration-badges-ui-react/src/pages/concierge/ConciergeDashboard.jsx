import {useEffect} from "react";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import LoadingBlock from "../../components/LoadingBlock.jsx";
import {BadgeWorkflowStatus, useBadges} from "../../contexts/BadgeContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link, useLocation} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import BadgeStatus from "../../components/status/BadgeStatus.jsx";
import Translate from "../../locales/Translate.jsx";

export default function ConciergeDashboard() {
    const {
        fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadgeStatusSummary
    } = useResources();
    const {getRoadmaps} = useRoadmaps();
    const {getBadges} = useBadges();

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();
    const roadmaps = getRoadmaps();
    const badges = getBadges();

    useEffect(() => {
        fetchResourceRoadmapBadgeStatusSummary();
    }, []);

    const visibleStatusList = [
        BadgeWorkflowStatus.NOT_PLANNED,
        BadgeWorkflowStatus.PLANNED,
        BadgeWorkflowStatus.TASK_COMPLETED,
        BadgeWorkflowStatus.VERIFIED,
        BadgeWorkflowStatus.VERIFICATION_FAILED,
        BadgeWorkflowStatus.DEPRECATED
    ]

    if (resourceRoadmapBadgeStatusSummary) {
        return <div className="container">
            <div className="row">
                <h1>Concierge Dashboard</h1>
            </div>
            <div className="row">
                <div className="w-100">
                    <h2>Roadmaps</h2>
                </div>
                {roadmaps && roadmaps.map((roadmap, roadmapIndex) => <div className="col p-2" key={roadmapIndex}>
                    <div className="bg-light">
                        {roadmap.name}
                    </div>
                </div>)}
            </div>

            <div className="row">
                <div className="col-md-8 col-sm-6">
                    <div className="w-100">
                        <h2>Badges</h2>
                    </div>
                    {badges && badges.map((badge, badgeIndex) => <div className="w-100 p-2" key={badgeIndex}>
                        <div className="bg-light">
                            {badge.name}
                        </div>
                    </div>)}
                </div>

                <div className="col-md-4 col-sm-6">
                    <div className="w-100">
                        <h2>Concierge Dashboard</h2>
                    </div>
                    <ul>
                        {visibleStatusList.map((status) => (
                            <li key={status} className="d-flex flex-row p-2 border-bottom" style={{width: "300px"}}>
                                <div className="flex-fill"><Translate>badgeWorkflowStatus.{status}</Translate></div>
                                <Link to={`/concierge/badge-status/?badgeWorkflowStatus=${status}`}
                                      className="btn btn-sm btn-dark rounded-2">
                                    {resourceRoadmapBadgeStatusSummary[status] ? resourceRoadmapBadgeStatusSummary[status] : 0}
                                </Link>
                            </li>))}
                    </ul>
                </div>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
