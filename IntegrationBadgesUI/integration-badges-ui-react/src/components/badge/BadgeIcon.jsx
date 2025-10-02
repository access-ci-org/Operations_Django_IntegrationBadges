import {useBadges} from "../../contexts/BadgeContext.jsx";

export default function BadgeIcon({badgeId}) {
    const {getBadge} = useBadges();

    let badge = getBadge({badgeId});


    return <div
        className={`w-100 background-image-center-no-repeat badge-icon-border`}
        style={{backgroundImage: `url(${badge.graphic})`}}>
        <div
            className={`w-100 background-image-center-no-repeat badge-icon-small`}>
        </div>
    </div>
}
