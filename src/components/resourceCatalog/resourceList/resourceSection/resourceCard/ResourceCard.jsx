import React, {useState} from 'react';
import ResourceCardHeader from "./ResourceCardHeader";
import ResourceCardBadge from "./ResourceCardBadge";
import {useNavigate} from "react-router-dom";

export default function ResourceCard({ resource, badges }) {
    const count = resource.badges.length;
    const navigate = useNavigate();

    const handleCardClick = () => {
        // Find badges related to this resource
        const resourceBadges = resource.badges.map(badge => {
            return badges.find(b => b.badge_id === badge.badge_id);
        }).filter(b => b != null);

        navigate(`/resourceDetail/${resource.cider_resource_id}`, { state: { resourceBadges } });
    };

    return (
        <div className="card resource-card" onClick={handleCardClick}>
            <ResourceCardHeader resource={resource}/>
            <div className="card-body-wrapper">
                <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p className="resource-title">{resource.resource_descriptive_name}</p>
                        <p className="resource-type">{resource.cider_type} Resource</p>
                    </div>
                    <p className="card-text">
                        {resource.resource_description}
                    </p>
                    <div className="badge-container">
                        {resource.badges.slice(0, count > 4 ? 4 : count).map((badge, index) => {
                            const badgeData = badges.find(b => b.badge_id === badge.badge_id);
                            return (
                                <ResourceCardBadge key={index} source={resource.resource_descriptive_name}
                                                   badge={badgeData} index={index} />
                            );
                        })}
                        {count > 4 && (
                            <div className="badge-more">
                                <p>+{count - 4} more</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}