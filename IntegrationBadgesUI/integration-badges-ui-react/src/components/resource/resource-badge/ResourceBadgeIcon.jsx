import {useBadges} from "../../../contexts/BadgeContext.jsx";

import badgeIconBorderBlue from "../../../assets/badge-icon-border-blue.png"
import {useResources} from "../../../contexts/ResourcesContext.jsx";

export default function ResourceBadgeIcon({resourceId, roadmapId, badgeId}) {
    const {getBadge} = useBadges();
    const {getResourceRoadmapBadge} = useResources();

    let badge = getBadge({badgeId});
    if (!!resourceId && !!roadmapId) {
        badge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
    }

    const badgeIconStatusClass = {
        "undefined": "",
        "not-planned": "",
        "planned": "grayscale",
        "tasks-completed": "grayscale",
        "verification-failed": "grayscale",
        "verified": "",
        "deprecated": "grayscale"
    };

    return <div
        className={`w-100 background-image-center-no-repeat badge-icon-border ${badgeIconStatusClass[badge.status]}`}
        style={{backgroundImage: `url(${badge.graphic})`}}>
        <div
            className={`w-100 background-image-center-no-repeat badge-icon-small ${badgeIconStatusClass[badge.status]}`}>
        </div>
    </div>


    // return <div className={`w-100 background-image-center-no-repeat badge-icon-border ${badgeIconStatusClass[badge.status]}`}
    //             style={{backgroundImage: `url(${badgeIconBorderBlue})`}}>
    //     <div className={`w-100 background-image-center-no-repeat badge-icon-small ${badgeIconStatusClass[badge.status]}`}
    //          style={{backgroundImage: `url(${badge.graphic})`}}>
    //     </div>
    // </div>
}