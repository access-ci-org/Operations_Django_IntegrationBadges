import {RoadmapCard} from "./resource-edit-page-cards.jsx";
import {Link} from "react-router-dom";
import ResourceCard from "../resource/ResourceCard.jsx";

export default function RoadmapSelectionConfirmation({organization, resource, selectedRoadmaps, prev, next}) {
    if (selectedRoadmaps && selectedRoadmaps.length > 0) {

        // TODO fix later when multiple roadmaps are allowed
        const roadmap = selectedRoadmaps[0];

        return <>
            <div className="row pt-4">
                <div className="col-lg-8 d-flex flex-column pe-5">
                    <h1>{roadmap.name}</h1>
                    <p className="flex-fill">{roadmap.executive_summary}</p>
                    <div>
                        <button className="btn btn-dark" onClick={next}>Select Your Resource-Specific Badges</button>
                    </div>
                </div>
                <div className="col-lg-4 p-5">
                    <ResourceCard organization={organization} resource={resource} inProgress={true} showViewButton={false}/>
                </div>
            </div>
            <div className="w-100 pt-5">
                <h2>Need More Information? </h2>
                <p>
                    View Additional Information
                </p>
            </div>
        </>
    } else {
        return <>
            <div className="row pt-5">
                <div className="w-100 p-3 text-center lead">
                    No roadmaps selected.
                </div>
            </div>
        </>
    }
}