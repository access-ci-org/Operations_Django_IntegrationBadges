import CatalogTitle from "../components/resourceCatalog/titleSection/CatalogTitle";
import {ResourceList} from "../components/resourceCatalog/resourceList/ResourceList";
import CatalogFooter from "../components/resourceCatalog/footerSection/CatalogFooter";
import CatalogSearch from "../components/resourceCatalog/titleSection/CatalogSearch";
import {useBadges} from "../contexts/BadgeContext";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";

export default function ResourceCatalog() {
    const {badges} = useBadges();
    const {resources} = useResources();
    const [updatedResources, setUpdatedResources] = useState([]);

    useEffect(() => {
        const sortedData = resources.sort((a, b) =>
            a.organization_name.localeCompare(b.organization_name));
        const groupedData = groupByOrganization(sortedData);

        setUpdatedResources(groupedData);
    }, [resources]);

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
            <CatalogTitle/>
            <CatalogSearch/>
            {(badges && updatedResources) ?
                <ResourceList resources={updatedResources}/>
                : <div>Loading...</div>
            }
            <CatalogFooter/>
        </div>
    );
}