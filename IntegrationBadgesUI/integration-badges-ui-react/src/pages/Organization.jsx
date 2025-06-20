import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ResourceStatus, useResources} from "../contexts/ResourcesContext";

import LoadingBlock from "../components/LoadingBlock";
import ResourceCard from "../components/resource/ResourceCard.jsx";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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

    // If conditions in the order
    let sections = [
        {
            title: "New Integrations",
            description: "Resources described in the CiDeR databased that haven't selected an integration roadmap or badges",
            showContinueSetup: true,
            condition: (resource, resourceRoadmaps) => resourceRoadmaps.length === 0,
            resources: [null],
        },
        {
            title: "In-Progress Integrations",
            description: "Resources that have selected an integration roadmaps and are working on badges but haven't reached their production start date",
            showContinueSetup: false,
            condition: (resource, resourceRoadmaps) => resource.latest_status === ResourceStatus.ANNOUNCEMENT || resource.latest_status === ResourceStatus.PRE_PRODUCTION,
            resources: [],
        },
        {
            title: "Production Integrations",
            description: "Resources that have reached their production start date, that may continue to add or remove badges as appropriate",
            showContinueSetup: false,
            condition: (resource, resourceRoadmaps) => resource.latest_status === ResourceStatus.PRODUCTION,
            resources: [],
        },
        {
            title: "Post-Production Integrations",
            description: "Resources that have passed their production end date, but continue to offer some service and may be partially available for post production use",
            showContinueSetup: false,
            condition: (resource, resourceRoadmaps) => resource.latest_status === ResourceStatus.POST_PRODUCTION,
            resources: [],
        }
    ];

    let resourcesProcessing = true;
    for (let i = 0; i < orgResourceIds.length; i++) {
        let resourceId = orgResourceIds[i];
        let resource = getResource({resourceId});
        let resourceRoadmaps = getResourceRoadmaps({resourceId});


        for (let j = 0; j < sections.length; j++) {
            const section = sections[j];

            if (resource && resourceRoadmaps) {
                resourcesProcessing = false;

                if (hasSearchCriteria(organization, resource, searchText) && section.condition(resource, resourceRoadmaps)) {
                    section.resources.push(resource);
                    break;
                }
            }
        }
    }

    sections = sections.filter(section => section.resources.length > 0);

    if (organization && orgResourceIds && orgResourceIds.length > 0) {
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

                <div className="w-100">
                    {resourcesProcessing && <LoadingBlock/>}

                    {!resourcesProcessing && sections.length === 0 &&
                        <div className="w-100 p-3 text-center lead">
                            There are no resource in this organization
                        </div>}

                    {!resourcesProcessing && sections.map((section, sectionIndex) => {
                        const tooltip = <Tooltip id="tooltip">
                            {section.description}
                        </Tooltip>;

                        return <div className="w-100 pt-5 pb-2" key={sectionIndex}>
                            <div className="w-100 text-start pb-2">
                                <h2 className="d-inline me-4">
                                    {section.title} ({section.resources.filter(r => !!r).length})</h2>
                                <OverlayTrigger overlay={tooltip} placement="right" delayShow={300} delayHide={150}>
                                    <button className="btn btn-link text-yellow d-inline"><i
                                        className="bi bi-question-square-fill"></i></button>
                                </OverlayTrigger>
                            </div>

                            <div className="w-100 row row-cols-lg-3 row-cols-md-2 row-cols-1">
                                {section.resources.map((resource, resourceIndex) => {
                                    return <div className="col p-3" key={resourceIndex}>
                                        <ResourceCard organization={organization} resource={resource}
                                                      inProgress={section.showContinueSetup}/>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
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
