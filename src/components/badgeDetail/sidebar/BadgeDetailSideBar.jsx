import placeholder from '../../../assets/img/placeholder_badge.png';
import {ReactComponent as ArrowUpRightIcon} from '../../../assets/img/icons/arrow-up-right.svg';
import {ReactComponent as EditIcon} from '../../../assets/img/icons/edit.svg';

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
        url: "https://google.com",
        text: "Open a Ticket"
    },
    {
        url: "https://google.com",
        text: "Integration Resources"
    },
];

function SidebarSection({title, links, icon, editable}) {
    return (
        <div className="sidebar-section">
            <div className="sidebar-section-title-wrapper">
                <p className="sidebar-section-title">{title}</p>
                {editable &&
                    <EditIcon className="sidebar-section-title-icon"/>
                }
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
                <SidebarSection title="Badge Action and Url" links={supportContacts} editable/>
            }
        </div>
    );
}