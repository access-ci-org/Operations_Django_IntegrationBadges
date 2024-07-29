import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import DropDownFilter from "./DropDownFilter";
import {useBadges} from "../../../contexts/BadgeContext";

const resourceStatus = ["All Resources", "Active Resources", "Upcoming Resources"];
const resourceType = ["All Types", "Compute", "Storage"];

export default function CatalogSearch({resources, displayedResources, setDisplayedResources}) {
    const {badges} = useBadges();
    const [selectedStatus, setSelectedStatus] = useState(resourceStatus[0]);
    const [selectedType, setSelectedType] = useState(resourceType[0]);
    const [selectedOrganization, setSelectedOrganization] = useState("All Organizations");
    const [selectedBadge, setSelectedBadge] = useState("All Badges");
    const [resourceOrganizations, setResourceOrganizations] = useState(["All Organizations"]);
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

    const getBadgeName = (badge_id) => {
        const badge = badges.find(b => b.badge_id === badge_id);
        return badge ? badge.name : "";
    };

    const handleSearch = (searchTerm) => {
        const searchTermLower = searchTerm.toLowerCase();

        let filteredResources = resources;

        if (selectedOrganization !== "All Organizations") {
            filteredResources = filteredResources.filter(institution =>
                institution.organization_name === selectedOrganization
            );
        }

        if (selectedType !== "All Types") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.cider_type.toLowerCase() === selectedType.toLowerCase())
            })).filter(institution => institution.resources.length > 0);
        }

        if (selectedBadge !== "All Badges") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.badges.some(badge => getBadgeName(badge.badge_id) === selectedBadge)
                )
            })).filter(institution => institution.resources.length > 0);
        }

        if (searchTerm.trim() !== "") {
            filteredResources = filteredResources.reduce((acc, institution) => {
                const institutionMatch = institution.organization_name.toLowerCase().includes(searchTermLower);
                const filteredResources = institution.resources.filter(resource =>
                    resource.resource_descriptive_name.toLowerCase().includes(searchTermLower)
                );

                if (institutionMatch) {
                    // If institution matches, show all its resources unless specific resources are found
                    acc.push({
                        ...institution,
                        resources: filteredResources.length > 0 ? filteredResources : institution.resources
                    });
                } else if (filteredResources.length > 0) {
                    // If specific resources are found, show only those resources
                    acc.push({
                        ...institution,
                        resources: filteredResources
                    });
                }

                return acc;
            }, []);
        }

        setDisplayedResources(filteredResources);
    };

    const handleOrganizationChange = (organization) => {
        setSelectedOrganization(organization);
        let filteredResources = resources;

        if (organization !== "All Organizations") {
            filteredResources = resources.filter(institution =>
                institution.organization_name === organization
            );
        }

        if (selectedType !== "All Types") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource => resource.cider_type.toLowerCase() === selectedType.toLowerCase())
            })).filter(institution => institution.resources.length > 0);
        }

        if (selectedBadge !== "All Badges") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.badges.some(badge => getBadgeName(badge.badge_id) === selectedBadge)
                )
            })).filter(institution => institution.resources.length > 0);
        }

        setDisplayedResources(filteredResources);
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
        let filteredResources = resources;

        if (selectedOrganization !== "All Organizations") {
            filteredResources = filteredResources.filter(institution =>
                institution.organization_name === selectedOrganization
            );
        }

        if (type !== "All Types") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.cider_type.toLowerCase() === type.toLowerCase())
            })).filter(institution => institution.resources.length > 0);
        }

        if (selectedBadge !== "All Badges") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.badges.some(badge => getBadgeName(badge.badge_id) === selectedBadge)
                )
            })).filter(institution => institution.resources.length > 0);
        }

        setDisplayedResources(filteredResources);
    };

    const handleBadgeChange = (badge) => {
        setSelectedBadge(badge);
        let filteredResources = resources;

        if (selectedOrganization !== "All Organizations") {
            filteredResources = filteredResources.filter(institution =>
                institution.organization_name === selectedOrganization
            );
        }

        if (selectedType !== "All Types") {
            filteredResources = filteredResources.map(institution => ({
                ...institution,
                resources: institution.resources.filter(resource =>
                    resource.cider_type.toLowerCase() === selectedType.toLowerCase())
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

        setDisplayedResources(filteredResources);
    };

    return (
        <div className="search-section-wrapper">
            <SearchBar onSearch={handleSearch}/>
            <div className="filter-section">
                <p>Filters</p>
                <DropDownFilter data={resourceStatus} selected={selectedStatus}
                                setSelected={setSelectedStatus} disabled/>
                <DropDownFilter data={resourceType} selected={selectedType} setSelected={handleTypeChange} />
                <DropDownFilter data={resourceOrganizations} selected={selectedOrganization}
                                setSelected={handleOrganizationChange}/>
                <DropDownFilter data={badgeOptions} selected={selectedBadge}
                                setSelected={handleBadgeChange} />
            </div>
        </div>
    );
}