import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import Translate from "../locales/Translate.jsx";
import ResourceBadgeCardV2 from "../components/resource/resource-badge/ResourceBadgeCardV2.jsx";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function OrganizationBadgeReview() {
    const {organizationId, badgeWorkflowStatus, badgeStatus} = useParams();
    const {organizationMap, fetchOrganization} = useOrganizations();
    const {
        fetchResources, fetchResourceRoadmapBadges,
        getResources, getResourceRoadmapBadges
    } = useResources();

    const organization = organizationMap[organizationId];

    useEffect(() => {
        fetchOrganization({organizationId});
        fetchResourceRoadmapBadges({organizationId, badgeWorkflowStatus});
    }, [organizationId]);

    const resourceBadges = getResourceRoadmapBadges({organizationId, badgeWorkflowStatus});

    if (organization && resourceBadges) {
        return <div className="container">
            <div className="row">
                <h1><Translate>badgeWorkflowVerificationStatus.{badgeWorkflowStatus}</Translate></h1>
            </div>
            <div className="w-100 d-flex flex-row pb-3 pt-3">
                <div className="bg-warning bg-opacity-25 p-2 pt-3 rounded-start-2">
                    <i className="bi bi-info-circle"></i>
                </div>
                <div className="flex-fill bg-warning rounded-end-2 p-3 bg-opacity-10">
                    <h3>COMMENTS:</h3>
                    <p>
                        These badges were returned with feedback. Please click and “view details” for each and revise
                        the highlighted tasks and resubmit for validation.
                    </p>
                </div>
            </div>
            <div className="row">
                {resourceBadges.map((resourceBadge, resourceBadgeIndex) => <div key={resourceBadgeIndex} className="w-100 p-3">
                    <ResourceBadgeCardV2 resourceId={resourceBadge.info_resourceid}
                                         roadmapId={resourceBadge.roadmap_id} badgeId={resourceBadge.badge_id}/>
                </div>)}
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
