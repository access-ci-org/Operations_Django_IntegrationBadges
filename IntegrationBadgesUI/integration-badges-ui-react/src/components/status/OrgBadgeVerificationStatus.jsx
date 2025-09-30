import {useResources} from "../../contexts/ResourcesContext.jsx";
import Translate from "../../locales/Translate.jsx";
import {useOrganizations} from "../../contexts/OrganizationsContext.jsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function OrgBadgeVerificationStatus({organizationId, badgeWorkflowStatus}) {
    const {
        fetchResourceRoadmapBadgeStatusSummary,
        getResourceRoadmapBadgeStatusSummary
    } = useResources();

    const resourceRoadmapBadgeStatusSummary = getResourceRoadmapBadgeStatusSummary({organizationId});

    useEffect(() => {
        fetchResourceRoadmapBadgeStatusSummary({organizationId});
    }, []);

    let badgeCount = 0;
    if (resourceRoadmapBadgeStatusSummary) {
        badgeCount = resourceRoadmapBadgeStatusSummary[badgeWorkflowStatus] || 0;
    }

    const badgeWorkflowStatusClass = {
        "tasks-completed": "bg-light",
        "verification-failed": "bg-danger-subtle"
    };

    return <Link to={`/organizations/${organizationId}/badge-review/${badgeWorkflowStatus}`} style={{fontWeight:400}}
                 className={`btn btn-link text-decoration-none m-1 w-100 ps-2 pe-2 pt-1 pb-1 rounded-1 d-flex flex-row ${badgeWorkflowStatusClass[badgeWorkflowStatus]}`}>
        <small className="w-100 text-nowrap flex-fill">
            <Translate>badgeWorkflowVerificationStatus.{badgeWorkflowStatus}</Translate>
        </small>
        <small>{badgeCount}</small>
    </Link>
}
