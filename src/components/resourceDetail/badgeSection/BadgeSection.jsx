import React, {useCallback, useEffect, useState} from "react";
import BadgeContainer from "./badgeContainer/BadgeContainer";
import {workflow_states} from "../../../App";

/**
 * The header of the badge section. It also shows the switch
 * between researcher view and resource provider view and the
 * list of roadmaps to filter the badges.
 * @param {Resource} resource - The resource object to display
 * @param {string} selectedRoadmap - The roadmap that is selected
 * @param {Function} toggleRoadmapOption - The function to toggle the roadmap option
 * @param {boolean} selectedView - The view that is currently selected
 * @param {Function} toggleViewDisplay - The function to toggle the view display
 */
function ResourceBadgeHeader({
                                 resource,
                                 selectedRoadmap,
                                 toggleRoadmapOption,
                                 selectedView,
                                 toggleViewDisplay
                             }) {
    return (
        <div className="resource-badge-header">
            <div>
                <h2>Resource Badges</h2>
                <div className="resource-badge-header-filter">
                    {resource.roadmaps.map((item, index) => (
                        <div key={index} className="form-check">
                            <input
                                id={`roadmapRadio${index}`}
                                className="form-check-input"
                                type="radio"
                                name="roadmapSelection"
                                value={item.roadmap.name}
                                checked={selectedRoadmap === item.roadmap.name}
                                onChange={() => toggleRoadmapOption(item.roadmap.name)}
                            />
                            <label className="form-check-label" htmlFor={`roadmapRadio${index}`}>
                                {item.roadmap.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn resource-badge-change-view" onClick={toggleViewDisplay}>
                {selectedView ? 'Go to Researcher View' : 'Go to Resource Provider View'}
            </button>
        </div>
    );
}

/**
 * The page that displays the detail of a resource.
 * @param {Resource} resource - The resource object to display
 */
export default function BadgeSection({resource}) {
    const [selectedRoadmap, setSelectedRoadmap] = useState(resource.roadmaps[0].roadmap.name);
    const [selectedBadges, setSelectedBadges] = useState([]);

    // True for Resource Provider View, False for Researcher View
    const [selectedView, setSelectedView] = useState(true);
    const [activeTab, setActiveTab] = useState('recommended');

    // Update the badges with status information from resource.badge_status
    useEffect(() => {
        const roadmapBadges = resource.roadmaps
            .filter(roadmap => selectedRoadmap === roadmap.roadmap.name)
            .flatMap(roadmap => roadmap.roadmap.badges.map(badge => {
                const status = resource.badge_status.find(status =>
                    status.badge_id === badge.badge.badge_id);
                return {
                    badge_id: badge.badge.badge_id,
                    name: badge.badge.name,
                    required: badge.required,
                    resource_name: resource.resource_descriptive_name,
                    state: status?.state ?? workflow_states.NOT_PLANNED,
                    badge_access_url: status?.badge_access_url ?? null,
                    badge_access_url_label: status?.badge_access_url_label ?? null,
                };
            }));
        setSelectedBadges(roadmapBadges);
    }, [selectedRoadmap, resource]);

    const toggleViewDisplay = () => {
        setSelectedView(current => !current);
        setActiveTab('recommended');
    };

    const toggleRoadmapOption = useCallback((roadmapName) => {
        setSelectedRoadmap(roadmapName);
    }, []);

    return (
        <div className="resource-badge-section">
            <ResourceBadgeHeader resource={resource}
                                 selectedRoadmap={selectedRoadmap}
                                 selectedView={selectedView}
                                 toggleViewDisplay={toggleViewDisplay}
                                 toggleRoadmapOption={toggleRoadmapOption}/>
            <BadgeContainer roadmapBadges={selectedBadges}
                            selectedView={selectedView}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}/>
        </div>
    );
}