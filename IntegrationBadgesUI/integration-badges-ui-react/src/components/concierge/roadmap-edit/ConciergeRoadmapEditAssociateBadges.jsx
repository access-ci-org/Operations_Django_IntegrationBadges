import {useBadges} from "../../../contexts/BadgeContext.jsx";
import MultiSelectControlTwoLists from "../badge-edit/MultiSelectControlTwoLists.jsx";

export default function ConciergeRoadmapEditAssociateBadges({roadmapData, setRoadmapData}) {
    const {getBadges} = useBadges();

    const items = getBadges().map(badge => ({id: badge.badge_id, label: badge.name}));
    const value = roadmapData.badges.map(({badge_id, required}) => ({id: badge_id, required}));

    return <div className="w-100 d-inline-block text-start">
        <MultiSelectControlTwoLists
            items={items}
            value={value}
            onChange={(items) => {
                setRoadmapData({
                    ...roadmapData,
                    badges: items.map((item, sequenceNo) => ({
                        badge_id: item.id,
                        required: item.required,
                        sequence_no: sequenceNo
                    })),
                });
            }}
            filterLabel="Filter badges"
        />

        <div className="w-100 pt-4">
            <h3>Need to create a new badge?</h3>
            <p style={{maxWidth: 400}}>Once the roadmap is complete, please navigate to the “Create
                New Badges” section on the Home
                page to add new badges. In that section, you can also link each new badge to an
                existing
                roadmap.</p>
        </div>
    </div>
}
