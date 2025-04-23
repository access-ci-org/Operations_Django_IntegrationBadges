import {RoadmapCard} from "./resource-edit-page-cards.jsx";
import {Link} from "react-router-dom";
import ResourceCard from "../resource/ResourceCard.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import LoadingBlock from "../LoadingBlock.jsx";

export default function RoadmapSelectionConfirmation({resourceId, roadmapId, prev, next}) {
    const {getResource, getResourceOrganization} = useResources();
    const {getRoadmap} = useRoadmaps();

    let resource = getResource({resourceId});
    let roadmap = getRoadmap({roadmapId});
    let organization = getResourceOrganization({resourceId});

    console.log("RoadmapSelectionConfirmation ", {resourceId, roadmapId, resource, roadmap})

    if (!!resource && !! roadmap && !!organization) {
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
                    <ResourceCard organization={organization} resource={resource} inProgress={true}
                                  showViewButton={false}/>
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
        <LoadingBlock />
    }
}