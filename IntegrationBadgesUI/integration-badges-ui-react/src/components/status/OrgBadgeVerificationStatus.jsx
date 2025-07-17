import {useResources} from "../../contexts/ResourcesContext.jsx";
import Translate from "../../locales/Translate.jsx";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";

export default function OrgBadgeVerificationStatus({organizationName, badgeWorkflowStatus}) {
    const {
        getOrganizationResourceIds,
        getResourceRoadmapBadges
    } = useResources();

    const orgResourceIds = getOrganizationResourceIds({organizationName: organizationName});
    let badgeCount = 0;
    for (const resourceId of orgResourceIds) {
        const resourceBadges = getResourceRoadmapBadges({resourceId});
        badgeCount += resourceBadges.filter(resourceBadge => resourceBadge.status === badgeWorkflowStatus).length;
    }

    const badgeWorkflowStatusClass = {
        "tasks-completed": "bg-light",
        "verification-failed": "bg-danger-subtle"
    };

    return <div className={`m-1 w-100 ps-2 pe-2 pt-1 pb-1 rounded-1 d-flex flex-row ${badgeWorkflowStatusClass[badgeWorkflowStatus]}`}>
        <small className="w-100 text-nowrap flex-fill">
            <Translate>badgeWorkflowVerificationStatus.{badgeWorkflowStatus}</Translate>
        </small>
        <small>{badgeCount}</small>
    </div>
}
