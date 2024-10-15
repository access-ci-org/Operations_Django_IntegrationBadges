import React, {useEffect, useState} from 'react';
import ResourceCardBadge from "./ResourceCardBadge";
import {useNavigate} from "react-router-dom";
import {useBadges} from "../../../../contexts/BadgeContext";
import {ReactComponent as ComputeIcon} from "../../../../assets/img/icons/cpu.svg";
import {ReactComponent as StorageIcon} from "../../../../assets/img/icons/hdd.svg";
import ResourceCardBadgeModal from "./ResourceCardBadgeModal";

/**
 * The header of the resource card displaying the organization logo.
 * @param {string} name - Name of the organization.
 * @param {string} type - Type of the resource. Currently only for compute and storage.
 * @param {string} url - URL of the organization logo. If not available, a placeholder icon
 * is displayed depending on the type.
 */
function ResourceCardHeader({name, type, url}) {

    return (
        <div className="card-header-wrapper">
            {url ?
                <div className="card-header">
                    <img src={url} alt={name}/>
                </div>
                :
                <div className="card-header-placeholder">
                    {type === 'Compute' ?
                        <ComputeIcon style={{width: '100%', height: '60%'}}/> :
                        <StorageIcon style={{width: '100%', height: '60%'}}/>}
                </div>
            }
        </div>
    );
}

/**
 * A card that displays a single resource.
 * @param {ResourceListResource} resource - The single resource to display.
 */
export default function ResourceCard({resource}) {
    const {badges} = useBadges();
    const navigate = useNavigate();
    const [badgeContainerName, setBadgeContainerName] = useState("");
    const [displayedBadges, setDisplayedBadges] = useState([]);
    const [additionalBadgeCount, setAdditionalBadgeCount] = useState(0);

    // use for styling the badge container based on the number of badges
    useEffect(() => {
        if (resource.badges.length > 5) {
            setBadgeContainerName("badge-container more");
        } else {
            setBadgeContainerName("badge-container");
        }
    }, [resource.badges.length]);

    // Process badges and update state
    useEffect(() => {
        const processedBadges = resource.badges.map((badge) => {
            const badgeData = badges.find(b => b.badge_id === badge.badge_id);
            return {
                ...badge,
                resource_name: resource.resource_descriptive_name,
                badge: {
                    ...badgeData,
                },
            };
        });
        setDisplayedBadges(processedBadges);
        setAdditionalBadgeCount(resource.badges.length - 5);
    }, [resource.badges, badges, resource.resource_descriptive_name]);

    const handleCardClick = () => {
        navigate(`/resourceDetail/${resource.cider_resource_id}`);
    };

    const handleBadgeContainerClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="card resource-card" onClick={handleCardClick}>
            <ResourceCardHeader name={resource.organization_name}
                                type={resource.cider_type}
                                url={resource.organization_logo_url}/>
            <div className="card-body">
                <div className="card-body-header">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p className="resource-title">{resource.resource_descriptive_name}</p>
                        <p className="resource-type">{resource.cider_type} Resource</p>
                    </div>
                    <p className="card-text">
                        {resource.resource_description || 'Description not available.'}
                    </p>
                </div>
                <div className={badgeContainerName} onClick={handleBadgeContainerClick}>
                    {displayedBadges.slice(0, 5).map((badge, index) => (
                        <ResourceCardBadge key={index} badge={badge} index={index}/>
                    ))}
                    {additionalBadgeCount > 0 && (
                        <div>
                            <button className="btn badge-more"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#ResourceCardBadgeModal${resource.cider_resource_id}`}>
                                +{additionalBadgeCount}
                            </button>
                            <ResourceCardBadgeModal id={`ResourceCardBadgeModal${resource.cider_resource_id}`}
                                                    badges={displayedBadges}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}