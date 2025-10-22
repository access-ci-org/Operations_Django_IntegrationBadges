import {ConciergeRoadmapEditDetailsV2} from "./ConciergeRoadmapEditDetails.jsx";
import {useBadges} from "../../../contexts/BadgeContext.jsx";

export default function ConciergeRoadmapEditReviewAndEdit({roadmapData, setRoadmapData, onClickEditBadges}) {
    const {getBadge} = useBadges();

    const requiredBadges = [];
    const recommendedBadges = [];

    for (let i = 0; i < roadmapData.badges.length; i++) {
        const {badge_id, required} = roadmapData.badges[i];
        if (required) requiredBadges.push(getBadge({badgeId: badge_id}));
        else recommendedBadges.push(getBadge({badgeId: badge_id}));
    }

    return <div className="w-100 d-inline-block text-start">
        <h3 className="text-black pb-4 fw-medium">Roadmap Description</h3>

        <ConciergeRoadmapEditDetailsV2 roadmapData={roadmapData} setRoadmapData={setRoadmapData}/>

        <div className="d-flex flex-row pb-4 pt-5">
            <h3 className="text-black fw-medium flex-fill">Associated Badges</h3>
            <button className="btn btn-link" onClick={onClickEditBadges}>Edit</button>
        </div>

        <div className="row pb-5">
            <div className="col-sm-6 pe-3">
                Required Badges
            </div>
            <div className="col-sm-6">
                {requiredBadges.map((badge, badgeIndex) => <div key={badgeIndex}>{badge.name}</div>)}
            </div>
        </div>

        <div className="row pt-3">
            <div className="col-sm-6 pe-3">
                Recommended Badges
            </div>
            <div className="col-sm-6">
                {recommendedBadges.map((badge, badgeIndex) => <div key={badgeIndex}>{badge.name}</div>)}
            </div>
        </div>

    </div>
}
