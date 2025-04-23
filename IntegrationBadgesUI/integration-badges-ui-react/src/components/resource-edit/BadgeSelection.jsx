import {BadgeCardRowWithCheckboxes, RoadmapCard} from "./resource-edit-page-cards.jsx";
import BadgeSelectionHeader from "./BadgeSelectionHeader.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../LoadingBlock.jsx";

export default function BadgeSelection({resourceId, roadmapId, selected, toggle, prev, next}) {
    const {getResource} = useResources();
    const {getRoadmapBadges} = useRoadmaps();

    const resource = getResource({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});

    if (!!resource && !!roadmapBadges) {
        const selectedBadges = roadmapBadges.filter(badge => selected(badge.badge_id))

        return <>
            <div className="row pt-5">
                <h1>Step 1 of 2: Select Resource-Specific Badges</h1>
                <p>
                    Choose the integration badges for your team to complete. Each badge represents a key integration
                    step,
                    and some badges will have multiple tasks that may need different team members to accomplish.
                </p>
            </div>
            <BadgeSelectionHeader resourceId={resourceId} roadmapId={roadmapId}/>
            <div className="row pt-5">
                <h2>Recommended badges for your resource</h2>
                <div className="w-100 pt-2 pb-5">
                    {roadmapBadges && roadmapBadges.map((badge) => {
                        const badgeId = badge.badge_id;
                        return <div className="w-100 pt-2" key={badgeId}>
                            <BadgeCardRowWithCheckboxes resource={resource} badge={badge} selected={selected(badgeId)}
                                                        toggle={toggle.bind(null, badgeId)}/>
                        </div>
                    })}
                    {roadmapBadges && roadmapBadges.length === 0 && <div className="w-100 p-3 text-center lead">
                        No badges available
                    </div>}
                </div>
            </div>

            <div className="w-100 text-end pt-3 pb-5">
                <button className="btn btn-outline-dark m-1" onClick={prev}>
                    Cancel
                </button>
                <button className="btn btn-dark m-1 ${}" disabled={selectedBadges.length === 0} onClick={next}>
                    Continue with {selectedBadges.length} Selected Badges
                </button>
            </div>
        </>
    } else {
        return <LoadingBlock/>
    }
}