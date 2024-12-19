import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Organization() {
    const {organizationId} = useParams();
    const {organizationMap, fetchOrganization} = useOrganizations();

    useEffect(() => {
        fetchOrganization({organizationId});
    }, [])

    const organization = organizationMap[organizationId];

    return (
        <div className="row">
            Organization by ID
            {(() => {
                if (organization) {
                    return <div className="organization-card w-100 h-100">
                        <div className="w-100 p-3"></div>
                        <div className="w-100 p-5 bg-light" style={{
                            backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "center"
                        }}>
                        </div>
                        <div className="w-100 p-3 text-center">
                            {organization.organization_name}
                        </div>
                    </div>
                }
            })()}
        </div>
    );
}