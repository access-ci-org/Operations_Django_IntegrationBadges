import {useEffect, useState} from "react";
import DashboardView from "./views/DashboardView";
import ListView from "./views/ListView/ListView";
import BadgeContainerViewOption from "../../../fragments/BadgeContainerViewOption";
import {useBadges} from "../../../../contexts/BadgeContext";
import {workflow_states} from "../../../../App";

/**
 * The container for the badges. The badges are displayed in a dashboard view or a list view.
 * The badges are filtered based on the status of the badge,
 * which is determined by the resource.badge_status.
 * @param {Object} roadmapBadges - The badges associated with the resource
 * @param selectedView - True for Resource Provider View, False for Researcher View
 * @param activeTab - Can be 'recommended' (default), 'planned', or 'achieved' (available)
 * @param {Function} setActiveTab - Function to set the current active tab
 */
export default function BadgeContainer({roadmapBadges, selectedView, activeTab, setActiveTab}) {
    const { badges } = useBadges();
    const [badgeDisplay, setBadgeDisplay] = useState(true); // true for dashboard view
    const [recommendedBadges, setRecommendedBadges] = useState([]);
    const [plannedBadges, setPlannedBadges] = useState([]);
    const [achievedBadges, setAchievedBadges] = useState([]);

    // Update the badges with status information from resource.badge_status
    useEffect(() => {
        const recommended = roadmapBadges.filter(badge =>
            badge.state === workflow_states.NOT_PLANNED || badge.state === workflow_states.DEPRECATED);
        const planned = roadmapBadges.filter(badge => badge.state === workflow_states.PLANNED
            || badge.state === workflow_states.TASK_COMPLETED
            || badge.state === workflow_states.VERIFICATION_FAILED);
        const achieved = roadmapBadges.filter(badge => badge.state === workflow_states.VERIFIED);
        setRecommendedBadges(recommended);
        setPlannedBadges(planned);
        setAchievedBadges(achieved);
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
                                `Planned (${plannedBadges.length + 
                                recommendedBadges.filter(badge => badge.state !== workflow_states.NOT_PLANNED).length})`}
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