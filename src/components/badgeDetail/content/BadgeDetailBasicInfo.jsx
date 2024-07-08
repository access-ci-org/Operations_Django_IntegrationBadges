import LabelTag from "../../fragments/LabelTag";
import {ReactComponent as BookmarkIcon} from "../../../assets/img/icons/bookmark.svg";
import StatusTag from "../../fragments/StatusTag";
import {useEffect, useState} from "react";
import PlanModal from "./PlanModal";

function BadgeTitle({title, required, status}) {
    const [className, setClassName] = useState("btn btn-medium");

    useEffect(() => {
        if (status === "NotPlanned") {
            setClassName("btn btn-medium");
        } else {
            setClassName("btn btn-medium planned-style");
        }
    }, [status]);

    return (
        <div className="basic-info-header">
            <div className="basic-info-title">
                <h2>{title}</h2>
                {required && <LabelTag title="Required" verified/>}
            </div>
            <PlanModal id={`PlanBadgeModal${1}`} name={title} />
            <button className={className} data-bs-toggle="modal"
                    data-bs-target={`#PlanBadgeModal${1}`}>
                <BookmarkIcon />
                {status === "NotPlanned" ? "Plan this Badge" : "Unplan this Badge"}
            </button>
        </div>
    );
}

function BadgeStatus({type, status, roles}) {
    return (
        <div className="basic-info-status">
            <BadgeStatusBlock>
                <p>Task Type</p>
                <p>{type}</p>
            </BadgeStatusBlock>
            <BadgeStatusBlock>
                <p>Latest Status</p>
                <StatusTag title={status} />
            </BadgeStatusBlock>
            <BadgeStatusBlock>
                <p>RP Roles</p>
                <p>{roles}</p>
            </BadgeStatusBlock>
        </div>
    );
}

function BadgeStatusBlock({children}) {
    return (
        <div className="basic-info-status-block">
            {children}
        </div>
    );
}

function BadgeDescription({description}) {
    return (
        <div className="basic-info-description">
            <p>{description}</p>
        </div>
    );
}

export default function BadgeDetailBasicInfo({data}) {
    return (
        <div className="basic-info-wrapper">
            <BadgeTitle title={"Ticket Handling"} required={true} status={"NotPlanned"}/>
            <BadgeStatus type={"Coordination"} status={"NotPlanned"}
                         roles={"Resource or Service Integration Coordinator"} />
            <BadgeDescription description={data.resource_provider_summary} />
        </div>
    );
}