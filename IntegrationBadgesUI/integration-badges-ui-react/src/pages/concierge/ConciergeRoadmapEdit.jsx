import LoadingBlock from "../../components/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "./ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "../../components/concierge/roadmap-edit/RoadmapEditProgressMarker.jsx";
import {useEffect, useState} from "react";
import ConciergeRoadmapEditDetails from "../../components/concierge/roadmap-edit/ConciergeRoadmapEditDetails.jsx";
import ConciergeRoadmapEditAssociateBadges from "../../components/concierge/roadmap-edit/ConciergeRoadmapEditAssociateBadges.jsx";
import ConciergeRoadmapEditReviewAndEdit from "../../components/concierge/roadmap-edit/ConciergeRoadmapEditReviewAndEdit.jsx";

export default function ConciergeRoadmapEdit() {
    const {roadmapId} = useParams();

    const {fetchRoadmap, getRoadmap} = useRoadmaps();

    const roadmap = getRoadmap({roadmapId});

    const [actionSectionIndex, seActiveSectionIndex] = useState(0);
    const [roadmapData, setRoadmapData] = useState({
        "name": "",
        "executive_summary": "",
        "infrastructure_types": "",
        "integration_coordinators": "",
        "status": "Draft",
        "badges": [
            {
                "sequence_no": 0,
                "required": true,
                "badge": {
                    "badge_id": 1,
                    "name": "ACCESS Resource Description"
                }
            }
        ],
        ...roadmap,
        "graphic": "",
    });


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

    const actionSection = sections[actionSectionIndex];

    if (!roadmap || !!roadmap) {
        return <div className="container">
            <div className="row mt-2 p-3">
                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">{actionSection.title}</h1>

                    <div className="w-100 text-center position-relative pt-5 pb-5">
                        <div className="d-inline-block w-100" style={{maxWidth: 500, minWidth: 300}}>
                            <RoadmapEditProgressMarker steps={[1, 2, 3]} current={actionSectionIndex}/>
                        </div>
                        <Link to={ConciergeRouteUrls.ROADMAPS} className="btn btn-outline-secondary position-absolute"
                              style={{right: 0}}>Cancel/Discard
                        </Link>
                    </div>

                    <div className="w-100 text-center">
                        <div className="w-100 d-inline-block text-start" style={{maxWidth: 600, minWidth: 300}}>
                            {actionSection.component}
                        </div>
                    </div>

                    <div className="w-100 text-end pt-5 pb-5">
                        <button className="btn btn-outline-dark ps-3 pe-3 m-1"
                                onClick={seActiveSectionIndex.bind(this, actionSectionIndex - 1)}
                                disabled={actionSectionIndex === 0}>
                            Back
                        </button>
                        <button className="btn btn-dark ps-3 pe-3 m-1"
                                onClick={seActiveSectionIndex.bind(this, actionSectionIndex + 1)}
                                disabled={actionSectionIndex === sections.length - 1}>
                            Continue
                        </button>
                    </div>

                </div>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
