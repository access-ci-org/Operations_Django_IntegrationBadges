import ResourceCardHeader from "./ResourceCardHeader";
import ResourceCardBadgeMinimized from "./ResourceCardBadgeMinimized";
import arrow from '../../../assets/img/arrow-forward.svg';

export default function ResourceCard({data}) {
    const firstBadge = "ACCESS Resource Description";
    const secondBadge = "Ticket Handling";
    const thirdBadge = "Badge ABC";
    const fourthBadge = "Another Badge";
    const fifthBadge = "Badge for XYX";
    return (
        <div className="card resource-card">
            <ResourceCardHeader data={data}/>
            <div className="card-body">
                <p className="card-text">
                    {data.description}
                </p>
                <div className="badge-container">
                    <ResourceCardBadgeMinimized name={firstBadge} />
                    <ResourceCardBadgeMinimized name={secondBadge} />
                    <ResourceCardBadgeMinimized name={thirdBadge} />
                    <ResourceCardBadgeMinimized name={fourthBadge} />
                    <ResourceCardBadgeMinimized name={fifthBadge} />
                </div>
                <div className="expand-button">
                    <a href="#" role="button">Show Resource Details</a>
                    <img src={arrow} alt="Expand" style={{maxHeight: '20px', maxWidth: '20px'}}/>
                </div>
            </div>
        </div>
    );
}