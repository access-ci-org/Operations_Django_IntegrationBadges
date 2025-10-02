import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import ResourceBadgeIcon from "../resource/resource-badge/ResourceBadgeIcon.jsx";

export function ConciergeRoadmapCard({roadmapId}) {
    const {getRoadmap} = useRoadmaps();

    const roadmap = getRoadmap({roadmapId});

    if (roadmap) {
        return <div className="w-100 h-100 p-2 pt-5">
            <div
                className="w-100 h-100 d-flex flex-column rounded-3 border-gray-200 border border-1 position-relative concierge-roadmap-card bg-white">
                <div className="w-100 position-absolute text-center roadmap-card-icon-row">
                    <div className="rounded-circle p-3 border d-inline-block bg-white">
                        <div className="background-image-center-no-repeat roadmap-card-icon"
                             style={{backgroundImage: `url(${roadmap.graphic})`}}>
                        </div>
                    </div>
                </div>
                <div className="w-100 p-2 text-center">
                    <h3 className="w-100 text-center text-black fs-6">{roadmap.name}</h3>
                    <strong className="w-100 text-center text-medium fs-6">
                        {roadmap.infrastructure_types}
                    </strong>
                </div>
                <div className="w-100 text-end p-1">
                    <Link className="btn btn-link p-2" to=""><i className="bi bi-pencil-fill"></i></Link>
                    <Link className="btn btn-link p-2" to=""><i className="bi bi-trash-fill"></i></Link>
                </div>
            </div>
        </div>
    }
}
