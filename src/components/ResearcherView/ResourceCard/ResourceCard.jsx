import React, {useState} from 'react';
import ResourceCardHeader from "./ResourceCardHeader";
import ResourceCardBadge from "./ResourceCardBadge";
import arrow from '../../../assets/img/arrow-forward.svg';
import ResourceCardFeatures from "./ResourceCardFeatures";
import { ReactComponent as ListIcon } from '../../../assets/img/icons/list.svg';
import { ReactComponent as DashboardIcon } from '../../../assets/img/icons/dashboard.svg';

function BadgeContainerTitleButton({children, onClick, isActive}) {
    return (
        <button type="button" className="btn btn-dark" onClick={onClick}
                style={{
                    padding: 0,
                    margin: 0,
                    borderRadius: '4px',
                    height: '28px',
                    width: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? '#107180' : 'white',
                    border: isActive ? '1px solid #107180' : 'none'
                }}>
            {children}
        </button>
    );
}

function BadgeContainerTitle({badgeDisplay, toggleBadgeDisplay}) {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <p style={{color: "#232323", fontWeight: '600'}}>Resource Badges</p>
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

export default function ResourceCard({data}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [badgeDisplay, setBadgeDisplay] = useState(true);
    const toggleExpansion = () => setIsExpanded(!isExpanded);
    const toggleBadgeDisplay = () => setBadgeDisplay(!badgeDisplay);
    const expandCardStyle = isExpanded ? {maxWidth: '100%'} : {maxWidth: '380px'};

    return (
        <div className="card resource-card" style={expandCardStyle}>
            <ResourceCardHeader data={data}/>
            <div className="card-body">
                <p className="card-text">
                    {data.description}
                </p>
                {isExpanded && (
                    <ResourceCardFeatures data={data}/>
                )}
                <div>
                    {isExpanded && (
                        <BadgeContainerTitle badgeDisplay={badgeDisplay} toggleBadgeDisplay={toggleBadgeDisplay}/>
                    )}
                    <div className="badge-container">
                        {data.badges.map((badge, index) => (
                            <ResourceCardBadge key={index} data={badge} index={index}/>
                        ))}
                    </div>
                </div>
                <div className="expand-button">
                    <p role="button" onClick={toggleExpansion}>
                        {isExpanded ? "Hide Details" : "Show Resource Details"}
                    </p>
                    <img src={arrow} alt="Expand"
                         style={{
                             maxHeight: '20px', maxWidth: '20px',
                             transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                         }}/>
                </div>
            </div>
        </div>
    );
}