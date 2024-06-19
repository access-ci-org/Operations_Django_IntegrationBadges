import placeholderBadge from "../../../../../assets/img/placeholder_badge.png";

function BadgeModal({data, index}) {
    const badgeStatusStyle = data.status === "Verified" ?
        {color: '#107180'} : {color: '#F07537'};

    const handleCloseClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal fade" id={`badgeModal${index}`} tabIndex="-1"
             aria-labelledby="badgeModal" aria-hidden="true" onClick={handleCloseClick}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div>
                            <img src={placeholderBadge} alt="badge" className="badge-icon"
                                style={{maxWidth: '150px', maxHeight: '150px'}}/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                    <p className={"badge-modal-status"} style={badgeStatusStyle}>{data.status}</p>
                                    <p className={"badge-modal-name"}>{data.name}</p>
                                    <p>Resource:
                                        <span style={{
                                            color: "#3f3f3f", marginLeft: '8px',
                                            fontWeight: '500', fontSize: '16px'
                                        }}>{data.source}</span>
                                    </p>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close" onClick={handleCloseClick}/>
                            </div>
                            <p>{data.description}</p>
                            <a href={data.actionUrl} type={"button"} className={"btn btn-dark"}
                                style={{marginLeft: 0,
                                        marginRight: 0,
                                        borderRadius: '4px',
                                        minWidth: '40%',
                                        width: 'fit-content'}}>
                                {data.actionText}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function ResourceCardBadge({data, index}) {
    const handleBadgeClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-secondary resource-badge"
                    data-bs-toggle="modal" data-bs-target={`#badgeModal${index}`} onClick={handleBadgeClick}>
                <img src={placeholderBadge} alt="badge" className="badge-icon"
                     style={{width: '32px', height: '32px'}}/>
            </button>
            <BadgeModal data={data} index={index}/>
        </div>
    );
}