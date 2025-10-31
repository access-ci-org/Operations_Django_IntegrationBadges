import {ConciergeBadgeEditDetailsV2} from "./ConciergeBadgeEditDetails.jsx";
import {useBadges} from "../../../contexts/BadgeContext.jsx";
import {useTasks} from "../../../contexts/TaskContext.jsx";
import InlineWarningMessage from "../../util/InlineWarningMessage.jsx";

export default function ConciergeBadgeEditReviewAndEdit({badgeData, setBadgeData, onClickEditTasks, onClickEditPrerequisiteBadges}) {
    const {getBadge} = useBadges();
    const {getTask} = useTasks();

    const requiredBadges = [];
    const recommendedBadges = [];

    for (let i = 0; i < badgeData.prerequisites.length; i++) {
        const {badge_id, required} = badgeData.prerequisites[i];
        if (required) requiredBadges.push(getBadge({badgeId: badge_id}));
        else recommendedBadges.push(getBadge({badgeId: badge_id}));
    }


    const requiredTasks = [];
    const recommendedTasks = [];

    for (let i = 0; i < badgeData.tasks.length; i++) {
        const {task_id, required} = badgeData.tasks[i];
        if (required) requiredTasks.push(getTask({taskId: task_id}));
        else recommendedTasks.push(getTask({taskId: task_id}));
    }

    return <div className="w-100 d-inline-block text-start">
        <h3 className="text-black pb-4 fw-medium">Badge Description</h3>

        <ConciergeBadgeEditDetailsV2 badgeData={badgeData} setBadgeData={setBadgeData}/>


        <div className="d-flex flex-row pb-4 pt-5">
            <h3 className="text-black fw-medium flex-fill">Associated Tasks</h3>
            <button className="btn btn-link" onClick={onClickEditTasks}>Edit</button>
        </div>


        <div className="row pb-5">
            <div className="col-sm-6 pe-3">
                Required Tasks
            </div>
            <div className="col-sm-6">
                {requiredTasks.length === 0 && <InlineWarningMessage description="No associated required tasks"/>}
                {requiredTasks.map((task, taskIndex) => <div key={taskIndex}>{task.name}</div>)}
            </div>
        </div>

        <div className="row pt-3">
            <div className="col-sm-6 pe-3">
                Recommended Tasks
            </div>
            <div className="col-sm-6">
                {recommendedTasks.length === 0 && <InlineWarningMessage description="No associated recommended tasks"/>}
                {recommendedTasks.map((task, taskIndex) => <div key={taskIndex}>{task.name}</div>)}
            </div>
        </div>

        <div className="d-flex flex-row pb-4 pt-5">
            <h3 className="text-black fw-medium flex-fill">Prerequisite Badges</h3>
            <button className="btn btn-link" onClick={onClickEditPrerequisiteBadges}>Edit</button>
        </div>

        <div className="row pt-3">
            <div className="col-sm-6 pe-3">
                Recommended Badges
            </div>
            <div className="col-sm-6">
                {recommendedBadges.length === 0 && <InlineWarningMessage description="No associated prerequisite recommended badges"/>}
                {recommendedBadges.map((badge, badgeIndex) => <div key={badgeIndex}>{badge.name}</div>)}
            </div>
        </div>

    </div>
}
