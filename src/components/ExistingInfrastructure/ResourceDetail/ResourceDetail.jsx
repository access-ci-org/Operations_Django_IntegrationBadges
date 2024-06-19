import {useParams} from "react-router-dom";
import ResourceDetailRPView from "./ResourceDetailRPView";

const jetStream4 = {
    id: 1,
    name: "JetStream 4",
    institution: "Indiana University",
    institutionUrl: "https://jetstream2.tacc.utexas.edu/",
    type: "Compute",
    status: "TBD",
    globalResourceId: "jetstream4.indiana.access-ci.org",
    description: "Jetstream4 is a hybrid-cloud platform that provides flexible, on-demand, programmable " +
        "cyberinfrastructure tools ranging from interactive virtual machine services to a variety of " +
        "infrastructure and orchestration services for research and education. ",
    features: ["Allocated by ACCESS", "Jetstream4 API", "Jetstream4 CLI", "Supported by Science Gateways",
        "Jetstream4 User Guide", "Community software areas for science gateways", "Jetstream4 User Forum"],
    count: 5,
    badges: [
        {
            name: "ACCESS Resource Description",
            description: "If you have any questions or issue related to this resource like raise a support request " +
                "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                "usage metrics, etc. ",
            status: "Verified",
            source: "Indiana Jetstream2 CPU",
            actionUrl: "https://jetstream2.tacc.utexas.edu/",
            actionText: "Submit a Ticket"
        }, {
            name: "Ticket Handling",
            description: "If you have any questions or issue related to this resource like raise a support request " +
                "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                "usage metrics, etc. ",
            status: "Unverified",
            source: "Indiana Jetstream2 CPU",
            actionUrl: "https://jetstream2.tacc.utexas.edu/",
            actionText: "Submit a Ticket"
        }, {
            name: "Badge ABC",
            description: "This is a badge description. This is a badge description. This is a badge description. " +
                "This is a badge description. This is a badge description. This is a badge description. ",
            status: "Unverified",
            source: "Indiana Jetstream2 CPU",
            actionUrl: "https://jetstream2.tacc.utexas.edu/",
            actionText: "Submit a Ticket"
        }, {
            name: "Another Badge",
            description: "This is a badge description. This is a badge description. This is a badge description. " +
                "This is a badge description. This is a badge description. This is a badge description. ",
            status: "Verified",
            source: "Indiana Jetstream2 CPU",
            actionUrl: "https://jetstream2.tacc.utexas.edu/",
            actionText: "Submit a Ticket"
        }, {
            name: "Badge for XYX",
            description: "This is a badge description. This is a badge description. This is a badge description. " +
                "This is a badge description. This is a badge description. This is a badge description. ",
            status: "Verified",
            source: "Indiana Jetstream2 CPU",
            actionUrl: "https://jetstream2.tacc.utexas.edu/",
            actionText: "Submit a Ticket"
        }]
};

export default function ResourceDetail() {
    const { resourceId } = useParams();

    return (
        <div>
            <ul className="nav nav-pills resource-detail-tab" id="pills-tab" role="tablist">
                <li className="nav-item" role="tabpanel">
                    <button className="nav-link active" id="pills-RP-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-RP" type="button" role="tab" aria-controls="pills-RP"
                            aria-selected="true">Resource Provider View
                    </button>
                </li>
                <li className="nav-item" role="tabpanel">
                    <button className="nav-link" id="pills-researcher-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-researcher" type="button" role="tab" aria-controls="pills-researcher"
                            aria-selected="false">Researcher View
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-RP" role="tabpanel"
                     aria-labelledby="pills-RP-tab" tabIndex="0">
                    <ResourceDetailRPView data={jetStream4}/>
                </div>
                <div className="tab-pane fade" id="pills-researcher" role="tabpanel"
                     aria-labelledby="pills-researcher-tab" tabIndex="0">Researcher view
                </div>
            </div>
        </div>
    );
}