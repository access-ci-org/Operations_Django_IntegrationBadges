import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useBadges} from "../../contexts/BadgeContext";

/**
 * The header of the badge detail page that includes the resource
 * name/type and a dropdown of all badges in the roadmaps of the resource.
 * @param {Object} resource - the resource that the badge is associated with
 * @param {string} name - the name of the current badge
 */
export default function BadgeDetailHeader({ resource, name }) {
    const { badges } = useBadges();
    const navigate = useNavigate();
    const [roadmapBadges, setRoadmapBadges] = useState([]);

    // find all badges in the roadmaps, ensure no duplicates
    useEffect(() => {
        const badgeMap = new Map();

        resource.roadmaps.forEach(roadmap => {
            roadmap.roadmap.badges.forEach(badgeContainer => {
                const badgeId = badgeContainer.badge.badge_id;
                if (!badgeMap.has(badgeId)) {
                    badgeMap.set(badgeId, badgeContainer.badge);
                }
            });
        });

        setRoadmapBadges([...badgeMap.values()]);
    }, [resource, badges]);


    // Handle badge selection and navigate
    const handleSelectBadge = (badge) => {
        navigate(`/resourceBadge/${resource.cider_resource_id}/${badge.badge_id}`);
    };

    // Handle title selection and navigate
    const handleSelectTitle = () => {
        navigate(`/resourceDetail/${resource.cider_resource_id}`);
    }

    return (
        <div className="header-wrapper">
            <div className="title-wrapper">
                <h1 onClick={() => handleSelectTitle()}>{resource.resource_descriptive_name}</h1>
                <a href={resource.organization_url}>{resource.cider_type} Resource</a>
            </div>
            <div className="btn-group">
                <p>All Badges: </p>
                <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {name ? name : 'Select a Badge'}
                </button>
                <ul className="dropdown-menu">
                    {roadmapBadges.map((badge, index) => (
                        <li key={index}>
                            <a className="dropdown-item" onClick={() => handleSelectBadge(badge)}>
                                {badge.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
