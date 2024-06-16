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
    const [badgeDisplay, setBadgeDisplay] = useState(true);
    const count = data.badges.length;


    return (
        <div className="card resource-card">
            <ResourceCardHeader data={data}/>
            <div className="card-body">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p className="resource-title">{data.name}</p>
                    <p className="resource-type">{data.type} Resource</p>
                </div>
                <p className="card-text">
                    {data.description}
                </p>
                <div className="badge-container">
                    {data.badges.slice(0, count > 4 ? 4 : count).map((badge, index) => (
                        <ResourceCardBadge key={index} data={badge} index={index}/>
                    ))}
                    {count > 4 && (
                        <div className="badge-more">
                            <p>+{count - 4} more</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}