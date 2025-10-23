export default function GridAndListSwitch() {
    return <div className="d-flex flex-row">
        <div className="p-1">
            <button type="button" className="btn btn-light">
                <i className="bi bi-list"></i>
            </button>
        </div>
        <div className="p-1">
            <button type="button" className="btn btn-dark">
                <i className="bi bi-grid-3x3-gap-fill"></i>
            </button>
        </div>
    </div>
}
