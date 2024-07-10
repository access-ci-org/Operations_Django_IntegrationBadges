import React, {useCallback, useState} from "react";
import BadgeContainer from "./badgeContainer/BadgeContainer";

function ResourceBadgeHeader({ resource,
                                 selectedRoadmaps,
                                 toggleRoadmapOption,
                                 selectedView,
                                 toggleViewDisplay }) {
    return (
        <div className="resource-badge-header">
            <div>
                <h2>Resource Badges</h2>
                <div className="resource-badge-header-filter">
                    {resource.roadmaps.map((item, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input form-checkbox"
                                type="checkbox"
                                value={item.roadmap.name}
                                checked={selectedRoadmaps.includes(item.roadmap.name)}
                                onChange={() => toggleRoadmapOption(item)}
                                id={`roadmapCheckbox${index}`}
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

export default function BadgeSection({resource, badges}) {
    const [selectedRoadmaps, setSelectedRoadmaps] = useState([resource.roadmaps[0].roadmap.name]);
    const [selectedBadges, setSelectedBadges] = useState(resource.roadmaps[0].roadmap.badges);

    // True for Resource Provider View, False for Researcher View
    const [selectedView, setSelectedView] = useState(true);
    const [activeTab, setActiveTab] = useState('recommended');

    const toggleViewDisplay = () => {
        setSelectedView(current => !current);
        setActiveTab('recommended');
    }

    const toggleRoadmapOption = useCallback((item) => {
        setSelectedRoadmaps(current => {
            if (current.includes(item.roadmap.name)) {
                return current.filter(name => name !== item.roadmap.name);
            } else {
                return [...current, item.roadmap.name];
            }
        });
    }, []);

    React.useEffect(() => {
        const selectedBadges = resource.roadmaps
            .filter(roadmap => selectedRoadmaps.includes(roadmap.roadmap.name))
            .flatMap(roadmap => roadmap.roadmap.badges);
        setSelectedBadges(selectedBadges);
    }, [selectedRoadmaps, resource.roadmaps]);

    return (
        <div className="resource-badge-section">
            <ResourceBadgeHeader resource={resource}
                                 selectedRoadmaps={selectedRoadmaps}
                                 selectedView={selectedView}
                                 toggleViewDisplay={toggleViewDisplay}
                                 toggleRoadmapOption={toggleRoadmapOption}/>
            {/*<BadgeContainer badges={selectedBadges}*/}
            {/*                selectedView={selectedView}*/}
            {/*                activeTab={activeTab}*/}
            {/*                setActiveTab={setActiveTab}/>*/}
        </div>
    );
}