import {useResources} from "../../../contexts/ResourcesContext.jsx";
import {Link, useParams} from "react-router-dom";
import ResourceBadgeStatus from "../../status/ResourceBadgeStatus.jsx";
import ResourceBadgeIcon from "./ResourceBadgeIcon.jsx";
import {BadgeWorkflowStatus, useBadges} from "../../../contexts/BadgeContext.jsx";
import {useTasks} from "../../../contexts/TaskContext.jsx";
import {useEffect, useState} from "react";

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
        {logs && logs.map((log, logIndex) => {
            const logId = log.id;
            const comment = log.comment;
            const status = log.status;
            const lastUpdatedAt = new Date(Date.parse(log.status_updated_at));
            const lastUpdatedBy = log.status_updated_by;

            return <div className="row" key={logIndex}>
                <div className="col">{logId}</div>
                <div className="col">{status}</div>
                <div className="col pre-wrap-text">{comment}</div>
                <div className="col">{lastUpdatedAt.toLocaleString()} by {lastUpdatedBy}</div>
            </div>
        })}
    </div>
}