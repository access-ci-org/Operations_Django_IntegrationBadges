import {useBadges} from "../../contexts/BadgeContext.jsx";
import ResourceBadgeIcon from "../../components/resource/resource-badge/ResourceBadgeIcon.jsx";
import {Link} from "react-router-dom";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useEffect} from "react";

export default function Badges() {
    const {fetchResourceRoadmapBadges, getResourceRoadmapBadges} = useResources();

    useEffect(() => {
        fetchResourceRoadmapBadges();
    }, []);

    const badges = getResourceRoadmapBadges();

    return <div className="container">
        <div className="row pt-5">
            <h2>Available Badges</h2>
            <div className="w-100 pt-2 pb-5">
                {badges && badges.map((badge, badgeIndex) => {
                    const badgeId = badge.badge_id;
                    return <div className="w-100 p-1" key={badgeIndex}>
                        <div className="row rounded-3 border-gray-200 border border-1 badge-card-row">
                            <div className="col-sm-4 ps-0 d-flex flex-row align-items-center">
                                <div className="pt-3 pb-3 ps-2 pe-2">
                                    <ResourceBadgeIcon badgeId={badgeId}/>
                                </div>
                                <div className="flex-fill p-2 badge-card-row-header">
                                    <h4 className="m-0 align-content-center">{badge.name}</h4>
                                </div>
                            </div>
                            <div className="col-sm-5 pt-2 pb-2 badge-card-row-description align-content-center">
                                <p className="m-0 align-content-center">
                                    {badge.resource_provider_summary}
                                </p>
                            </div>
                            <div className="col-sm-3 pt-2 pb-2 align-content-center">
                                    <Link
                                        to={`/badges/${badge.badge_id}`}
                                        className="w-100 btn btn-secondary rounded-1 btn-sm disabled">
                                        View Additional Badge Details
                                    </Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}
