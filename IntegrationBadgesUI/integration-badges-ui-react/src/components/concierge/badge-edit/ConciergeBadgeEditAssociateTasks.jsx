import {useBadges} from "../../../contexts/BadgeContext.jsx";
import MultiSelectControlTwoLists from "../../util/MultiSelectControlTwoLists.jsx";
import {useTasks} from "../../../contexts/TaskContext.jsx";
import taskAddIcon from "../../../assets/tdesign_task-add.png"
import React from "react";

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
            icon={<img src={taskAddIcon} alt={"Add task Icon"} className="h-100 m-1"/>}
            rightPanelStyles={{paddingTop: "60px"}}
            showRightPanelIcon={false}
            allowEdit={true}
            enableOrdering={true}
            enableViewMoreDetails={true}
            getMoreDetailsComponent={(item) => {
                const task = getTask({taskId: item.id});

                return <div className="row d-flex">
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7" >Technical Summary</div>
                        <p className="mb-0 fs-8 word-break-break-all" >
                            {task.technical_summary}
                        </p>
                    </div>
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7">Implementer Roles</div>
                        <p className="mb-0 fs-8 word-break-break-all">
                            {task.implementor_roles}
                        </p>
                    </div>
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7">Task Experts</div>
                        <p className="mb-0 fs-8 word-break-break-all">
                            {task.task_experts}
                        </p>
                    </div>
                    <div className="col-sm-6 ps-3 pe-3 pt-3">
                        <div className="mb-2 fs-7">Instructions URL</div>
                        <p className="w-100 mb-0 fs-8 word-break-break-all">
                            {task.detailed_instructions_url}
                        </p>
                    </div>
                </div>
            }}
        />
    </div>
}
