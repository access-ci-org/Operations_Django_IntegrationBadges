import {ConciergeBadgeEditDetailsV2} from "./ConciergeBadgeEditDetails.jsx";
import {useBadges} from "../../../contexts/BadgeContext.jsx";

export default function ConciergeBadgeEditReviewAndEdit({badgeData, setBadgeData, onClickEditTasks, onClickEditPrerequisiteBadges}) {
    const {getBadge} = useBadges();

    const requiredBadges = [];
    const recommendedBadges = [];

    for (let i = 0; i < badgeData.prerequisites.length; i++) {
        const {badge_id, required} = badgeData.prerequisites[i];
        if (required) requiredBadges.push(getBadge({badgeId: badge_id}));
        else recommendedBadges.push(getBadge({badgeId: badge_id}));
    }

    return <div className="w-100 d-inline-block text-start">
        <h3 className="text-black pb-4 fw-medium">Badge Description</h3>

        <ConciergeBadgeEditDetailsV2 badgeData={badgeData} setBadgeData={setBadgeData}/>


        <div className="d-flex flex-row pb-4 pt-5">
            <h3 className="text-black fw-medium flex-fill">Associated Tasks</h3>
            <button className="btn btn-link" onClick={onClickEditTasks}>Edit</button>
        </div>

        <div className="d-flex flex-row pb-4 pt-5">
            <h3 className="text-black fw-medium flex-fill">Prerequisite Badges</h3>
            <button className="btn btn-link" onClick={onClickEditPrerequisiteBadges}>Edit</button>
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
