import LabelTag from "../../fragments/LabelTag";
import {ReactComponent as BookmarkIcon} from "../../../assets/img/icons/bookmark.svg";
import StatusTag from "../../fragments/StatusTag";
import {useEffect, useState} from "react";
import PlanModal from "./PlanModal";

function BadgeTitle({title, state}) {
    const [className, setClassName] = useState("btn btn-medium");

    useEffect(() => {
        if (state === "Not Planned") {
            setClassName("btn btn-medium");
        } else {
            setClassName("btn btn-medium planned-style");
        }
    }, [state]);

    return (
        <div className="basic-info-header">
            <div className="basic-info-title">
                <h2>{title}</h2>
            </div>
            <PlanModal id={`PlanBadgeModal${1}`} name={title} />
            <button className={className} data-bs-toggle="modal"
                    data-bs-target={`#PlanBadgeModal${1}`}>
                <BookmarkIcon />
                {state === "Not Planned" ? "Plan this Badge" : "Unplan this Badge"}
            </button>
        </div>
    );
}

function BadgeStatus({method, state, roadmaps}) {
    return (
        <div className="basic-info-status">
            <BadgeStatusBlock>
                <p>Verification Method</p>
                <p>{method}</p>
            </BadgeStatusBlock>
            <BadgeStatusBlock>
                <p>Latest Status</p>
                <StatusTag title={state} />
            </BadgeStatusBlock>
            <BadgeStatusBlock>
                <p>Required By</p>
                <p>{roadmaps.join(", ")}</p>
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

function BadgeDescription({title, text, style}) {
    return (
        <div className="basic-info-description" style={style}>
            <h5>{title}</h5>
            <p>{text}</p>
        </div>
    );
}

export default function BadgeDetailBasicInfo({badge}) {
    return (
        <div className="basic-info-wrapper">
            <BadgeTitle title={badge.name} state={badge.state}/>
            <BadgeStatus method={badge.verification_method} state={badge.state} roadmaps={badge.roadmap_names}/>
            <BadgeDescription title={"Badge Description"} text={badge.resource_provider_summary}/>
            <BadgeDescription title={"Verification Summary"}
                              text={badge.verification_summary} style={{marginTop: '12px'}}/>
        </div>
    );
}