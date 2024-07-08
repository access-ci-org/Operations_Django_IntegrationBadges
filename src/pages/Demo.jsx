import LabelTag from "../components/fragments/LabelTag";
import StatusTag from "../components/fragments/StatusTag";

export default function Demo() {
    const demoStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: 'fit-content',
    }

    return (
        <div style={demoStyle}>
            <h1>Demo</h1>
            <LabelTag title="Unverified" verified/>
            <StatusTag title="Deprecated"/>
            <button className="btn btn-medium">Check</button>
            <button className="btn btn-text">Check</button>
        </div>
    );
}