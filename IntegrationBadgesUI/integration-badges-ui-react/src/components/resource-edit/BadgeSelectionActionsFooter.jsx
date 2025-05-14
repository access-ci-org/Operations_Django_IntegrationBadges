import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../LoadingBlock.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";

export default function BadgeSelectionActionsFooter({resourceId, roadmapId, selected, next, prev, showSave}) {
    const navigate = useNavigate();

    const {getResource, setResourceRoadmap} = useResources();
    const {getRoadmapBadges} = useRoadmaps();

    const [saveProcessing, setSaveProcessing] = useState(false);
    const [showSavedModal, setShowSavedModal] = useState(false);

    const resource = getResource({resourceId});
    const roadmapBadges = getRoadmapBadges({roadmapId});

    const selectedBadgeIds = [];

    const handleSave = async () => {
        setSaveProcessing(true);
        await setResourceRoadmap({resourceId, roadmapId: roadmapId, badgeIds: selectedBadgeIds});
        setSaveProcessing(false);
        setShowSavedModal(true);
    };

    const navigateToResourcePage = () => {
        navigate(`/resources/${resourceId}/roadmaps/${roadmapId}`);
    };

    const navigateToDashboard = () => {
        navigate("/organizations");
    };

    if (!!resource && !!roadmapBadges) {

        for (let i = 0; i < roadmapBadges.length; i++) {
            const badge = roadmapBadges[i];
            const badgeId = badge.badge_id;

            if (!!selected(badgeId)) {
                selectedBadgeIds.push(badgeId);
            }
        }

        return <div className="w-100 text-end pt-3 pb-5">
            <button className="btn btn-outline-dark rounded-1 m-1" onClick={prev}>
                Cancel
            </button>

            {!showSave ?
                <button className="btn btn-dark rounded-1 m-1 ${}" disabled={selectedBadgeIds.length === 0}
                        onClick={next}>
                    Continue with {selectedBadgeIds.length} Selected Badges
                </button> :
                saveProcessing ?
                    <button className="btn btn-dark rounded-1 m-1">
                        <span className="spinner-border spinner-border-sm me-3" role="status" aria-hidden="true"></span>
                        Loading...
                    </button> : <button className="btn btn-dark rounded-1 m-1" disabled={selectedBadgeIds.length === 0}
                                        onClick={handleSave}>
                        Save Selection
                    </button>}

            <Modal show={showSavedModal} onHide={setShowSavedModal.bind(this, false)}
                   onExit={navigateToResourcePage}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>
                        <i className="bi bi-floppy-fill"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Changes Have Been Successfully Saved
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-dark rounded-1"
                            onClick={navigateToDashboard}>
                        Go to Dashboard
                    </button>
                    <button className="btn btn-dark rounded-1"
                            onClick={navigateToResourcePage}>
                        Resource Overview
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    } else {
        return <LoadingBlock/>
    }
}
