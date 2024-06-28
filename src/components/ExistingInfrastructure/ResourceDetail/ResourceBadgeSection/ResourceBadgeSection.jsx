import React, {useCallback, useState} from "react";
import ResourceBadgeContainer from "./ResourceBadgeContainer/ResourceBadgeContainer";

function ResourceBadgeHeader({data,
                                  selectedRoadmap,
                                  setSelectedRoadmap,
                                  selectedView,
                                  toggleViewDisplay,
                                  selectRoadmapOption}) {
    return (
        <div className="resource-badge-header">
            <div>
                <h2>Resource Badges</h2>
                <div className="resource-badge-header-filter">
                    <button className="btn btn-sm dropdown-toggle"
                            type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        {selectedRoadmap}
                    </button>
                    <ul className="dropdown-menu">
                        {data.roadmaps.map((item, index) => (
                            <li key={index} onClick={() => selectRoadmapOption(item)}>
                                <p className="dropdown-item">{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button className="btn resource-badge-change-view"
                    onClick={() => toggleViewDisplay()}>
                {selectedView ? 'Go to Researcher View' : 'Go to Resource Provider View'}
            </button>
        </div>
    );
}

export default function ResourceBadgeSection({data}) {
    const [selectedRoadmap, setSelectedRoadmap] =
        useState(data.roadmaps[0].name);
    const [selectedBadges, setSelectedBadges] = useState(data.roadmaps[0].badges);
    // True for Resource Provider View, False for Researcher View
    const [selectedView, setSelectedView] = useState(true);
    const [activeTab, setActiveTab] = useState('recommended');

    const toggleViewDisplay = () => {
        setSelectedView(current => !current);
        setActiveTab('recommended');
    }
    const selectRoadmapOption = useCallback((item) => {
        setSelectedRoadmap(item.name);
        setSelectedBadges(item.badges);
    }, [setSelectedRoadmap, setSelectedBadges]);

    return (
        <div className="resource-badge-section">
            <ResourceBadgeHeader data={data}
                                 selectedRoadmap={selectedRoadmap}
                                 setSelectedRoadmap={setSelectedRoadmap}
                                 selectedView={selectedView}
                                 toggleViewDisplay={toggleViewDisplay}
                                 selectRoadmapOption={selectRoadmapOption}/>
            <ResourceBadgeContainer badges={selectedBadges}
                                    selectedView={selectedView}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}/>
        </div>
    );
}