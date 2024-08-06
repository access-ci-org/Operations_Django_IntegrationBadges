import React, {useEffect, useState} from "react";
import ResourceCardBadgeList from "./ResourceCardBadgeList";

/**
 * A modal that displays all available badges for a resource. It only appears
 * when there are more badges than can be displayed in the resource card.
 * @param {string} id - The id of the modal.
 * @param {Array<ResourceListResourceBadge>} badges - The available (Verified) badges for the resource.
 */
export default function ResourceCardBadgeModal({id, badges}) {
    const [modifiedBadges, setModifiedBadges] = useState([]);

    // bring up the badge object to be at the same level as the rest of the badge data to imitate a RoadmapBadge object
    useEffect(() => {
        const processedBadges = badges.map(({ badge, ...rest }) => ({
            ...badge,
            ...rest
        }));
        setModifiedBadges(processedBadges);
    }, [badges]);

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="resourceCardBadgeModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-md-lg plan-modal large">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <h2>All Available Badges</h2>
                            <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    style={{color: '#107080'}}/>
                        </div>
                        <div className="badge-modal-content">
                            <ResourceCardBadgeList data={modifiedBadges}/>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button"
                               className="btn"
                               data-bs-dismiss="modal"
                               aria-label="Close">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}