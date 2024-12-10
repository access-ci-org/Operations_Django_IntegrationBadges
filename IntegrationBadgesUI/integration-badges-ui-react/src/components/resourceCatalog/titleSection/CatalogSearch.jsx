import React, {useCallback, useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import DropDownFilter from "./DropDownFilter";
import {useBadges} from "../../../contexts/BadgeContext";

// The status of resources (active or upcoming), currently not used
const resourceStatus = ["All Resources", "Active Resources", "Upcoming Resources"];

/**
 * The search section of the resource catalog. The user may type in a search term or filter
 * resources using the dropdowns. Currently, the dropdown options are NOT changed dynamically
 * when a search term is inputted.
 * @param {ResourceList} resources - The list of resources grouped by organization.
 * @param {Function} setDisplayedResources - The function to set the displayed resources after filtering.
 */
export default function CatalogSearch({resources, setDisplayedResources}) {
    const {badges} = useBadges();
    // status of resources (active or upcoming)
    const [selectedStatus, setSelectedStatus] = useState(resourceStatus[0]);
    // types of resources
    const [selectedType, setSelectedType] = useState("All Types");
    const [resourceTypes, setResourceTypes] = useState(["All Types"]);
    // organizations
    const [selectedOrganization, setSelectedOrganization] = useState("All Organizations");
    const [resourceOrganizations, setResourceOrganizations] = useState(["All Organizations"]);
    // badges
    const [selectedBadge, setSelectedBadge] = useState("All Badges");
    const [badgeOptions, setBadgeOptions] = useState(["All Badges"]);

    useEffect(() => {
        // Populate resourceOrganizations with the names of institutions from resources
        const organizations = ["All Organizations", ...resources.map(institution => institution.organization_name)];
        setResourceOrganizations(organizations);
    }, [resources]);

    useEffect(() => {
        // Populate badgeOptions with the list of badges
        const badgeNames = ["All Badges", ...badges.map(badge => badge.name)];
        setBadgeOptions(badgeNames);
    }, [badges]);

    useEffect(() => {
        // Populate resourceTypes with the types of resources
        const typesSet = new Set();
        resources.forEach(institution => {
            institution.resources.forEach(resource => {
                typesSet.add(resource.cider_type);
            });
        });
        const typesArray = ["All Types", ...Array.from(typesSet)];
        setResourceTypes(typesArray);
    }, [resources]);

    const getBadgeName = useCallback((badge_id) => {
        const badge = badges.find(b => b.badge_id === badge_id);
        return badge ? badge.name : "";
    }, [badges]);

    const filterResources = useCallback((resources, filters) => {
        const { organization, type, badge, searchTerm } = filters;
        const searchTermLower = searchTerm.toLowerCase();

        let filteredResources = resources;

        if (organization !== "All Organizations") {
            filteredResources = filteredResources.filter(institution =>
                institution.organization_name === organization
            );
        }

        if (type !== "All Types") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.cider_type.toLowerCase() === type.toLowerCase())
            })).filter(institution => institution.resources.length > 0);
        }

        if (badge !== "All Badges") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.badges.some(badgeItem => getBadgeName(badgeItem.badge_id) === badge)
                )
            })).filter(institution => institution.resources.length > 0);
        }

        if (searchTerm.trim() !== "") {
            filteredResources = filteredResources.reduce((acc, institution) => {
                const institutionMatch = institution.organization_name.toLowerCase().includes(searchTermLower);
                const typeMatch = institution.resources.some(resource =>
                    resource.cider_type.toLowerCase().includes(searchTermLower)
                );
                const badgeMatch = institution.resources.some(resource =>
                    resource.badges.some(badge => getBadgeName(badge.badge_id).toLowerCase().includes(searchTermLower))
                );
                const filteredResources = institution.resources.filter(resource =>
                    resource.resource_descriptive_name.toLowerCase().includes(searchTermLower)
                );

                if (institutionMatch) {
                    acc.push({
                        ...institution,
                        resources: filteredResources.length > 0 ? filteredResources : institution.resources
                    });
                } else if (typeMatch) {
                    acc.push({
                        ...institution,
                        resources: institution.resources.filter(resource =>
                            resource.cider_type.toLowerCase().includes(searchTermLower)
                        )
                    });
                } else if (badgeMatch) {
                    acc.push({
                        ...institution,
                        resources: institution.resources.filter(resource =>
                            resource.badges.some(badge => getBadgeName(badge.badge_id).toLowerCase().includes(searchTermLower))
                        )
                    });
                } else if (filteredResources.length > 0) {
                    acc.push({
                        ...institution,
                        resources: filteredResources
                    });
                }

                return acc;
            }, []);
        }

        return filteredResources;
    }, [getBadgeName]);

    const handleSearch = useCallback((searchTerm) => {
        const filters = {
            organization: selectedOrganization,
            type: selectedType,
            badge: selectedBadge,
            searchTerm,
        };

        const filteredResources = filterResources(resources, filters);
        setDisplayedResources(filteredResources);
    }, [selectedOrganization, selectedType, selectedBadge, filterResources, resources, setDisplayedResources]);

    const handleOrganizationChange = useCallback((organization) => {
        setSelectedOrganization(organization);
        const filters = {
            organization,
            type: selectedType,
            badge: selectedBadge,
            searchTerm: "",
        };

        const filteredResources = filterResources(resources, filters);
        setDisplayedResources(filteredResources);
    }, [selectedType, selectedBadge, filterResources, resources, setDisplayedResources]);

    const handleTypeChange = useCallback((type) => {
        setSelectedType(type);
        const filters = {
            organization: selectedOrganization,
            type,
            badge: selectedBadge,
            searchTerm: "",
        };

        const filteredResources = filterResources(resources, filters);
        setDisplayedResources(filteredResources);
    }, [selectedOrganization, selectedBadge, filterResources, resources, setDisplayedResources]);

    const handleBadgeChange = useCallback((badge) => {
        setSelectedBadge(badge);
        const filters = {
            organization: selectedOrganization,
            type: selectedType,
            badge,
            searchTerm: "",
        };

        const filteredResources = filterResources(resources, filters);
        setDisplayedResources(filteredResources);
    }, [selectedOrganization, selectedType, filterResources, resources, setDisplayedResources]);

    return (
        <div className="search-section-wrapper">
            <SearchBar onSearch={handleSearch}/>
            <div className="filter-section">
                <p>Filters</p>
                <DropDownFilter data={resourceStatus} selected={selectedStatus}
                                setSelected={setSelectedStatus} disabled/>
                <DropDownFilter data={resourceTypes} selected={selectedType} setSelected={handleTypeChange} />
                <DropDownFilter data={resourceOrganizations} selected={selectedOrganization}
                                setSelected={handleOrganizationChange}/>
                <DropDownFilter data={badgeOptions} selected={selectedBadge}
                                setSelected={handleBadgeChange} />
            </div>
        </div>
    );
}