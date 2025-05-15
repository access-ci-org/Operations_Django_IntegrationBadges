import {Link} from "react-router-dom";
import {BadgeWorkflowStatus} from "../../contexts/BadgeContext.jsx";
import {useResources} from "../../contexts/ResourcesContext.jsx";
import Translate from "../../locales/Translate.jsx";

const badgePrerequisiteActionIconClass = {
    "": "bi-info-circle-fill",
    "undefined": "bi-info-circle-fill",
    [BadgeWorkflowStatus.NOT_PLANNED]: "bi-info-circle-fill",
    [BadgeWorkflowStatus.PLANNED]: "bi-layers",
    [BadgeWorkflowStatus.TASK_COMPLETED]: "bi-layers",
    [BadgeWorkflowStatus.VERIFICATION_FAILED]: "bi-layers",
    [BadgeWorkflowStatus.VERIFIED]: "bi-check-circle-fill",
    [BadgeWorkflowStatus.DEPRECATED]: "bi-info-circle-fill"
};

export default function ResourceBadgePrerequisites({resourceId, roadmapId, badgeId}) {
    const {getResourceRoadmapBadgePrerequisites} = useResources();

    let prerequisiteBadges = getResourceRoadmapBadgePrerequisites({resourceId, roadmapId, badgeId});

    if (prerequisiteBadges) {
        return <div className="w-100 pb-3">
            {prerequisiteBadges && prerequisiteBadges.length === 0 &&
                <div className="w-100 p-3 text-center lead">
                    No Prerequisites
                </div>}
            {prerequisiteBadges && prerequisiteBadges.map((prerequisiteBadge, taskIndex) => {
                return <div key={taskIndex} className="w-100 pt-2">
                    <div className="row rounded-3 border-gray-200 border border-1 border-left-wide">

                        <div className="col-sm-4 ps-0 d-flex flex-row align-items-center">
                            <div
                                className="p-4 h-100 bg-warning-subtle rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                                role="button">
                            </div>
                            <div className="mt-2 mb-2 p-4 background-image-center-no-repeat"
                                 style={{backgroundImage: `url(${prerequisiteBadge.graphic})`}}>

                            </div>
                            <h4 className="flex-fill p-2 ps-3 m-0 fs-6">{prerequisiteBadge.name}</h4>
                        </div>
                        <p className="col-sm-5 pt-2 pb-2 m-0 align-content-center">
                            {prerequisiteBadge.resource_provider_summary}
                        </p>
                        <div className="col-sm-3 pt-2 pb-2 align-content-center text-center">

                            {!!prerequisiteBadge && <Link
                                to={`/resources/${resourceId}/roadmaps/${roadmapId}/badges/${prerequisiteBadge.badge_id}`}
                                className="w-100 btn btn-outline-dark btn-sm rounded-3 d-flex flex-row">

                                <span className="flex-fill text-start">
                                    <i className={`bi ${badgePrerequisiteActionIconClass[prerequisiteBadge.status]}`}></i>
                                    <span className="ps-3 pe-3">
                                        <Translate>badgePrerequisiteActionLabel.{prerequisiteBadge.status}</Translate>
                                    </span>
                                </span>
                                <span className="">
                                    <i className="bi bi-chevron-right"></i>
                                </span>

                            </Link>}
                        </div>

                    </div>
                </div>
            })}
        </div>
    }
}