import placeholder from '../../../assets/img/placeholder_badge.png';
import {ReactComponent as ArrowUpRightIcon} from '../../../assets/img/icons/arrow-up-right.svg';
import BadgeEditingSection from "./BadgeEditingSection";

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

export default function BadgeDetailSideBar({badge}) {
    return (
        <div className="sidebar-wrapper">
            <img src={placeholder} alt="badge"/>
            <SidebarSection title="Implementation Roles" links={implementationRoles}/>
            <SidebarSection title="Resource Integration Support" links={supportContacts} icon/>
            {(badge.state && badge.state !== 'Not Planned') &&
                <BadgeEditingSection title="Badge Action and Url"/>
            }
        </div>
    );
}