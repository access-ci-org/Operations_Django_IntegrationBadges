import {useEffect, useState} from "react";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import LoadingBlock from "../../components/LoadingBlock.jsx";
import {BadgeWorkflowStatus, useBadges} from "../../contexts/BadgeContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {Link} from "react-router-dom";
import Translate from "../../locales/Translate.jsx";
import {ConciergeRoadmapCard} from "../../components/concierge/ConciergeRoadmapCard.jsx";
import BadgeIcon from "../../components/badge/BadgeIcon.jsx";
import {Fade} from "react-bootstrap";
import GridAndListSwitch from "../../components/GridAndListSwitch.jsx";

export default function ConciergeRoadmaps() {
    const {getRoadmaps} = useRoadmaps();

    const roadmaps = getRoadmaps();

    if (roadmaps) {
        return <div className="container">
            <div className="row visually-hidden">
                <h1>Concierge Dashboard - Roadmaps</h1>
            </div>

            <div className="row mt-2 p-3">

                <div className="col-12 p-0 pb-4">
                    <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                        <div className="w-100 d-flex flex-row p-0" style={{borderBottom: "1px dashed"}}>
                            <h2 className="text-medium">Roadmaps</h2>
                            <div className="flex-fill">
                            </div>
                            <GridAndListSwitch/>
                        </div>
                        <div className="w-100 text-end pt-4">
                            Sort By:
                            <Link className="btn btn-link ms-3 me-3 fw-light" to="">
                                <span className="text-black">View All</span>
                            </Link>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6 p-2">
                                <ConciergeRoadmapCard roadmapId={null}/>
                            </div>
                            {roadmaps && roadmaps.map((roadmap, roadmapIndex) => {
                                return <div key={roadmapIndex} className={`col-lg-3 col-md-4 col-sm-6 p-2`}>
                                    <ConciergeRoadmapCard roadmapId={roadmap.roadmap_id}/>
                                </div>
                            })}
                        </div>
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
