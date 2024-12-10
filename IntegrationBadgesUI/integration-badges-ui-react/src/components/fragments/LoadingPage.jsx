/**
 * The component that displays a loading spinner and message.
 * @param {Object} style - Optional style object for the loading wrapper.
 */
export default function LoadingPage({style}) {
    return (
        <div className="loading-wrapper" style={style}>
            <div className="spinner-border text-medium" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
        </div>
    );
}