import {useNavigate} from "react-router-dom";
import LoadingBlock from "../../components/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function Roadmaps() {

    const navigate = useNavigate();

    const {getRoadmaps} = useRoadmaps();

    let roadmaps = getRoadmaps();

    if (roadmaps) {
        return <div className="container">
            <div className="row pt-4">
                <h1>Available Roadmaps.</h1>
            </div>
            <div className="row pt-5">
                <h2 className="visually-hidden">Select the appropriate Roadmap</h2>
                <div className="row pt-2 pb-5 row-cols-2">
                    {roadmaps && roadmaps.map((roadmap) => {
                        const roadmapId = roadmap.roadmap_id;
                        return <div className="col pt-2" key={roadmapId}>
                            <div className="w-100 h-100 p-4 pt-5">
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
                                    <pre className="col-sm-12 ps-5 pe-5 pt-2 pb-4 flex-fill">
                                        {roadmap.executive_summary}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    })}
                    {roadmaps && roadmaps.length === 0 && <div className="w-100 p-3 text-center lead">
                        No roadmaps available
                    </div>}
                </div>
            </div>
            <div className="row pt-5">
                <p>
                    <strong>Explore the Future of Infrastructure Integration: </strong>
                    Interested in contributing to the development of new
                    infrastructure roadmaps? We invite you to explore the possibilities of integrating new and novel
                    infrastructure types. Open an ACCESS Integration and Operation Support Request to start a
                    conversation.
                    Together, we can advance research and innovation in cyberinfrastructure.
                </p>
            </div>
            <div className="row pt-5">
                <h5>Integration Roadmaps Framework Participation</h5>
                <p>
                    ACCESS projects contribute to the Integration Roadmaps Framework by participating in the ACCESS
                    Integration Roadmaps Working Group where they develop, document, review, and release tasks and
                    emerging
                    roadmaps.
                </p>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}
