import LoadingBlock from "../../components/LoadingBlock.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "./ConciergeRoute.jsx";
import BadgeEditProgressMarker from "../../components/concierge/badge-edit/BadgeEditProgressMarker.jsx";
import {useEffect, useState} from "react";
import ConciergeBadgeEditDetails from "../../components/concierge/badge-edit/ConciergeBadgeEditDetails.jsx";
import ConciergeBadgeEditAssociatePrerequisiteBadges
    from "../../components/concierge/badge-edit/ConciergeBadgeEditAssociatePrerequisiteBadges.jsx";
import ConciergeBadgeEditReviewAndEdit
    from "../../components/concierge/badge-edit/ConciergeBadgeEditReviewAndEdit.jsx";
import {Modal} from "react-bootstrap";
import {scrollToTop} from "../../components/scroll.jsx";

export default function ConciergeBadgeEdit() {
    const {badgeId} = useParams();

    const navigate = useNavigate();
    const {fetchBadges, fetchBadge, getBadge} = useBadges();

    const badge = getBadge({badgeId});

    const [activeSectionIndex, seActiveSectionIndex] = useState(badgeId ? 3 : 0);
    const [badgeData, setBadgeData] = useState({
        "badge_id": null,
        "prerequisites": [
            // {
            //     "sequence_no": 0,
            //     "badge_id": 1
            // },
            // {
            //     "sequence_no": 1,
            //     "badge_id": 5
            // }
        ],
        "name": "",
        "researcher_summary": "",
        "resource_provider_summary": "",
        "verification_summary": "",
        "verification_method": "Manual",
        "default_badge_access_url": "",
        "default_badge_access_url_label": "",

        ...badge,
        "graphic": "",
    });

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const areBadgeDetailsValid = badgeData.name.length > 0
        && badgeData.researcher_summary.length > 0
        && badgeData.resource_provider_summary.length > 0
        && badgeData.default_badge_access_url.length > 0
        && badgeData.default_badge_access_url_label.length > 0;

    useEffect(() => {
        scrollToTop();
    }, [activeSectionIndex]);

    useEffect(() => {
        !!badgeId && fetchBadge({badgeId});
    }, [badgeId]);

    const sections = [
        {
            title: "Describe A New Badge",
            component: <ConciergeBadgeEditDetails badgeData={badgeData} setBadgeData={setBadgeData}/>
        },
        {
            title: "Associate Tasks",
            component: <div>This is yet to be implemented. Click Next</div>
        },
        {
            title: "Select Prerequisite Badges",
            component: <ConciergeBadgeEditAssociatePrerequisiteBadges badgeData={badgeData}
                                                                      setBadgeData={setBadgeData}/>
        },
        {
            title: "Review & Edit",
            component: <ConciergeBadgeEditReviewAndEdit
                badgeData={badgeData} setBadgeData={setBadgeData}
                onClickEditTasks={seActiveSectionIndex.bind(this, 1)}
                onClickEditPrerequisiteBadges={seActiveSectionIndex.bind(this, 2)}/>
        },
    ];

    const activeSection = sections[activeSectionIndex];

    const publishBadge = async () => {
        try {
            //await setBadge({badgeId, badgeData});
            // navigate(ConciergeRouteUrls.BADGES);
            setShowSavedModal(true);
        } catch (error) {
            setShowErrorModal(true);
        }
    };

    if (!badge || !!badge) {
        return <div className="container">
            <div className="row mt-2 p-3">
                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">{activeSection.title}</h1>

                    <div className="w-100 text-center position-relative pt-5 pb-5">
                        <div className="d-inline-block w-100" style={{maxWidth: 500, minWidth: 300}}>
                            <BadgeEditProgressMarker steps={sections} current={activeSectionIndex}/>
                        </div>
                        <Link to={ConciergeRouteUrls.ROADMAPS} className="btn btn-outline-secondary position-absolute"
                              style={{right: 0}}>Cancel/Discard
                        </Link>
                    </div>

                    <div className="w-100 text-center">
                        <div className="w-100 d-inline-block text-start" style={{maxWidth: 800, minWidth: 300}}>
                            {activeSection.component}
                        </div>
                    </div>

                    <div className="w-100 text-end pt-5 pb-5">
                        {activeSectionIndex === 0 ?
                            <Link className="btn btn-outline-dark ps-3 pe-3 m-1" to={ConciergeRouteUrls.ROADMAPS}>
                                Back
                            </Link> :
                            <button className="btn btn-outline-dark ps-3 pe-3 m-1"
                                    onClick={seActiveSectionIndex.bind(this, activeSectionIndex - 1)}>
                                Back
                            </button>}

                        {activeSectionIndex === sections.length - 1 ?
                            <button className="btn btn-dark ps-3 pe-3 m-1"
                                    onClick={publishBadge}
                                    disabled={!areBadgeDetailsValid}>
                                Publish
                            </button> :
                            <button className="btn btn-dark ps-3 pe-3 m-1"
                                    onClick={seActiveSectionIndex.bind(this, activeSectionIndex + 1)}
                                    disabled={!areBadgeDetailsValid}>
                                Continue
                            </button>}

                    </div>

                </div>
            </div>

            <Modal show={showSavedModal}>
                <Modal.Header className="bg-light">
                    <Modal.Title>
                        <i className="bi bi-check-circle"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The Badge “{badgeData.name}” is Successfully Published.
                </Modal.Body>
                <Modal.Footer>
                    <Link className="btn btn-outline-dark rounded-1" to={ConciergeRouteUrls.INDEX}>
                        Go to Home Page
                    </Link>
                    <Link className="btn btn-dark rounded-1" to={ConciergeRouteUrls.ROADMAPS}>
                        Go to Badges
                    </Link>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={setShowErrorModal.bind(this, false)}>
                <Modal.Header closeButton className="bg-danger-subtle">
                    <Modal.Title>
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        You don't have permissions to make this change. If you should have it, please submit
                        an
                        ACCESS ticket requesting:</p>

                    <p>Integration Dashboard <strong>badge.maintainer</strong> permission</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-dark rounded-1"
                            onClick={setShowErrorModal.bind(this, false)}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>

        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
