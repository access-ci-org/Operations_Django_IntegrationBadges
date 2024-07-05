import placeholder from '../../../assets/img/placeholder_badge.png';

const links=[
    {
        url: "https://jetstream2.tacc.utexas.edu/",
        text: "Submit a Ticket"
    },
    {
        url: "https://jetstream2.tacc.utexas.edu/",
        text: "Integration Resources"
    },
    {
        url: "https://jetstream2.tacc.utexas.edu/",
        text: "Contact admins"
    }
];

function SidebarSection({title, links, editable}) {
    return (
        <div className="sidebar-section">
            <p className="sidebar-section-title">{title}</p>
            <div className="sidebar-section-links">
                {links.map((link, index) => (
                    <a key={index} href={link.url}>{link.text}</a>
                ))}
            </div>
        </div>
    );
}

export default function BadgeDetailSideBar() {
    return (
        <div className="sidebar-wrapper">
            <img src={placeholder} alt="badge"/>
            <SidebarSection title="Implementation Roles" links={links}/>
            <SidebarSection title="Support Contacts" links={links}/>
            <SidebarSection title="Badge Action and Url" links={links}/>
        </div>
    );
}