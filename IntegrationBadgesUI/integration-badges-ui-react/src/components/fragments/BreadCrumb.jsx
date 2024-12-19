import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResources } from "../../contexts/ResourcesContext";
import { useBadges } from "../../contexts/BadgeContext";

/**
 * Breadcrumbs component that displays the current page location.
 * The root page does not display any breadcrumbs.
 */
export default function Breadcrumbs() {
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(x => x);
    const { resources } = useResources();
    const { badges } = useBadges();

    const [resourceName, setResourceName] = useState('');
    const [badgeName, setBadgeName] = useState('');

    useEffect(() => {
        const resourceId = pathname[1];
        const badgeId = pathname[2];

        if (resourceId) {
            const resource = resources.find(resource => resource.cider_resource_id === parseInt(resourceId));
            if (resource) {
                setResourceName(resource.resource_descriptive_name);
            }
        }

        if (badgeId) {
            const badge = badges.find(badge => badge.badge_id === parseInt(badgeId));
            if (badge) {
                setBadgeName(badge.name);
            }
        }
    }, [pathname, resources, badges]);

    // Check if the current path is the root
    if (location.pathname === '/') {
        return null; // Return nothing for the home page
    }

    return (
        <nav className="breadcrumb-wrapper" aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/">ACCESS Infrastructure Integration</Link>
                </li>
                {pathname[0] === 'organizations' && resourceName && (
                    <li className="breadcrumb-item active" aria-current="page">
                        {resourceName}
                    </li>
                )}
                {pathname[0] === 'resourceBadge' && resourceName && (
                    <>
                        <li className="breadcrumb-item">
                            <Link to={`/resourceDetail/${pathname[1]}`}>{resourceName}</Link>
                        </li>
                        {badgeName && (
                            <li className="breadcrumb-item active" aria-current="page">
                                {badgeName}
                            </li>
                        )}
                    </>
                )}
            </ol>
        </nav>
    );
}
