import BookmarkIcon from "../../../assets/img/icons/bookmark.svg";
import BookmarkXIcon from '../../../assets/img/icons/bookmark-x.svg';
import StatusTag from "../../fragments/StatusTag";
import {useEffect, useState} from "react";
import PlanModal from "./PlanModal";
import UnplanModal from "./UnplanModal";
import {workflow_states} from "../../../App";

/**
 * The title of the badge, containing the plan/unplan button.
 * @param {string} title - The badge name
 * @param {string} state - The badge state
 * @param {number} resource_id - The resource id
 * @param {number} badge_id - The badge id
 * @param {Function} setResource - The function to set the resource.
 */
function BadgeTitle({title, state, resource_id, badge_id, setResource}) {
    const [className, setClassName] = useState("btn btn-medium");

    useEffect(() => {
        if (state === workflow_states.NOT_PLANNED) {
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
            {
                state === workflow_states.NOT_PLANNED ?
                    <PlanModal id={`PlanBadgeModal${resource_id}${badge_id}`}
                               name={title}
                               resource_id={resource_id}
                               badge_id={badge_id}
                               setResource={setResource}/>
                    : <UnplanModal id={`PlanBadgeModal${resource_id}${badge_id}`}
                                   name={title}
                                   resource_id={resource_id}
                                   badge_id={badge_id}
                                   setResource={setResource}/>
            }
            <button className={className} data-bs-toggle="modal"
                    data-bs-target={`#PlanBadgeModal${resource_id}${badge_id}`}>
                {state === workflow_states.NOT_PLANNED ? <BookmarkIcon/> : <BookmarkXIcon/>}
                {state === workflow_states.NOT_PLANNED ? "Plan this Badge" : "Unplan this Badge"}
            </button>
        </div>
    );
}

/**
 * Displays various badge status information.
 * @param {string} method - The verification method: automated/manual
 * @param {string} state - badge state
 * @param {string} time - the time of the latest update
 */
function BadgeStatus({method, state, time}) {
    const [formattedTime, setFormattedTime] = useState("Not Updated Before");

    useEffect(() => {
        let date = new Date();
        if (time) {
            date = new Date(time);
        }

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };

        const formattedDate = time ? new Intl.DateTimeFormat('en-US', options).format(date)
            : "Not Applicable";
        setFormattedTime(formattedDate);
    }, [time]);

    function BadgeStatusBlock({children}) {
        return (
            <div className="basic-info-status-block">
                {children}
            </div>
        );
    }

    return (
        <div className="basic-info-status">
            <BadgeStatusBlock>
                <p>Verification Method</p>
                <p>{method}</p>
            </BadgeStatusBlock>
            <BadgeStatusBlock>
                <p>Latest Status</p>
                <StatusTag title={state}/>
            </BadgeStatusBlock>
            <BadgeStatusBlock>
                <p>Latest Update Time</p>
                <p>{formattedTime}</p>
            </BadgeStatusBlock>
        </div>
    );
}

/**
 * Displays a description block. Used for badge description and verification summary.
 * @param {string} title - The title of the description block.
 * @param {string} text - The text of the description block.
 * @param {Object} style - optional styling for the description block.
 */
function BadgeDescription({title, text, style}) {
    return (
        <div className="basic-info-description" style={style}>
            <h5>{title}</h5>
            <p>{text}</p>
        </div>
    );
}

/**
 * The header than contains information about the badge.
 * @param {number} resource_id - used in endpoint to plan/unplan badge
 * @param {CombinedBadge} badge - The info about the current badge.
 * @param {Function} setResource - The function to set the resource.
 */
export default function BadgeDetailBasicInfo({resource_id, badge, setResource}) {
    return (
        <div className="basic-info-wrapper">
            <BadgeTitle title={badge.name}
                        state={badge.state}
                        resource_id={resource_id}
                        badge_id={badge.badge_id}
                        setResource={setResource}/>
            <BadgeStatus method={badge.verification_method} state={badge.state} time={badge.state_updated_at}/>
            <BadgeDescription title={"Badge Description"} text={badge.resource_provider_summary}/>
            <BadgeDescription title={"Verification Summary"}
                              text={badge.verification_summary}
                              style={{marginTop: '12px'}}/>
        </div>
    );
}