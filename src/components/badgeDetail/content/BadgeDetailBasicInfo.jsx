import LabelTag from "../../fragments/LabelTag";
import {ReactComponent as BookmarkIcon} from "../../../assets/img/icons/bookmark.svg";

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

export default function BadgeDetailBasicInfo({data}) {
    return (
        <div className="basic-info-wrapper">
            <BadgeTitle title={"Ticket Handling"} required={true} />
        </div>
    );
}