import React, {useCallback, useState} from "react";
import BadgeContainer from "./badgeContainer/BadgeContainer";

function ResourceBadgeHeader({ data,
                                 selectedRoadmaps,
                                 toggleRoadmapOption,
                                 selectedView,
                                 toggleViewDisplay }) {
    return (
        <div className="resource-badge-header">
            <div>
                <h2>Resource Badges</h2>
                <div className="resource-badge-header-filter">
                    {data.roadmaps.map((item, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={item.name}
                                checked={selectedRoadmaps.includes(item.name)}
                                onChange={() => toggleRoadmapOption(item)}
                                id={`roadmapCheckbox${index}`}
                            />
                            <label className="form-check-label" htmlFor={`roadmapCheckbox${index}`}>
                                {item.name}
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

export default function BadgeSection({data}) {
    const [selectedRoadmaps, setSelectedRoadmaps] = useState([data.roadmaps[0].name]);
    const [selectedBadges, setSelectedBadges] = useState(data.roadmaps[0].badges);

    // True for Resource Provider View, False for Researcher View
    const [selectedView, setSelectedView] = useState(true);
    const [activeTab, setActiveTab] = useState('recommended');

    const toggleViewDisplay = () => {
        setSelectedView(current => !current);
        setActiveTab('recommended');
    }

    const toggleRoadmapOption = useCallback((item) => {
        setSelectedRoadmaps(current => {
            if (current.includes(item.name)) {
                return current.filter(name => name !== item.name);
            } else {
                return [...current, item.name];
            }
        });
    }, []);

    React.useEffect(() => {
        const selectedBadges = data.roadmaps
            .filter(roadmap => selectedRoadmaps.includes(roadmap.name))
            .flatMap(roadmap => roadmap.badges);
        setSelectedBadges(selectedBadges);
    }, [selectedRoadmaps, data.roadmaps]);

    return (
        <div className="resource-badge-section">
            <ResourceBadgeHeader data={data}
                                 selectedRoadmaps={selectedRoadmaps}
                                 selectedView={selectedView}
                                 toggleViewDisplay={toggleViewDisplay}
                                 toggleRoadmapOption={toggleRoadmapOption}/>
            <BadgeContainer badges={selectedBadges}
                            selectedView={selectedView}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}/>
        </div>
    );
}