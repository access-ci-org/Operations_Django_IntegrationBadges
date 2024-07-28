import BadgeList from "../../../resourceDetail/badgeSection/badgeContainer/views/ListView/BadgeList";
import {useEffect, useState} from "react";

export default function ResourceCardBadgeModal({id, badges}) {
    const [modifiedBadges, setModifiedBadges] = useState([]);

    useEffect(() => {
        const processedBadges = badges.map(({ badge, ...rest }) => ({
            ...badge,
            ...rest
        }));
        setModifiedBadges(processedBadges);
    }, [badges]);

    const handleCloseClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="resourceCardBadgeModal" aria-hidden="true"
             onClick={handleCloseClick}>
            <div className="modal-dialog modal-dialog-centered modal-md-lg plan-modal large">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <h2>All Available Badges</h2>
                            <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseClick}
                                    style={{color: '#107080'}} />
                        </div>
                        <div className="badge-modal-content">
                            <BadgeList data={modifiedBadges}/>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button"
                               className="btn"
                               data-bs-dismiss="modal"
                               aria-label="Close"
                               onClick={handleCloseClick}>Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}