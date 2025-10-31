import LoadingBlock from "../../components/util/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "./ConciergeRoute.jsx";
import {useEffect, useState} from "react";
import ConciergeRoadmapEditDetails from "../../components/concierge/roadmap-edit/ConciergeRoadmapEditDetails.jsx";
import ConciergeRoadmapEditAssociateBadges
    from "../../components/concierge/roadmap-edit/ConciergeRoadmapEditAssociateBadges.jsx";
import ConciergeRoadmapEditReviewAndEdit
    from "../../components/concierge/roadmap-edit/ConciergeRoadmapEditReviewAndEdit.jsx";
import {Modal} from "react-bootstrap";
import {scrollToTop} from "../../components/util/scroll.jsx";
import EditProgressMarker from "../../components/concierge/EditProgressMarker.jsx";

export default function ConciergeRoadmapEdit() {
    const {roadmapId} = useParams();

    const navigate = useNavigate();
    const {fetchRoadmap, setRoadmap, getRoadmap} = useRoadmaps();

    const roadmap = getRoadmap({roadmapId});

    const [activeSectionIndex, seActiveSectionIndex] = useState(roadmapId ? 2 : 0);
    const [roadmapData, setRoadmapData] = useState({
        "name": "",
        "executive_summary": "",
        "infrastructure_types": "",
        "integration_coordinators": "",
        "status": "Draft",
        "badges": [
            // {
            //     "sequence_no": 0,
            //     "required": true,
            //     "badge_id": 1
            // }
        ]
    });

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const areRoadmapDetailsValid = roadmapData.name.trim().length > 0
        && roadmapData.executive_summary.trim().length > 0
        && roadmapData.infrastructure_types.trim().length > 0
        && roadmapData.integration_coordinators.trim().length > 0
        && roadmapData.status.trim().length > 0;

    useEffect(() => {
        scrollToTop();
    }, [activeSectionIndex]);

    useEffect(() => {
        setRoadmapData({
            ...roadmapData,
            ...roadmap,
            "graphic": ""
        })
    }, [roadmapId, !!roadmap]);

    useEffect(() => {
        !!roadmapId && fetchRoadmap({roadmapId});
    }, [roadmapId]);


    const sections = [
        {
            title: "Let’s Describe the New Roadmap",
            component: <ConciergeRoadmapEditDetails roadmapData={roadmapData} setRoadmapData={setRoadmapData}/>
        },
        {
            title: "Associate Badges",
            component: <ConciergeRoadmapEditAssociateBadges roadmapData={roadmapData} setRoadmapData={setRoadmapData}/>
        },
        {
            title: "Review & Edit",
            component: <ConciergeRoadmapEditReviewAndEdit roadmapData={roadmapData} setRoadmapData={setRoadmapData}
                                                          onClickEditBadges={seActiveSectionIndex.bind(this, 1)}/>
        },
    ];

    const activeSection = sections[activeSectionIndex];

    const publishRoadmap = async () => {
        try {
            await setRoadmap({roadmapId, roadmapData});
            // navigate(ConciergeRouteUrls.ROADMAPS);
            setShowSavedModal(true);
        } catch (error) {
            setShowErrorModal(true);
        }
    };

    if (!roadmap || !!roadmap) {
        return <div className="container">
            <div className="row mt-2 p-3">
                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">{activeSection.title}</h1>

                    <div className="w-100 text-center position-relative pt-5 pb-5">
                        <div className="d-inline-block w-100" style={{maxWidth: 500, minWidth: 300}}>
                            <EditProgressMarker steps={sections} current={activeSectionIndex}/>
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
                                    onClick={publishRoadmap}
                                    disabled={!areRoadmapDetailsValid}>
                                Publish
                            </button> :
                            <button className="btn btn-dark ps-3 pe-3 m-1"
                                    onClick={seActiveSectionIndex.bind(this, activeSectionIndex + 1)}
                                    disabled={!areRoadmapDetailsValid}>
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
                    The Roadmap “{roadmapData.name}” is Successfully Published.
                </Modal.Body>
                <Modal.Footer>
                    <Link className="btn btn-outline-dark rounded-1" to={ConciergeRouteUrls.INDEX}>
                        Go to Home Page
                    </Link>
                    <Link className="btn btn-dark rounded-1" to={ConciergeRouteUrls.ROADMAPS}>
                        Go to Roadmaps
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

                    <p>Integration Dashboard <strong>roadmap.maintainer</strong> permission</p>
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
