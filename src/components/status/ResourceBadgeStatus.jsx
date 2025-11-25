import {useResources} from "../../contexts/ResourcesContext.jsx";
import BadgeStatus from "./BadgeStatus.jsx";

export default function ResourceBadgeStatus({resourceId, roadmapId, badgeId}) {
    const {getResource, getResourceOrganization, getResourceRoadmapBadge} = useResources();

    const badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});

    return <BadgeStatus>{badge.status}</BadgeStatus>
}
