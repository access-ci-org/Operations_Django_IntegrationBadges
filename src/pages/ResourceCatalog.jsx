import CatalogTitle from "../components/resourceCatalog/titleSection/CatalogTitle";
import {ResourceList} from "../components/resourceCatalog/resourceList/ResourceList";
import CatalogFooter from "../components/resourceCatalog/footerSection/CatalogFooter";
import CatalogSearch from "../components/resourceCatalog/titleSection/CatalogSearch";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ResourceCatalog() {
    const [resources, setResources] = useState(null);
    const [badges, setBadges] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('/resources');
                const sortedData = response.data.results.sort((a, b) =>
                    a.organization_name.localeCompare(b.organization_name));
                const groupedData = groupByOrganization(sortedData);
                setResources(groupedData);
                return groupedData;
            } catch (error) {
                console.error('Error fetching resources:', error);
                return error;
            }
        };

        const fetchBadges = async () => {
            try {
                const response = await axios.get('/badge');
                setBadges(response.data.results);
                return response.data.results;
            } catch (error) {
                console.error('Error fetching badges:', error);
                return error;
            }
        };

        fetchResources().then(r => {
            if (r instanceof Error) {
                console.log('Failed to fetch resources:', r);
            } else {
                console.log('Resources fetched:', r);
            }
        });

        fetchBadges().then(r => {
            if (r instanceof Error) {
                console.log('Failed to fetch badges:', r);
            } else {
                console.log('Badges fetched:', r);
            }
        });
    }, []);

    const groupByOrganization = (resources) => {
        const groups = {};
        resources.forEach(resource => {
            const { organization_name } = resource;
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

    if (!resources || !badges) {
        return <div>Loading...</div>;
    }

    return (
        <div className="resource-catalog-wrapper">
            <CatalogTitle />
            <CatalogSearch />
            <ResourceList resources={resources} badges={badges}/>
            <CatalogFooter />
        </div>
    );
}