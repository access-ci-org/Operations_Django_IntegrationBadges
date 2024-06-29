import placeholderBadge from "../../../../../assets/img/placeholder_badge.png";
import ResourceBadgeTopTag
    from "../../../ResourceDetail/ResourceBadgeSection/ResourceBadgeContainer/ResourceBadge/ResourceBadgeTopTag";

export default function ResourceCardBadgeModal({data, index}) {
    const badgeStatusStyle = data.status === "Verified" ?
        {color: '#107180'} : {color: '#F07537'};

    const handleCloseClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal fade" id={`badgeModal${index}`} tabIndex="-1"
             aria-labelledby="badgeModal" aria-hidden="true" onClick={handleCloseClick}>
            <div className="modal-dialog modal-dialog-centered modal-md-lg">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <div className="badge-modal-header-info">
                                <img src={placeholderBadge} alt="badge" className="badge-icon"/>
                                <div className="badge-modal-header-info-title">
                                    <ResourceBadgeTopTag title={data.status}/>
                                    <div style={{ paddingTop: "16px" }}>
                                        <p className="badge-modal-name">{data.name}</p>
                                        <p className="badge-modal-source">{data.source}</p>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleCloseClick}/>
                        </div>
                        <div className="badge-modal-content">
                            <p>{data.description}</p>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button" className="btn" data-bs-dismiss="modal"
                               aria-label="Close" onClick={handleCloseClick}>CLOSE</a>
                            <a href={data.actionUrl} type="button" className={"btn btn-medium"}>
                                {data.actionText}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}