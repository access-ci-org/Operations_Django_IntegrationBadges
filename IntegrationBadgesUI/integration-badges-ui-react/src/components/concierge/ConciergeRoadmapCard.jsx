import {Link} from "react-router-dom";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {DocumentationRouteUrls} from "../../pages/docs/DocumentationRoute.jsx";
import {ConciergeRouteUrls} from "../../pages/concierge/ConciergeRoute.jsx";

export function ConciergeRoadmapCard({roadmapId}) {
    const {getRoadmap} = useRoadmaps();

    if (roadmapId === null) {
        return <div className="w-100 h-100 p-2 pt-4">
            <div className="w-100 h-100 rounded-4 p-2 d-flex flex-column bg-gray-200 border-black border border-1">
                <Link to={ConciergeRouteUrls.ROADMAP_NEW} className="btn btn-link w-100 h-100 text-center align-content-center">
                    <span className="fw-normal">
                        + Create New
                    </span>
                </Link>
            </div>
        </div>
    }

    const roadmap = getRoadmap({roadmapId});

    const roadmapNameSegments = /(ACCESS Allocated|ACCESS Affiliated|ACCESS)? *(.*)/.exec(roadmap.name);

    if (roadmap) {
        return <div className="w-100 h-100 p-2 pt-4">
            <div
                className="w-100 h-100 d-flex flex-column rounded-3 border-black border border-1 position-relative concierge-roadmap-card bg-white">
                <div className="w-100 position-absolute text-center roadmap-card-icon-row">
                    <div className="rounded-circle p-3 border d-inline-block bg-white">
                        <div className="background-image-center-no-repeat roadmap-card-icon"
                             style={{backgroundImage: `url(${roadmap.graphic})`}}>
                        </div>
                    </div>
                </div>
                <div className="w-100 p-2 text-center">
                    <h3 className="w-100 text-center text-black fs-6">{roadmapNameSegments[1]}</h3>
                    <strong className="w-100 text-center text-medium fs-6">
                        {roadmapNameSegments[2]}
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
