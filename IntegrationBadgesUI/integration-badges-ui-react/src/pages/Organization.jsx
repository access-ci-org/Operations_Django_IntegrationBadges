import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";

import LoadingBlock from "../components/LoadingBlock";
import ResourceCard from "../components/resource/ResourceCard.jsx";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Organization() {
    const {organizationId} = useParams();
    const {organizationMap, fetchOrganization} = useOrganizations();
    const {
        fetchSelectedResources,
        getResource, getResourceRoadmaps, getOrganizationResourceIds
    } = useResources();

    const [searchText, setSearchText] = useState("");
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

            fetchSelectedResources({resourceIds});
            setResourceFetchedMap({
                ...resourceFetchedMap,
                ..._resourceFetchedMap
            })
        }
    }, [orgResourceIds.length])

    if (organization) {
        let newIntegrations = [];
        let inProgressIntegrations = [];
        let productionIntegrations = [];
        let postProductionIntegrations = [];

        let inProgressResources = []
        let establishedResources = []
        let processing = false;

        if (orgResourceIds && orgResourceIds.length > 0) {
            for (let i = 0; i < orgResourceIds.length; i++) {
                let resourceId = orgResourceIds[i];
                let resource = getResource({resourceId})
                let resourceRoadmaps = getResourceRoadmaps({resourceId})

                if (resource && resourceRoadmaps && resourceRoadmaps.length > 0) {
                    if (hasSearchCriteria(organization, resource, searchText)) {
                        establishedResources.push(resource);
                    }
                } else if (resource && resourceRoadmaps) {
                    if (hasSearchCriteria(organization, resource, searchText)) {
                        inProgressResources.push(resource);
                    }
                } else {
                    processing = true;
                }
            }
        } else {
            processing = true;
        }

        return <div className="container">
            <div className="row">
                <div className="col-sm-2 col-m-3 col-sm-4 bg-white" style={{
                    backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    height: "200px"
                }}>
                </div>
                <h1 className="col" style={{
                    margin: "0px",
                    lineHeight: "200px"
                }}>
                    {organization.organization_name}
                </h1>
                <div className="col-12">
                    <div className="input-group mb-3 search-input">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input type="text" className="form-control"
                               placeholder="Search Resource by Name, Type, ResourceBadge, etc"
                               aria-label="Search keywords" onChange={(e) => setSearchText(e.target.value)}/>
                    </div>
                </div>

                <div className="container">
                    <LoadingBlock processing={processing} className="pt-4 pb-5">
                        <div className="col-12 pt-4">
                            <h2>In Progress</h2>
                            {inProgressResources && inProgressResources.length === 0 &&
                                <div className="w-100 p-3 text-center lead">
                                    There are no resource waiting to be integrated
                                </div>}
                            <div className="w-100 row row-cols-lg-3 row-cols-md-2 row-cols-1">
                                {inProgressResources.map((resource, resourceIndex) => {
                                    return <div className="col p-3" key={resourceIndex}>
                                        <ResourceCard organization={organization} resource={resource}
                                                      inProgress={true}/>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="col-12 pt-4">
                            <h2>Current Integrations</h2>

                            {establishedResources && establishedResources.length === 0 &&
                                <div className="w-100 p-3 text-center lead">
                                    There are no resources integrated
                                </div>}
                            <div className="w-100 row row-cols-lg-3 row-cols-md-2 row-cols-1">
                                {establishedResources.map((resource, resourceIndex) => {
                                    return <div className="col p-3" key={resourceIndex}>
                                        <ResourceCard organization={organization} resource={resource}/>
                                    </div>
                                })}
                            </div>
                        </div>
                    </LoadingBlock>
                </div>
            </div>
        </div>

    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}

function hasSearchCriteria(organization, resource, searchText) {
    searchText = searchText.toLowerCase();

    let answer = false;

    if (resource) {
        // Resource name
        answer = answer || resource.resource_descriptive_name.toLowerCase().indexOf(searchText) >= 0;

        // Resource Description
        answer = answer || (resource.resource_description && resource.resource_description.toLowerCase().indexOf(searchText) >= 0);

        // Resource type
        answer = answer || resource.cider_type.toLowerCase().indexOf(searchText) >= 0;
    }

    return answer;
}
