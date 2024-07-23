import placeholder from '../../../assets/img/placeholder_badge.png';
import {ReactComponent as ArrowUpRightIcon} from '../../../assets/img/icons/arrow-up-right.svg';
import {ReactComponent as WarningIcon} from '../../../assets/img/icons/alert-triangle.svg';
import BadgeEditingSection from "./BadgeEditingSection";
import StatusTag from "../../fragments/StatusTag";
import Stepper from "../../fragments/Stepper";
import {useEffect} from "react";
import BadgeCommentModal from "./BadgeCommentModal";

const implementationRoles=[
    {
        url: "https://google.com",
        text: "Researcher Support Contacts"
    },
    {
        url: "https://google.com",
        text: "RP Contacts"
    },
];

const supportContacts=[
    {
        url: "https://access-ci.atlassian.net/servicedesk/customer/portal/2",
        text: "Open a Ticket"
    },
    {
        url: "https://operations.access-ci.org/help",
        text: "Support Resources"
    },
];

function SidebarSection({title, links, icon}) {
    return (
        <div className="sidebar-section">
            <div className="sidebar-section-title-wrapper">
                <p className="sidebar-section-title">{title}</p>
            </div>
            <div className="sidebar-section-links">
                {links.map((link, index) => (
                    <a key={index} href={link.url}>
                        {link.text}
                        {icon && <ArrowUpRightIcon className="sidebar-section-icon"/>}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function BadgeDetailSideBar({badge, resource_id, setResource}) {

    return (
        <div className="sidebar-wrapper">
            <img src={placeholder} alt="badge"/>
            {
                badge.state !== 'Not Planned' &&
                <div className="badge-status-wrapper">
                    <p className="badge-status-title">Badge Status</p>
                    <StatusTag title={badge.state} style={{marginBottom: '8px'}}/>
                    <Stepper state={badge.state}/>
                    {badge.state === 'Verification Failed' &&
                        <button className="btn btn-medium planned-style badge-status-comment-btn" data-bs-toggle="modal"
                                data-bs-target={`#BadgeCommentModal${resource_id}${badge.badge_id}`}>
                            <span><WarningIcon/></span> View Comments
                        </button>
                    }
                </div>
            }
            <SidebarSection title="Implementation Roles" links={implementationRoles}/>
            <SidebarSection title="Resource Integration Support" links={supportContacts} icon/>
            {(badge.state && badge.state !== 'Not Planned') &&
                <BadgeEditingSection label={badge.badge_access_url_label}
                                     url={badge.badge_access_url}
                                     resource_id={resource_id}
                                     badge_id={badge.badge_id}
                                     setResource={setResource}/>
            }
            <BadgeCommentModal id={`BadgeCommentModal${resource_id}${badge.badge_id}`} comment={badge.comment}/>
        </div>
    );
}