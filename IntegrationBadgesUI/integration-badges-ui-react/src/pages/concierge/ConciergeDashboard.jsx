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

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary();

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

    console.log("##### resourceRoadmapBadgeStatusSummary: ", resourceRoadmapBadgeStatusSummary)

    if (resourceRoadmapBadgeStatusSummary) {
        return <div className="container">
            <div className="row">
                <h1>Concierge Dashboard</h1>
                <ul>
                    {visibleStatusList.map((status) => (<li key={status} className="d-flex flex-row p-2 border-bottom" style={{width: "300px"}}>
                        <div className="flex-fill"><Translate>badgeWorkflowStatus.{status}</Translate></div>
                        <Link to={`/concierge/badge-status/?badgeWorkflowStatus=${status}`} className="btn btn-sm btn-dark rounded-2">
                            {resourceRoadmapBadgeStatusSummary[status] ? resourceRoadmapBadgeStatusSummary[status] : 0}
                        </Link>
                    </li>))}
                </ul>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
