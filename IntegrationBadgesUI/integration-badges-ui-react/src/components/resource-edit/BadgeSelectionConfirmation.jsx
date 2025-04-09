import {BadgeCardRowWithAddRemove, BadgeCardRowWithCheckboxes, RoadmapCard} from "./resource-edit-page-cards.jsx";
import BadgeSelection from "./BadgeSelectionHeader.jsx";
import BadgeSelectionHeader from "./BadgeSelectionHeader.jsx";

export default function BadgeSelectionConfirmation({
                                                       organization,
                                                       resource, selectedRoadmaps,
                                                       selectedBadges,
                                                       notSelectedBadges,
                                                       selected,
                                                       toggle,
                                                       next,
                                                       prev
                                                   }) {
    return <>
        <div className="row pt-5">
            <h1>Step 2 of 2: Review & Approve Resource Badge Selections</h1>
            <p>
                In this step, review and confirm your selections. Once you submit your selections your roadmap will
                switch to the “in progress” stage, and any team members assigned will see badges/tasks in their ACCESS
                Dashboard.
            </p>
        </div>
        <BadgeSelectionHeader organization={organization} resource={resource} selectedRoadmaps={selectedRoadmaps}/>
        <div className="row pt-5">
            <h2>Confirm the Following Badges and Assignments</h2>
            <div className="w-100 pt-2 pb-5">
                {selectedBadges && selectedBadges.map((badge) => {
                    const badgeId = badge.badge_id;
                    return <div className="w-100 pt-2" key={badgeId}>
                        <BadgeCardRowWithAddRemove resource={resource} badge={badge} selected={selected(badgeId)}
                                                   toggle={toggle.bind(badgeId)}/>
                    </div>
                })}
                {selectedBadges && selectedBadges.length === 0 && <div className="w-100 p-3 text-center lead">
                    No badges available
                </div>}
            </div>

            <h2>Recommended Badges Skipped for Integration ({notSelectedBadges.length})</h2>
            <div className="w-100 pt-2 pb-5">
                {notSelectedBadges && notSelectedBadges.map((badge) => {
                    const badgeId = badge.badge_id;
                    return <div className="w-100 pt-2" key={badgeId}>
                        <BadgeCardRowWithAddRemove resource={resource} badge={badge} selected={selected(badgeId)}
                                                   toggle={toggle.bind(badgeId)}/>
                    </div>
                })}
                {notSelectedBadges && notSelectedBadges.length === 0 &&
                    <div className="w-100 p-3 text-center lead">
                        No badges available
                    </div>}
            </div>
        </div>

        <div className="w-100 text-end pt-3 pb-5">
            <button className="btn btn-outline-dark m-1" onClick={prev}>
                Cancel
            </button>
            <button className="btn btn-dark m-1 ${}" disabled={selectedBadges.length === 0} onClick={next}>
                Save Details
            </button>
        </div>
    </>
}