import React from "react";
import { ReactComponent as ListIcon } from '../../../../assets/img/icons/list.svg';
import { ReactComponent as DashboardIcon } from '../../../../assets/img/icons/dashboard.svg';
import ResourceBadge from "./ResourceBadge/ResourceBadge";

function BadgeContainerTitleButton({children, onClick, isActive}) {
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

function BadgeContainerTitle({badgeDisplay, toggleBadgeDisplay}) {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <h2>Resource Badges</h2>
            <div style={{display: 'flex', gap: '12px'}}>
                <BadgeContainerTitleButton isActive={badgeDisplay} onClick={toggleBadgeDisplay}>
                    <ListIcon style={{fill: badgeDisplay ? 'white' : '#107180'}}/>
                </BadgeContainerTitleButton>
                <BadgeContainerTitleButton isActive={!badgeDisplay} onClick={toggleBadgeDisplay}>
                    <DashboardIcon style={{fill: !badgeDisplay ? 'white' : '#107180'}}/>
                </BadgeContainerTitleButton>
            </div>
        </div>
    );
}

export default function ResourceBadgeSection({data}) {
    const [badgeDisplay, setBadgeDisplay] = React.useState(true);
    const toggleBadgeDisplay = () => {
        setBadgeDisplay(current => !current); // Toggle the state
    };

    return (
        <div className="resource-badge-section">
            <BadgeContainerTitle badgeDisplay={badgeDisplay} toggleBadgeDisplay={toggleBadgeDisplay}/>
            <div className="row row-cols-auto resource-badge-container">
                {data.badges.map((badge, index) => (
                    <div key={index} className="col">
                        <ResourceBadge data={badge}/>
                    </div>
                ))}
            </div>
        </div>
    );
}