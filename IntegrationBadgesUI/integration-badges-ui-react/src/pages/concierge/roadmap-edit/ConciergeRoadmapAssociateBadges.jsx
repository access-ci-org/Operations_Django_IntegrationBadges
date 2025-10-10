import LoadingBlock from "../../../components/LoadingBlock.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";
import Form from "react-bootstrap/Form";
import {Link, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "./../ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "../../../components/concierge/RoadmapEditProgressMarker.jsx";
import {useBadges} from "../../../contexts/BadgeContext.jsx";


export default function ConciergeRoadmapAssociateBadges() {
    const {roadmapId} = useParams();

    const {getRoadmap} = useRoadmaps();
    const {getBadges} = useBadges();

    const roadmap = getRoadmap({roadmapId});
    const badges = getBadges();

    if (roadmap && badges) {
        return <div className="container">
            <div className="row mt-2 p-3">

                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">Associate Badges</h1>

                    <div className="w-100 text-center position-relative pt-5 pb-5">
                        <div className="d-inline-block w-100" style={{maxWidth: 500, minWidth: 300}}>
                            <RoadmapEditProgressMarker steps={[1, 2, 3]} current={1}/>
                        </div>
                        <Link to={ConciergeRouteUrls.ROADMAPS} className="btn btn-outline-secondary position-absolute"
                              style={{right: 0}}>Cancel/Discard
                        </Link>
                    </div>

                    <div className="w-100 text-center">
                        <div className="w-100 d-inline-block text-start" style={{maxWidth: 800, minWidth: 300}}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <ul>
                                        {badges.map((badge, badgeIndex) => <li key={badgeIndex}>
                                            {badge.name}
                                        </li>)}
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul>
                                        {badges.map((badge, badgeIndex) => <li key={badgeIndex}>
                                            {badge.name}
                                        </li>)}
                                    </ul>
                                </div>
                            </div>


                            <div className="w-100 pt-4">
                                <h3>Need to create a new badge?</h3>
                                <p style={{maxWidth: 400}}>Once the roadmap is complete, please navigate to the “Create
                                    New Badges” section on the Home
                                    page to add new badges. In that section, you can also link each new badge to an
                                    existing
                                    roadmap.</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-100 text-end pt-5 pb-5">
                        <Link to={ConciergeRouteUrls.ROADMAPS} className="btn btn-outline-dark ps-3 pe-3 m-1">
                            Back
                        </Link>
                        <button className="btn btn-dark ps-3 pe-3 m-1">
                            Publish
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
