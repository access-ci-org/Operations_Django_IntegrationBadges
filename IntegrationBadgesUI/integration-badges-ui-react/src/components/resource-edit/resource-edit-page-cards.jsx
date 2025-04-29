import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import {useBadges} from "../../contexts/BadgeContext.jsx";

export function RoadmapCard({resourceId, roadmapId, selected, toggle}) {
    const {getResource} = useResources();
    const {getRoadmap} = useRoadmaps();

    const resource = getResource({resourceId});
    const roadmap = getRoadmap({roadmapId});

    if (roadmap) {
        return <div className="w-100 h-100 p-4 pt-5">
            <div
                className="w-100 h-100 d-flex flex-column rounded-3 border-gray-200 border border-1 position-relative roadmap-card">
                <div className="w-100 position-absolute text-center roadmap-card-icon-row">
                    <div className="rounded-circle p-3 border d-inline-block bg-white">
                        <div className="background-image-center-no-repeat roadmap-card-icon"
                             style={{backgroundImage: `url(${roadmap.graphic})`}}>
                        </div>
                    </div>
                </div>
                <h3 className="w-100 ps-5 pe-5 pt-2 pb-2 text-center">{roadmap.name}</h3>
                <p className="col-sm-12 ps-5 pe-5 pt-2 pb-4 flex-fill">
                    {roadmap.executive_summary}
                </p>

                {selected &&
                    <div className="w-100 p-3 text-center">
                        <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}`}
                              className="btn btn-link m-2">View</Link>
                        <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}/edit`}
                              className="btn btn-link m-2">Edit</Link>
                    </div>}

                <button
                    className={`btn btn-link w-100 p-3 text-center rounded-bottom-3 text-decoration-none ${selected ? 'bg-dark' : 'bg-light'}`}
                    role="button" onClick={toggle}>
                    {selected ?
                        <span><i
                            className="bi bi-check-circle-fill"></i>&nbsp;&nbsp;Selected</span> : "Select the Roadmap"}

                </button>
            </div>
        </div>
    } else {
        "Nothing"
    }
}

export function BadgeCardRow({resourceId, roadmapId, badgeId, selected, toggle, toggleComponent}) {
    const {getResource} = useResources();
    const {getRoadmap} = useRoadmaps();
    const {getBadge} = useBadges();

    const resource = getResource({resourceId});
    const badge = getBadge({badgeId});
    const roadmap = getRoadmap({roadmapId});

    if (resource && badge) {
        return <div className="row rounded-3 border-gray-200 border border-1">
            <div className="col-sm-4 ps-0 d-flex flex-row align-items-center">
                {toggleComponent}
                <div className="mt-3 mb-3 ms-2 me-2 background-image-center-no-repeat badge-icon-small"
                     style={{backgroundImage: `url(${badge.graphic})`}}>
                </div>
                <h4 className="flex-fill p-2 m-0">{badge.name}</h4>
            </div>
            <p className="col-sm-5 pt-2 pb-2 m-0 align-content-center">
                {badge.resource_provider_summary}
            </p>
            <div className="col-sm-3 pt-2 pb-2 align-content-center">
                <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}/badges/${badge.badge_id}`}
                      className="w-100 btn btn-secondary rounded-1 btn-sm disabled">
                    View Additional Badge Details
                </Link>
            </div>
        </div>
    }
}


export function BadgeCardRowWithCheckboxes({resourceId, roadmapId, badgeId, selected, toggle}) {
    const toggleComponent = <div
        className={`p-3 h-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center ${selected ? 'bg-light' : 'bg-gray-100'}`}
        role="button" onClick={toggle}>
        <Form.Check name="badges" type="checkbox" id={`badge-${badgeId}`} checked={!!selected}
                    onChange={toggle}/>
    </div>;

    return <BadgeCardRow resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId} selected={selected}
                         toggle={toggle} toggleComponent={toggleComponent}/>
}

export function BadgeCardRowWithAddRemove({resourceId, roadmapId, badgeId, selected, toggle}) {
    const toggleComponent = <div
        className={`p-3 h-100 rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center bg-gray-100 fs-4`}
        role="button" onClick={toggle}>
        {selected ? <i className="bi bi-dash"></i> : <i className="bi bi-plus"></i>}
    </div>

    return <BadgeCardRow resourceId={resourceId} roadmapId={roadmapId} badgeId={badgeId} selected={selected}
                         toggle={toggle} toggleComponent={toggleComponent}/>
}
