import LoadingBlock from "../../LoadingBlock.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";
import Form from "react-bootstrap/Form";
import {Link, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "../../../pages/concierge/ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "./RoadmapEditProgressMarker.jsx";
import ConciergeRoadmapEditDetails from "./ConciergeRoadmapEditDetails.jsx";


export default function ConciergeRoadmapEditReviewAndEdit({roadmapData, setRoadmapData, onClickEditBadges}) {
    return <div className="w-100 d-inline-block text-start">
        <h3 className="text-black pb-4 fw-medium">Roadmap Description</h3>

        <ConciergeRoadmapEditDetails roadmapData={roadmapData} setRoadmapData={setRoadmapData}/>

        <div className="d-flex flex-row pb-4 pt-5">
            <h3 className="text-black fw-medium flex-fill">Associated Badges</h3>
            <button className="btn btn-link" onClick={onClickEditBadges}>Edit</button>
        </div>

        <div className="row pb-4">
            <div className="col-sm-6 pe-3">
                Required Badges
            </div>
            <div className="col-sm-6">
                <div>Badge 1</div>
                <div>Badge 1</div>
                <div>Badge 1</div>
                <div>Badge 1</div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-6 pe-3">
                Recommended Badges
            </div>
            <div className="col-sm-6">
                <div>Badge 1</div>
                <div>Badge 1</div>
                <div>Badge 1</div>
                <div>Badge 1</div>
            </div>
        </div>

    </div>
}
