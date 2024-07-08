import BadgeDetailBasicInfo from "./BadgeDetailBasicInfo";
import PrerequisiteBadgesContainer from "./PrerequisiteBadgesContainer";
import TaskContainer from "./TaskContainer";

const badges = [
    {
        id: 1,
        name: "ACCESS Resource Description",
        description: "If you have any questions or issue related to this resource like raise a support request " +
            "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
            "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
            "usage metrics, etc. ",
        status: "Verified",
        required: true,
        source: "Indiana Jetstream2 CPU",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }, {
        id: 2,
        name: "Ticket Handling",
        description: "If you have any questions or issue related to this resource like raise a support request " +
            "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
            "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
            "usage metrics, etc. ",
        status: "NotPlanned",
        required: true,
        source: "Indiana Jetstream2 CPU",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }, {
        id: 3,
        name: "Badge ABC",
        description: "This is a badge description. This is a badge description. This is a badge description. " +
            "This is a badge description. This is a badge description. This is a badge description. ",
        status: "NotStarted",
        required: false,
        source: "Indiana Jetstream2 CPU",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }, {
        id: 4,
        name: "Another Badge",
        description: "This is a badge description. This is a badge description. This is a badge description. " +
            "This is a badge description. This is a badge description. This is a badge description. ",
        status: "Planned",
        required: false,
        source: "Indiana Jetstream2 CPU",
        actionUrl: "https://jetstream2.tacc.utexas.edu/",
        actionText: "Submit a Ticket"
    }
]

export default function BadgeDetailContent({data}) {
    return (
        <div className="content-wrapper">
            <BadgeDetailBasicInfo data={data}/>
            <PrerequisiteBadgesContainer badges={badges}/>
            <TaskContainer />
        </div>
    );
}