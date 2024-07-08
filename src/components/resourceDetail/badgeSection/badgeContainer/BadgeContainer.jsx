import {useEffect, useState} from "react";
import {ReactComponent as ListIcon} from '../../../../assets/img/icons/list_2.svg';
import {ReactComponent as DashboardIcon} from '../../../../assets/img/icons/dashboard_2.svg';
import DashboardView from "./views/DashboardView";
import ListView from "./views/ListView";

function BadgeContainerViewOptionButton({children, onClick, isActive}) {
    return (
        <button type="button" className="btn btn-medium switch-btn" onClick={onClick}
                style={{
                    backgroundColor: isActive ? '#107180' : 'white',
                    border: isActive ? '1px solid #107180' : 'none'
                }}>
            {children}
        </button>
    );
}

function BadgeContainerViewOption({badgeDisplay, toggleBadgeDisplay}) {
    return (
        <div style={{display: 'flex'}}>
            <BadgeContainerViewOptionButton isActive={!badgeDisplay} onClick={toggleBadgeDisplay}>
                <ListIcon style={{fill: !badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
            <BadgeContainerViewOptionButton isActive={badgeDisplay} onClick={toggleBadgeDisplay}>
                <DashboardIcon style={{fill: badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
        </div>
    );
}

export default function BadgeContainer({badges, selectedView, activeTab, setActiveTab}) {
    // True for Dashboard View, False for List View
    const [badgeDisplay, setBadgeDisplay] = useState(true);
    const toggleBadgeDisplay = () => {
        setBadgeDisplay(current => !current);
    };
    const [recommendedBadges, setRecommendedBadges] = useState([]);
    const [plannedBadges, setPlannedBadges] = useState([]);
    const [achievedBadges, setAchievedBadges] = useState([]);

    useEffect(() => {
        const recommended = badges.filter(badge => badge.status === "NotStarted"
            || badge.status === "Deprecated"
            || badge.status === "NotPlanned");
        const planned = badges.filter(badge => badge.status === "Planned"
            || badge.status === "TaskCompleted"
            || badge.status === "VerificationFailed");
        const achieved = badges.filter(badge => badge.status === "Verified");
        setRecommendedBadges(recommended);
        setPlannedBadges(planned);
        setAchievedBadges(achieved);
    }, [badges]);

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
                                Achieved ({achievedBadges.length})
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