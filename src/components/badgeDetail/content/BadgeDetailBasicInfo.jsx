import LabelTag from "../../fragments/LabelTag";
import {ReactComponent as BookmarkIcon} from "../../../assets/img/icons/bookmark.svg";
import StatusTag from "../../fragments/StatusTag";

const description = "ACCESS resource and online service operators will be assigned tickets " +
    "for issues or questions about their resources and online services. In response they will monitor " +
    "the ticket system for tickets assigned to them, triage them as necessary, reassign them to other staff " +
    "or organizations if necessary, resolve issues, and close tickets once the request is addressed.";

function BadgeTitle({title, required}) {
    return (
        <div className="basic-info-header">
            <div className="basic-info-title">
                <h2>{title}</h2>
                {required && <LabelTag title="Required" verified/>}
            </div>
            <button className="btn btn-medium">
                <BookmarkIcon />
                Plan this Badge
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
            <BadgeTitle title={"Ticket Handling"} required={true} />
            <BadgeStatus type={"Coordination"} status={"NotPlanned"}
                         roles={"Resource or Service Integration Coordinator"} />
            <BadgeDescription description={description} />
        </div>
    );
}