import {useResources} from "../../contexts/ResourcesContext.jsx";
import Translate from "../../locales/Translate.jsx";

export default function ResourceBadgeStatus({resourceId, roadmapId, badgeId}) {
    const {getResource, getResourceOrganization, getResourceRoadmapBadge} = useResources();

    const badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});

    const badgeWorkflowStatusClass = {
        "undefined": "",
        "not-planned": "",
        "planned": "bg-warning-subtle",
        "task-completed": "bg-warning-subtle",
        "verification-failed": "bg-danger-subtle",
        "verified": "bg-light",
        "deprecated": "bg-secondary-subtle"
    };

    return <small className={`ps-2 pe-2 pt-1 pb-1 rounded-1 ${badgeWorkflowStatusClass[badge.status]}`}>
        <Translate>badgeWorkflowStatus.{badge.status}</Translate>
    </small>
}
