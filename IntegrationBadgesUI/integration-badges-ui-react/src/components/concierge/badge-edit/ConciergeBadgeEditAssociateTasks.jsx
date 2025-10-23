import {useBadges} from "../../../contexts/BadgeContext.jsx";
import MultiSelectControlTwoLists from "../../util/MultiSelectControlTwoLists.jsx";
import {useTasks} from "../../../contexts/TaskContext.jsx";
import taskAddIcon from "../../../assets/tdesign_task-add.png"

export default function ConciergeBadgeEditAssociateTasks({badgeData, setBadgeData}) {
    const {getTasks, getTask} = useTasks();

    const items = getTasks().map(task => ({id: task.task_id, label: task.name}));
    const value = badgeData.tasks.map(({task_id, required}) => {
        const task = getTask({taskId: task_id});
        return {id: task.task_id, required: required};
    });

    return <div className="w-100 d-inline-block text-start">
        <MultiSelectControlTwoLists
            items={items}
            value={value}
            onChange={(items) => {
                const nextState = {
                    ...badgeData,
                    tasks: items.map((item, sequenceNo) => ({
                        task_id: item.id,
                        required: item.required,
                        sequence_no: sequenceNo
                    })),
                };
                setBadgeData(nextState);
            }}
            filterLabel="Filter tasks"
            icon={<img src={taskAddIcon} alt={"Add task Icon"} style={{width: "28px"}}/>}
        />
    </div>
}
