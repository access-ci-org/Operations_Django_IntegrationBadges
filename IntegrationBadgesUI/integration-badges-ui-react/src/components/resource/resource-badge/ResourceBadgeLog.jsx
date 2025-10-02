import {useResources} from "../../../contexts/ResourcesContext.jsx";
import {useEffect} from "react";

export default function ResourceBadgeLog({resourceId, roadmapId, badgeId}) {
    const {
        fetchResourceRoadmapBadgeLogs,
        getResourceRoadmapBadgeLogs
    } = useResources();

    let logs = getResourceRoadmapBadgeLogs({resourceId, roadmapId, badgeId});

    useEffect(() => {
        fetchResourceRoadmapBadgeLogs({resourceId, roadmapId, badgeId});
    }, [resourceId, badgeId]);

    return <div className="w-100">
        <div className="row">
            <div className="col fw-bold">Ref</div>
            <div className="col fw-bold">Status</div>
            <div className="col fw-bold">Comment</div>
            <div className="col fw-bold">Time stamp and user</div>
        </div>
        {logs && logs.map((log, logIndex) => {
            const logId = log.id;
            const comment = log.comment;
            const status = log.status;
            const lastUpdatedAt = new Date(Date.parse(log.status_updated_at));
            const lastUpdatedBy = log.status_updated_by;

            return <div className="row border-bottom" key={logIndex}>
                <div className="col">{logId}</div>
                <div className="col">{status}</div>
                <div className="col pre-wrap-text">{comment}</div>
                <div className="col">{lastUpdatedAt.toLocaleString()} by {lastUpdatedBy}</div>
            </div>
        })}
    </div>
}