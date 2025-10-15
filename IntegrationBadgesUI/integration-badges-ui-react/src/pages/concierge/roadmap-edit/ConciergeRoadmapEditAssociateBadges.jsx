import LoadingBlock from "../../../components/LoadingBlock.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";
import Form from "react-bootstrap/Form";
import {Link, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "./../ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "../../../components/concierge/RoadmapEditProgressMarker.jsx";
import {useBadges} from "../../../contexts/BadgeContext.jsx";


export default function ConciergeRoadmapEditAssociateBadges({roadmapData, setRoadmapData}) {
    const {getBadges} = useBadges();

    const badges = getBadges();

    return <div className="w-100 d-inline-block text-start">
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
}
