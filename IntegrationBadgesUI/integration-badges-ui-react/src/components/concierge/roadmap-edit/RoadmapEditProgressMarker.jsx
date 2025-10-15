import layersFillTealIcon from "../../../assets/layers-fill-teal-icon.png";
import layersFillGrayIcon from "../../../assets/layers-fill-gray-icon.png";

export default function RoadmapEditProgressMarker({steps, current}) {
    return <div className="w-100 d-flex flex-row">
        {steps.map((step, stepIndex) => {
            const progressCheck = <img src={stepIndex <= current ? layersFillTealIcon : layersFillGrayIcon}
                                       alt="roadmap creation progress check" style={{width: 30}} className=""
                                       key={stepIndex}/>;
            if (stepIndex === steps.length - 1) {
                return progressCheck
            } else {
                return <div className="d-flex flex-row flex-fill" key={stepIndex}>
                    {progressCheck}
                    {stepIndex !== steps.length - 1 && <div className="flex-fill align-content-center">
                        <div className="border-gray-500" style={{borderBottom: "1px dashed"}}></div>
                    </div>}
                </div>
            }
        })}
    </div>
}