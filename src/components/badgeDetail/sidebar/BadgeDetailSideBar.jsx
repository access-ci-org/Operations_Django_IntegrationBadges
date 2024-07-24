import placeholder from '../../../assets/img/placeholder_badge.png';
import {ReactComponent as ArrowUpRightIcon} from '../../../assets/img/icons/arrow-up-right.svg';
import {ReactComponent as WarningIcon} from '../../../assets/img/icons/alert-triangle.svg';
import BadgeEditingSection from "./BadgeEditingSection";
import StatusTag from "../../fragments/StatusTag";
import Stepper from "../../fragments/Stepper";
import {useEffect, useState} from "react";
import BadgeCommentModal from "./BadgeCommentModal";
import {workflow_states} from "../../../App";

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

function ImplementorRoleSection({tasks}) {
    return (
        <div className="sidebar-section">
            <div className="sidebar-section-title-wrapper">
                <p className="sidebar-section-title">Implementor Roles</p>
            </div>
            <div className="sidebar-section-edit-wrapper">
                {tasks.length === 0 ?
                    <p>No tasks related to this badge.</p>
                    : tasks.map((task, index) => (
                    <div key={index} className="sidebar-section-edit">
                        <p className="sidebar-section-edit-title">{task.name}</p>
                        <p className="sidebar-section-edit-content">{task.roles}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SidebarSection({title, links, icon, justText}) {
    return (
        <div className="sidebar-section">
            <div className="sidebar-section-title-wrapper">
                <p className="sidebar-section-title">{title}</p>
            </div>
            <div className="sidebar-section-links">
                {links.length === 0 ?
                    <p>{title} is currently unavailable for this badge.</p>
                    : links.map((link, index) => (
                    justText ?
                        <p key={index}>
                            {link.text}
                            {icon && <ArrowUpRightIcon className="sidebar-section-icon"/>}
                        </p>
                        : <a key={index} href={link.url}>
                            {link.text}
                            {icon && <ArrowUpRightIcon className="sidebar-section-icon"/>}
                        </a>
                ))}
            </div>
        </div>
    );
}

export default function BadgeDetailSideBar({resource, setResource, badge, tasks}) {
    const [roadmapLinks, setRoadmapLinks] = useState([]);
    const [implementorRoles, setImplementorRoles] = useState([]);

    useEffect(() => {
        const links = resource.roadmaps.map(roadmap => ({
            url: "#", // Placeholder URL
            text: roadmap.roadmap.name
        }));
        setRoadmapLinks(links);
    }, [resource]);

    useEffect(() => {
        const roles = tasks.map(task => ({
            name: task.task.name,
            roles: task.task.implementor_roles
        }));
        setImplementorRoles(roles);
    }, [tasks]);

    return (
        <div className="sidebar-wrapper">
        <img src={placeholder} alt="badge"/>
            {
                badge.state !== workflow_states.NOT_PLANNED &&
                <div className="badge-status-wrapper">
                    <p className="badge-status-title">Badge Status</p>
                    <StatusTag title={badge.state} style={{marginBottom: '8px'}}/>
                    <Stepper state={badge.state}/>
                    {badge.state === workflow_states.VERIFICATION_FAILED &&
                        <button className="btn btn-medium planned-style badge-status-comment-btn" data-bs-toggle="modal"
                                data-bs-target={`#BadgeCommentModal${resource.cider_resource_id}${badge.badge_id}`}>
                            <span><WarningIcon/></span> View Comments
                        </button>
                    }
                </div>
            }
            <SidebarSection title="Roadmaps" links={roadmapLinks} justText/>
            <ImplementorRoleSection tasks={implementorRoles}/>
            <SidebarSection title="Resource Integration Support" links={supportContacts} icon/>
            {(badge.state && badge.state !== workflow_states.NOT_PLANNED) &&
                <BadgeEditingSection label={badge.badge_access_url_label}
                                     url={badge.badge_access_url}
                                     resource_id={resource.cider_resource_id}
                                     badge_id={badge.badge_id}
                                     setResource={setResource}/>
            }
            <BadgeCommentModal id={`BadgeCommentModal${resource.cider_resource_id}${badge.badge_id}`} comment={badge.comment}/>
        </div>
    );
}