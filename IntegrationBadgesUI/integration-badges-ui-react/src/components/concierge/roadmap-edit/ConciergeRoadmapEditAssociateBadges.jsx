import LoadingBlock from "../../LoadingBlock.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";
import Form from "react-bootstrap/Form";
import {Link, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "../../../pages/concierge/ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "./RoadmapEditProgressMarker.jsx";
import {useBadges} from "../../../contexts/BadgeContext.jsx";
import BadgeIcon from "../../badge/BadgeIcon.jsx";


export default function ConciergeRoadmapEditAssociateBadges({roadmapData, setRoadmapData}) {
    const {getBadges, getBadge} = useBadges();

    const badges = getBadges();

    const isBadgeSelected = {};
    const isBadgeRequired = {};
    const selectedBadges = [];

    for (let i = 0; i < roadmapData.badges.length; i++) {
        const {badge_id, required, sequence_no} = roadmapData.badges[i];
        isBadgeSelected[badge_id] = true;
        isBadgeRequired[badge_id] = required;
        selectedBadges.push(getBadge({badgeId: badge_id}));
    }

    const notSelectedBadges = badges.filter(badge => !isBadgeSelected[badge.badge_id]);

    const addBadgeToSequence = ({badgeId, required = false, sequenceNo = selectedBadges.length}) => {
        const badges = [...roadmapData.badges];
        badges.splice(sequenceNo, 0, {badge_id: badgeId, required, sequence_no: sequenceNo});
        setRoadmapData({...roadmapData, badges});
    }

    const removeBadgeFromSequence = ({sequenceNo}) => {
        const badges = [...roadmapData.badges];
        badges.splice(sequenceNo, 1);
        setRoadmapData({...roadmapData, badges});
    }

    const toggleBadgeRequiredStatus = ({sequenceNo}) => {
        const badges = [...roadmapData.badges];
        badges[sequenceNo].required = !badges[sequenceNo].required;
        setRoadmapData({...roadmapData, badges});
    }

    return <div className="w-100 d-inline-block text-start">
        <div className="row">
            <div className="col-sm-6 pe-sm-5">
                <div className="w-100 pe-5" style={{height: "60px"}}>
                    <div className="input-group search-input input-group-sm">
                        <span className="input-group-text rounded-start-5">
                            <i className="bi bi-search"></i>
                        </span>
                        <input type="text" className="form-control rounded-end-5"
                               placeholder="Filter badges"
                               aria-label="Filter badges" onChange={(e) => console.log(e.target.value)}/>
                    </div>
                </div>
                <ul className="list-unstyled overflow-auto" style={{height: "420px"}}>
                    {notSelectedBadges.map((badge, badgeIndex) => <li key={badgeIndex} className="p-0">
                        <div className="d-flex flex-row rounded-3 border border-1 border-gray-300 pt-1 pb-1 ps-2 pe-3">
                            <button disabled={true} className="btn btn-link text-gray-400">
                                <i className="bi bi-circle-fill fs-3"></i>
                            </button>
                            <div className="flex-fill align-content-center ps-2 pe-2 text-gray-800">{badge.name}</div>
                            <button className="btn btn-link"
                                    onClick={addBadgeToSequence.bind(this, {badgeId: badge.badge_id})}>
                                <i className="bi bi-plus-square fs-5 text-gray-700"></i>
                            </button>
                        </div>
                    </li>)}
                </ul>
            </div>
            <div className="col-sm-6 ps-sm-5 border-start border-1 border-black">
                <div className="w-100 d-flex flex-row p-3" style={{height: "60px"}}>
                    <h3 className="flex-fill coming-soon-regular text-black">Added Badges</h3>
                    <div style={{paddingRight: "35px"}}>
                        <small className="coming-soon-regular">Required?</small>
                    </div>
                </div>
                <ul className="list-unstyled">
                    {selectedBadges.map((badge, sequenceNo) => <li key={sequenceNo} className="p-0">
                        <div className="d-flex flex-row rounded-3 border border-1 border-gray-300 pt-1 pb-1 ps-2 pe-3">
                            <button disabled={true} className="btn btn-link text-gray-400">
                                <i className="bi bi-circle-fill fs-3"></i>
                            </button>
                            <div className="flex-fill align-content-center ps-2 pe-2 text-gray-800">{badge.name}</div>
                            <div className="align-content-center ps-2 pe-2">
                                <Form.Check type="switch" id={`badge-required-switch-${badge.badge_id}`} label=""
                                            checked={isBadgeRequired[badge.badge_id]}
                                            onChange={toggleBadgeRequiredStatus.bind(this, {sequenceNo})}/>
                            </div>
                            <button className="btn btn-link"
                                    onClick={removeBadgeFromSequence.bind(this, {sequenceNo})}>
                                <i className="bi bi-dash-square fs-5 text-gray-700"></i>
                            </button>
                        </div>
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
