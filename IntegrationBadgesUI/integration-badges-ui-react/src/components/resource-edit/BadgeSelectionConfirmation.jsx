import {BadgeCardRowWithAddRemove} from "./resource-edit-page-cards.jsx";
import BadgeSelectionHeader from "./BadgeSelectionHeader.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../LoadingBlock.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function BadgeSelectionConfirmation({resourceId, roadmapId, selected, toggle, next, prev}) {
    const navigate = useNavigate();

    const {getResource, setResourceRoadmap} = useResources();
    const {getRoadmapBadges} = useRoadmaps();

    const [saveProcessing, setSaveProcessing] = useState(false);

    const resource = getResource({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});

    const selectedBadgeIds = [];
    const selectedBadges = [];
    const notSelectedBadges = [];

    const handleSave = async () => {
        setSaveProcessing(true);
        await setResourceRoadmap({resourceId, roadmapId: roadmapId, badgeIds: selectedBadgeIds});
        setSaveProcessing(false);
        navigate(`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}`)
    };

    if (!!resource && !!roadmapBadges) {

        for (let i = 0; i < roadmapBadges.length; i++) {
            const badge = roadmapBadges[i];
            const badgeId = badge.badge_id;

            if (!selected(badgeId)) {
                notSelectedBadges.push(badge);
            } else {
                selectedBadgeIds.push(badgeId);
                selectedBadges.push(badge);
            }
        }

        return <>
            <div className="row pt-5">
                <h1>Step 2 of 2: Review & Approve Resource Badge Selections</h1>
                <p>
                    In this step, review and confirm your selections. Once you submit your selections your roadmap will
                    switch to the “in progress” stage, and any team members assigned will see badges/tasks in their
                    ACCESS
                    Dashboard.
                </p>
            </div>
            <BadgeSelectionHeader resourceId={resourceId} roadmapId={roadmapId}/>
            <div className="row pt-5">
                <h2>Confirm the Following Badges and Assignments</h2>
                <div className="w-100 pt-2 pb-5">
                    {selectedBadges && selectedBadges.map((badge) => {
                        const badgeId = badge.badge_id;
                        return <div className="w-100 pt-2" key={badgeId}>
                            <BadgeCardRowWithAddRemove resourceId={resourceId} badgeId={badgeId}
                                                       selected={selected(badgeId)}
                                                       toggle={toggle.bind(null, badgeId)}/>
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
                            <BadgeCardRowWithAddRemove resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId}
                                                       selected={selected(badgeId)}
                                                       toggle={toggle.bind(null, badgeId)}/>
                        </div>
                    })}
                    {notSelectedBadges && notSelectedBadges.length === 0 &&
                        <div className="w-100 p-3 text-center lead">
                            No badges available
                        </div>}
                </div>
            </div>

            <div className="w-100 text-end pt-3 pb-5">
                <button className="btn btn-outline-dark rounded-1 m-1" onClick={prev}>
                    Cancel
                </button>


                {saveProcessing ?
                    <button className="btn btn-dark rounded-1 m-1">
                        <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                        Loading...
                    </button> :
                    <button className="btn btn-dark rounded-1 m-1" disabled={selectedBadges.length === 0}
                            onClick={handleSave}>
                        Save Selection
                    </button>}
            </div>
        </>
    } else {
        return <LoadingBlock/>
    }
}