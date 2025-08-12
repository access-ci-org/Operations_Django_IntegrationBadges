import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import LoadingBlock from "../components/LoadingBlock";
import Translate from "../locales/Translate.jsx";
import {Badge} from "react-bootstrap";
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
        fetchSelectedResources, fetchResourceRoadmapBadges,
        getOrganizationResourceIds, getResourceRoadmapBadges
    } = useResources();

    const [resourceFetchedMap, setResourceFetchedMap] = useState({});

    const organization = organizationMap[organizationId];
    const orgResourceIds = getOrganizationResourceIds({organizationName: organization.organization_name});

    useEffect(() => {
        fetchOrganization({organizationId});
    }, [organizationId]);

    useEffect(() => {
        if (orgResourceIds) {
            const _resourceFetchedMap = {};
            const resourceIds = [];
            for (let i = 0; i < orgResourceIds.length; i++) {
                const resourceId = orgResourceIds[i];
                if (!resourceFetchedMap[resourceId]) {
                    _resourceFetchedMap[resourceId] = true
                    resourceIds.push(resourceId);
                }
            }

            fetchResourceRoadmapBadges({resourceIds});
            fetchSelectedResources({resourceIds});
            setResourceFetchedMap({
                ...resourceFetchedMap,
                ..._resourceFetchedMap
            })
        }
    }, [orgResourceIds.length]);

    let filteredResourceBadges = [];
    for (const resourceId of orgResourceIds) {
        const resourceBadges = getResourceRoadmapBadges({resourceId});
        for (const resourceBadge of resourceBadges) {
            if (resourceBadge.status === badgeWorkflowStatus) {
                filteredResourceBadges.push(resourceBadge);
            }
        }
    }
    console.log("###### filteredResourceBadges : ", filteredResourceBadges)

    const badgeCount = filteredResourceBadges.length;

    const badgeWorkflowStatusClass = {
        "tasks-completed": "bg-light",
        "verification-failed": "bg-danger-subtle"
    };

    if (organization && orgResourceIds && orgResourceIds.length > 0) {
        return <div className="container">
            <div className="row">
                <h1><Translate>badgeWorkflowVerificationStatus.{badgeWorkflowStatus}</Translate></h1>
            </div>
            <div className="w-100 d-flex flex-row">
                <div className="bg-warning-subtle ps-4"></div>
                <div className="flex-fill bg-warning-subtle rounded-2 p-3 bg-opacity-50">
                    <h3>COMMENTS:</h3>
                    <p>
                        These badges were returned with feedback. Please click and “view details” for each and revise
                        the highlighted tasks and resubmit for validation.
                    </p>
                </div>
            </div>
            <div className="row">
                {filteredResourceBadges.map(resourceBadge => <div className="w-100 p-3">
                    <ResourceBadgeCardV2 resourceId={resourceBadge.info_resourceid} roadmapId={resourceBadge.roadmap_id}
                                         badgeId={resourceBadge.badge_id}/>
                </div>)}
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
