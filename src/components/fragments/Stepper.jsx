import RecordCircleIcon from "../../assets/img/icons/record-circle.svg";
import CheckedCircleIcon from "../../assets/img/icons/check-circle-fill.svg";
import ProgressBar from "../../assets/img/icons/progress-bar.svg";
import {workflow_states} from "../../App";

/**
 * A customized stepper just for the badge detail page.
 * @param {string} state - The state of the badge.
 */
export default function Stepper({state}) {
    const getStepClass = (currentStep) => {
        switch (state) {
            case workflow_states.PLANNED:
            case workflow_states.VERIFICATION_FAILED:
                return currentStep === 1 ? 'checked' : '';
            case workflow_states.TASK_COMPLETED:
                return currentStep <= 2 ? 'checked' : '';
            case workflow_states.VERIFIED:
                return currentStep <= 3 ? 'checked' : '';
            default:
                return '';
        }
    };

    const isStepChecked = (currentStep) => {
        switch (state) {
            case workflow_states.PLANNED:
            case workflow_states.VERIFICATION_FAILED:
                return currentStep === 1;
            case workflow_states.TASK_COMPLETED:
                return currentStep <= 2;
            case workflow_states.VERIFIED:
                return currentStep <= 3;
            default:
                return false;
        }
    };

    return (
        <div className="stepper-wrapper">
            <div className="stepper">
                <div className="stepper-content">
                    {isStepChecked(2) ?
                        <CheckedCircleIcon className={`stepper-circle ${getStepClass(1)}`} />
                        : <RecordCircleIcon className={`stepper-circle ${getStepClass(1)}`} />}
                    <p className="stepper-text">Complete Badge Tasks</p>
                </div>
                <ProgressBar className={`progress-bar ${getStepClass(2)}`}/>
                <div className="stepper-content">
                    {isStepChecked(3) ?
                        <CheckedCircleIcon className={`stepper-circle ${getStepClass(2)}`} />
                        : <RecordCircleIcon className={`stepper-circle ${getStepClass(2)}`} />}
                    <p className="stepper-text">Await Badge Verification</p>
                </div>
                <ProgressBar className={`progress-bar ${getStepClass(3)}`}/>
                <div className="stepper-content">
                    {isStepChecked(3) ?
                        <CheckedCircleIcon className={`stepper-circle ${getStepClass(3)}`} />
                        : <RecordCircleIcon className={`stepper-circle ${getStepClass(3)}`} />}
                    <p className="stepper-text">Badge Available</p>
                </div>
            </div>
        </div>
    );
}