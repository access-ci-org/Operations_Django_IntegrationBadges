import {useEffect, useState} from "react";
import { ReactComponent as ListIcon } from '../../../../assets/img/icons/list.svg';
import { ReactComponent as DashboardIcon } from '../../../../assets/img/icons/dashboard.svg';
import ResourceBadge from "./ResourceBadge/ResourceBadge";

function BadgeContainerViewOptionButton({children, onClick, isActive}) {
    return (
        <button type="button" className="btn btn-dark switch-btn" onClick={onClick}
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
        <div style={{display: 'flex', gap: '2px'}}>
            <BadgeContainerViewOptionButton isActive={badgeDisplay} onClick={toggleBadgeDisplay}>
                <ListIcon style={{fill: badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
            <BadgeContainerViewOptionButton isActive={!badgeDisplay} onClick={toggleBadgeDisplay}>
                <DashboardIcon style={{fill: !badgeDisplay ? 'white' : '#107180'}}/>
            </BadgeContainerViewOptionButton>
        </div>
    );
}

export default function ResourceBadgeContainer({badges, selectedView}) {
    const [badgeDisplay, setBadgeDisplay] = useState(true);
    const toggleBadgeDisplay = () => {
        setBadgeDisplay(current => !current);
    };
    const [recommendedBadges, setRecommendedBadges] = useState([]);
    const [plannedBadges, setPlannedBadges] = useState([]);
    const [achievedBadges, setAchievedBadges] = useState([]);

    useEffect(() => {
        const recommended = badges.filter(badge => badge.status === "NotStarted"
            || badge.status === "Deprecated");
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
                        <button className="nav-link active" id="resource-badge-container-recommended"
                                data-bs-toggle="pill" data-bs-target="#resource-badge-container-recommended-tab"
                                type="button" role="tab" aria-controls="resource-badge-container-recommended-tab"
                                aria-selected="true">Recommended ({recommendedBadges.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="resource-badge-container-planned" data-bs-toggle="pill"
                                data-bs-target="#resource-badge-container-planned-tab"
                                type="button" role="tab" aria-controls="resource-badge-container-planned-tab"
                                aria-selected="false">Planned ({plannedBadges.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="resource-badge-container-achieved" data-bs-toggle="pill"
                                data-bs-target="#resource-badge-container-achieved-tab"
                                type="button" role="tab" aria-controls="resource-badge-container-achieved-tab"
                                aria-selected="false">Achieved ({achievedBadges.length})
                        </button>
                    </li>
                </ul>

                <BadgeContainerViewOption badgeDisplay={badgeDisplay} toggleBadgeDisplay={toggleBadgeDisplay}/>
            </div>
            <div className="tab-content resource-badge-container-content" id="resource-badges-tabContent">
                <div className="tab-pane fade show active" id="resource-badge-container-recommended-tab" role="tabpanel"
                     aria-labelledby="resource-badge-container-recommended-tab" tabIndex="0">
                    <div className="row row-cols-auto resource-badge-container">
                        {recommendedBadges.map((badge, index) => (
                            <div key={index} className="col">
                                <ResourceBadge data={badge} selectedView={selectedView}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="resource-badge-container-planned-tab" role="tabpanel"
                     aria-labelledby="resource-badge-container-planned-tab" tabIndex="0">
                    <div className="row row-cols-auto resource-badge-container">
                        {plannedBadges.map((badge, index) => (
                            <div key={index} className="col">
                                <ResourceBadge data={badge} selectedView={selectedView}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="resource-badge-container-achieved-tab" role="tabpanel"
                     aria-labelledby="resource-badge-container-achieved-tab" tabIndex="0">
                    <div className="row row-cols-auto resource-badge-container">
                        {achievedBadges.map((badge, index) => (
                            <div key={index} className="col">
                                <ResourceBadge data={badge} selectedView={selectedView}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}