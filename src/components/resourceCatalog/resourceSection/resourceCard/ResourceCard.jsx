import React, {useEffect, useRef, useState} from 'react';
import ResourceCardBadge from "./ResourceCardBadge";
import {useNavigate} from "react-router-dom";
import {useBadges} from "../../../../contexts/BadgeContext";
import {ReactComponent as ComputeIcon} from "../../../../assets/img/icons/cpu.svg";
import {ReactComponent as StorageIcon} from "../../../../assets/img/icons/hdd.svg";

/**
 * The header of the resource card displaying the organization logo.
 * @param {string} name - Name of the organization.
 * @param {string} type - Type of the resource. Currently only for compute and storage.
 * @param {string} url - URL of the organization logo.
 */
function ResourceCardHeader ({ name, type, url }) {

    return (
        <div className="card-header-wrapper">
            {url ?
                <div className="card-header">
                    <img src={url} alt={name}/>
                </div>
                :
                <div className="card-header-placeholder">
                    {type === 'Compute' ?
                        <ComputeIcon style={{ width: '100%', height: '60%' }}/> :
                        <StorageIcon style={{ width: '100%', height: '60%' }}/>}
                    {/*<p>Logo Not Available</p>*/}
                </div>
            }
        </div>
    );
}

/**
 * A card that displays a single resource.
 * @param {Object} resource - The single resource to display.
 */
export default function ResourceCard({ resource }) {
    const { badges } = useBadges();
    const navigate = useNavigate();
    const [badgeContainerName, setBadgeContainerName] = useState("");

    useEffect(() => {
        if (resource.badges.length > 5) {
            setBadgeContainerName("badge-container more");
        } else {
            setBadgeContainerName("badge-container");
        }
    }, [resource.badges.length]);

    const handleCardClick = () => {
        navigate(`/resourceDetail/${resource.cider_resource_id}`);
    };

    return (
        <div className="card resource-card" onClick={handleCardClick}>
            <ResourceCardHeader name={resource.organization_name}
                                type={resource.cider_type}
                                url={resource.organization_logo_url}/>
            <div className="card-body-wrapper">
                <div className="card-body">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p className="resource-title">{resource.resource_descriptive_name}</p>
                        <p className="resource-type">{resource.cider_type} Resource</p>
                    </div>
                    <p className="card-text">
                        {resource.resource_description ? resource.resource_description : 'Description not available.'}
                    </p>
                    <div className={badgeContainerName}>
                        {resource.badges.slice(0, resource.badges.length > 5 ? 5 : resource.badges.length).map((badge, index) => {
                            const badgeData = badges.find(b => b.badge_id === badge.badge_id);
                            const preparedBadgeData = {
                                ...badgeData,
                                ...(badge.state ? {state: badge.state} : {}),
                                ...(badge.badge_access_url ? {badge_access_url: badge.badge_access_url} : {}),
                                ...(badge.badge_access_url_label ? {badge_access_url_label: badge.badge_access_url_label} : {})
                            };
                            return (
                                <ResourceCardBadge key={index}
                                                   resourceName={resource.resource_descriptive_name}
                                                   badge={preparedBadgeData} index={index}/>
                            );
                        })}
                        {resource.badges.length > 5 && (
                            <button className="btn badge-more">
                                +{resource.badges.length - 5}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}