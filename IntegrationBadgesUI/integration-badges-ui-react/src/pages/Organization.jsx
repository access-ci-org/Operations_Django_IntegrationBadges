import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";

import {useBadges} from "../contexts/BadgeContext";
import LoadingBlock from "../components/LoadingBlock";
import ResourceCard from "../components/resource/ResourceCard.jsx";

const filters = ["All Resources", "In Progress", "Complete - Active Integration", "Pending Verification",
    "Verification Failed"];


/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Organization() {
    const {organizationId} = useParams();
    const {organizationMap, fetchOrganization} = useOrganizations();
    const {
        resources,
        resourceMap,
        fetchResources,
        fetchSelectedResources,
        getResource,
        getOrganizationResourceIds
    } = useResources();
    const {fetchBadges} = useBadges();

    const [searchText, setSearchText] = useState("");
    const [searchFilter, setSearchFilter] = useState({});
    const [resourceIds, setResourceIds] = useState([]);

    const organization = organizationMap[organizationId];

    useEffect(() => {
        // fetchBadges();
        // fetchResources();
        fetchOrganization({organizationId});
    }, [organizationId]);

    useEffect(() => {
        if (organization && resources) {
            setResourceIds(getOrganizationResourceIds({organizationName: organization.organization_name}));
        }
    }, [organization, resources]);

    useEffect(() => {
        if (resourceIds) {
            fetchSelectedResources({resourceIds});
        }
    }, [resourceIds])

    if (organization) {
        let inProgressResources = []
        let establishedResources = []
        let processing = false;

        if (resourceIds && resourceIds.length > 0) {
            for (let i = 0; i < resourceIds.length; i++) {
                let resourceId = resourceIds[i];
                let resource = getResource({resourceId})

                if (resource.roadmaps && resource.roadmaps.length > 0) {
                    if (hasSearchCriteria(organization, resource, searchText)) {
                        establishedResources.push(resource);
                    }
                } else if (resource.roadmaps) {
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
                {/*<div className="w-12">*/}
                {/*    Filters :*/}
                {/*    {filters.map((filter, filterIndex) => {*/}
                {/*        let badgeClassName = "badge rounded-pill";*/}
                {/*        if (!searchFilter[filter]) {*/}
                {/*            badgeClassName += " bg-light text-dark";*/}
                {/*        } else {*/}
                {/*            badgeClassName += " text-light bg-dark";*/}
                {/*        }*/}
                {/*        return <a key={filterIndex} className={badgeClassName}>{filter}</a>*/}
                {/*    })}*/}
                {/*</div>*/}

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
                                        <ResourceCard organization={organization} resource={resource} inProgress={true}/>
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
