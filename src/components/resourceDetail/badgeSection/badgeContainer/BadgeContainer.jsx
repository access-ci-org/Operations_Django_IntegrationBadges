import {useEffect, useState} from "react";
import DashboardView from "./views/DashboardView";
import ListView from "./views/ListView/ListView";
import BadgeContainerViewOption from "../../../fragments/BadgeContainerViewOption";
import {useBadges} from "../../../../contexts/BadgeContext";

export default function BadgeContainer({roadmapBadges, selectedView, activeTab, setActiveTab}) {
    const { badges } = useBadges();
    const [badgeDisplay, setBadgeDisplay] = useState(true); // true for dashboard view
    const [recommendedBadges, setRecommendedBadges] = useState([]);
    const [plannedBadges, setPlannedBadges] = useState([]);
    const [achievedBadges, setAchievedBadges] = useState([]);

    useEffect(() => {
        // const planned = badges.filter(badge => badge.status === "Planned"
        //     || badge.status === "TaskCompleted"
        //     || badge.status === "VerificationFailed");
        // const achieved = badges.filter(badge => badge.status === "Verified");
        setRecommendedBadges(roadmapBadges);
        setPlannedBadges([]);
        setAchievedBadges([]);
    }, [roadmapBadges, badges]);

    const toggleBadgeDisplay = () => {
        setBadgeDisplay(current => !current);
    };

    return (
        <div className="resource-badge-container-container">
            <div>
                <ul className="nav resource-badge-container-options" id="resource-badges-options" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${activeTab === 'recommended' ? 'active' : ''}`}
                                id="resource-badge-container-recommended"
                                data-bs-toggle="pill" data-bs-target="#resource-badge-container-recommended-tab"
                                type="button" role="tab" aria-controls="resource-badge-container-recommended-tab"
                                aria-selected="true" onClick={() => setActiveTab('recommended')}>
                            {selectedView ?
                                `Recommended (${recommendedBadges.length})` : `Available (${achievedBadges.length})`}
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${activeTab === 'planned' ? 'active' : ''}`}
                                id="resource-badge-container-planned" data-bs-toggle="pill"
                                data-bs-target="#resource-badge-container-planned-tab"
                                type="button" role="tab" aria-controls="resource-badge-container-planned-tab"
                                aria-selected="false" onClick={() => setActiveTab('planned')}>
                            {selectedView ?
                                `Planned (${plannedBadges.length})` :
                                `Planned (${plannedBadges.length + recommendedBadges.length})`}
                        </button>
                    </li>
                    {selectedView &&
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'achieved' ? 'active' : ''}`}
                                    id="resource-badge-container-achieved" data-bs-toggle="pill"
                                    data-bs-target="#resource-badge-container-achieved-tab"
                                    type="button" role="tab" aria-controls="resource-badge-container-achieved-tab"
                                    aria-selected="false" onClick={() => setActiveTab('achieved')}>
                                Available ({achievedBadges.length})
                            </button>
                        </li>
                    }
                </ul>

                <BadgeContainerViewOption badgeDisplay={badgeDisplay} toggleBadgeDisplay={toggleBadgeDisplay}/>
            </div>
            {badgeDisplay ? (
                <DashboardView recommendedBadges={recommendedBadges} plannedBadges={plannedBadges}
                               achievedBadges={achievedBadges} selectedView={selectedView} activeTab={activeTab}/>
            ) : (
                <ListView recommendedBadges={recommendedBadges} plannedBadges={plannedBadges}
                          achievedBadges={achievedBadges} selectedView={selectedView} activeTab={activeTab}/>
            )}
        </div>
    );
}