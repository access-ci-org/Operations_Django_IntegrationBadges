import {useBadges} from "../../../contexts/BadgeContext.jsx";
import MultiSelectControlTwoLists from "../../util/MultiSelectControlTwoLists.jsx";

export default function ConciergeBadgeEditAssociatePrerequisiteBadges({badgeData, setBadgeData}) {
    const {getBadges, getBadge} = useBadges();

    const items = getBadges().map(badge => ({id: badge.badge_id, label: badge.name}));
    const value = badgeData.prerequisites.map(({badge_id, required}) => {
        const badge = getBadge({badgeId: badge_id});
        return {id: badge.badge_id, required: required};
    });

    return <div className="w-100 d-inline-block text-start">
        <MultiSelectControlTwoLists
            items={items}
            value={value}
            onChange={(items) => {
                const nextState = {
                    ...badgeData,
                    prerequisites: items.map((item, sequenceNo) => ({
                        badge_id: item.id,
                        required: item.required,
                        sequence_no: sequenceNo
                    })),
                };
                setBadgeData(nextState);
            }}
            filterLabel="Filter badges"
            addedItemsLabel="Added Badges"
            allowRequiredSwitch={false}
            enableOrdering={true}
        />
    </div>
}
