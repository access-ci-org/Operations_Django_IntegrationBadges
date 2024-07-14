import React, {useCallback, useEffect, useState} from "react";
import BadgeContainer from "./badgeContainer/BadgeContainer";

/**
 * The header of the badge section. It also shows the switch
 * between researcher view and resource provider view and the
 * list of roadmaps to filter the badges.
 * @param {Object} resource - The resource object to display
 * @param selectedRoadmaps - The list of roadmaps that are selected
 * @param {Function} toggleRoadmapOption - The function to toggle the roadmap option
 * @param selectedView - The view that is currently selected
 * @param {Function} toggleViewDisplay - The function to toggle the view display
 */
function ResourceBadgeHeader({
                                 resource,
                                 selectedRoadmaps,
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
                                id={`roadmapCheckbox${index}`}
                                className="form-check-input form-checkbox"
                                type="checkbox"
                                value={item.roadmap.name}
                                checked={selectedRoadmaps.includes(item.roadmap.name)}
                                onChange={() => toggleRoadmapOption(item)}
                            />
                            <label className="form-check-label" htmlFor={`roadmapCheckbox${index}`}>
                                {item.roadmap.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn resource-badge-change-view" onClick={() => toggleViewDisplay()}>
                {selectedView ? 'Go to Researcher View' : 'Go to Resource Provider View'}
            </button>
        </div>
    );
}

/**
 * The page that displays the detail of a resource.
 * @param {Object} resource - The resource object to display
 */
export default function BadgeSection({resource}) {
    const [selectedRoadmaps, setSelectedRoadmaps] = useState([resource.roadmaps[0].roadmap.name]);
    const [selectedBadges, setSelectedBadges] = useState([]);

    // True for Resource Provider View, False for Researcher View
    const [selectedView, setSelectedView] = useState(true);
    const [activeTab, setActiveTab] = useState('recommended');

    // Update the badges with status information from resource.badge_status
    useEffect(() => {
        const roadmapBadges = resource.roadmaps
            .filter(roadmap => selectedRoadmaps.includes(roadmap.roadmap.name))
            .flatMap(roadmap => roadmap.roadmap.badges)
            .map(badge => {
                const statusInfo = resource.badge_status.find(status => status.badge_id === badge.badge_id);
                return { ...badge, status: statusInfo ? statusInfo.status : "NotPlanned" };
            });
        setSelectedBadges(roadmapBadges);
    }, [selectedRoadmaps, resource.roadmaps, resource.badge_status]);

    const toggleViewDisplay = () => {
        setSelectedView(current => !current);
        setActiveTab('recommended');
    };

    const toggleRoadmapOption = useCallback((item) => {
        setSelectedRoadmaps(current => {
            if (current.includes(item.roadmap.name)) {
                return current.filter(name => name !== item.roadmap.name);
            } else {
                return [...current, item.roadmap.name];
            }
        });
    }, []);

    return (
        <div className="resource-badge-section">
            <ResourceBadgeHeader resource={resource}
                                 selectedRoadmaps={selectedRoadmaps}
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