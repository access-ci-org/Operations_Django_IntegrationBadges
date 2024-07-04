import BadgeDetailHeader from "./BadgeDetailHeader";

const badge = {
    badge_id: 1,
    name: "Ticket Handling",
    researcher_summary: "ACCESS researchers will be assigned tickets for issues or " +
        "questions about their research. In response they will monitor the ticket " +
        "system for tickets assigned to them, triage them as necessary, reassign " +
        "them to other staff or organizations if necessary, resolve issues, and " +
        "close tickets once the request is addressed.",
    resource_provider_summary: "ACCESS resource and online service operators " +
        "will be assigned tickets for issues or questions about their resources " +
        "and online services. In response they will monitor the ticket system for " +
        "tickets assigned to them, triage them as necessary, reassign them to other " +
        "staff or organizations if necessary, resolve issues, and close tickets once " +
        "the request is addressed."
}

const resource_name = "Integrating Indiana Jetstreams 4";

export default function BadgeDetail() {
    return (
        <div className="badge-detail-wrapper">
            <BadgeDetailHeader title={resource_name} link={"#"} badges={[badge]}/>
        </div>
    );
}