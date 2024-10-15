import CatalogFooter from "../components/resourceCatalog/footerSection/CatalogFooter";
import CatalogSearch from "../components/resourceCatalog/titleSection/CatalogSearch";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import ResourceSection from "../components/resourceCatalog/resourceSection/ResourceSection";
import LoadingPage from "../components/fragments/LoadingPage";
import EmptyPage from "../components/fragments/EmptyPage";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function ResourceCatalog() {
    const {resources} = useResources();
    const [updatedResources, setUpdatedResources] = useState(null);
    const [displayedResources, setDisplayedResources] = useState(null);

    // sort resources by organization name and group them by organization
    useEffect(() => {
        const sortedData = resources.sort((a, b) =>
            a.organization_name.localeCompare(b.organization_name));
        const groupedData = groupByOrganization(sortedData);

        setUpdatedResources(groupedData);
        setDisplayedResources(groupedData);
    }, [resources]);

    // group resources by organization name
    const groupByOrganization = (resources) => {
        const groups = {};
        resources.forEach(resource => {
            const {organization_name} = resource;
            if (!groups[organization_name]) {
                groups[organization_name] = {
                    organization_name,
                    resources: []
                };
            }
            groups[organization_name].resources.push(resource);
        });

        return Object.values(groups);
    }

    return (
        <div className="resource-catalog-wrapper">
            <div>
                <h1 style={{fontWeight: '500'}}>ACCESS Active Resource Catalog</h1>
                <h3 style={{paddingTop: '28px', fontWeight: '800', fontStyle: 'normal'}}>
                    Comprehensive list of all resources integrated within ACCESS.
                </h3>
            </div>
            {(updatedResources && displayedResources) &&
                <CatalogSearch resources={updatedResources} setDisplayedResources={setDisplayedResources}/>
            }
            {(updatedResources && displayedResources) ?
                displayedResources.length === 0 ?
                    <EmptyPage text={"No resources found."}/>
                    : <div className="container-fluid resource-list">
                        {displayedResources.map((institution, index) => (
                            <ResourceSection key={index} institution={institution}/>
                        ))}
                    </div>
                : <LoadingPage/>
            }
            <CatalogFooter/>
        </div>
    );
}