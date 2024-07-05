import LabelTag from "../components/fragments/LabelTag";
import StatusTag from "../components/fragments/StatusTag";

export default function Demo() {
    return (
        <div>
            <h1>Demo</h1>
            <LabelTag title="Unverified" verified/>
            <StatusTag title="Deprecated"/>
            <button className="btn btn-medium">Check</button>
        </div>
    );
}