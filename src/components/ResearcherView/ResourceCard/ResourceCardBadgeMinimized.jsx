import placeholderBadge from "../../../assets/img/placeholder_badge.png";

export default function ResourceCardBadgeMinimized({ name }) {
    return (
        <div>
            <button type="button" className="btn btn-outline-secondary badge-minimized">
                <img src={placeholderBadge} alt="badge" className="badge-icon"
                     style={{ width: '32px', height: '32px' }}/>
                {name}
            </button>
        </div>
    );
}