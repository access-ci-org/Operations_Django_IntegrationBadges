import Form from "react-bootstrap/Form";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";

function getTaskInputFields({taskData, setTaskData}) {

    const onInputValueChange = (fieldName) => (evt) => {
        setTaskData({...taskData, [fieldName]: evt.target.value});
    };

    return {
        name: <Form.Control type="text" value={taskData.name} onChange={onInputValueChange("name")}/>,

        technical_summary: <Form.Control as="textarea" rows={3} value={taskData.technical_summary}
                                          onChange={onInputValueChange("technical_summary")}/>,

        task_experts: <Form.Control type="text" value={taskData.task_experts}
                                                      onChange={onInputValueChange("task_experts")}/>,

        implementor_roles: <Form.Control type="text" value={taskData.implementor_roles}
                                                      onChange={onInputValueChange("implementor_roles")}/>,

        detailed_instructions_url: <Form.Control type="text" value={taskData.detailed_instructions_url}
                                                onChange={onInputValueChange("detailed_instructions_url")}/>,
    };
}

export default function ConciergeTaskEditDetails({taskData, setTaskData}) {
    return <ConciergeTaskEditDetailsV1 taskData={taskData} setTaskData={setTaskData}/>
}

export function ConciergeTaskEditDetailsV1({taskData, setTaskData}) {
    const taskInputFields = getTaskInputFields({taskData, setTaskData});

    return <div className="w-100 row">
        <div className="col-sm-12">
            <Form.Label>Task Name</Form.Label>
            {taskInputFields.name}
        </div>
        <div className="mb-3 col-sm-12">
            <Form.Label>Technical Summary</Form.Label>
            {taskInputFields.technical_summary}
        </div>
        <div className="mb-3 col-sm-6">
            <Form.Label>Task Experts</Form.Label>
            {taskInputFields.task_experts}
        </div>
        <div className="mb-3 col-sm-6">
            <Form.Label>Implementor Roles</Form.Label>
            {taskInputFields.implementor_roles}
        </div>
        <div className="mb-3 col-sm-6">
            <Form.Label>Instructions URL </Form.Label>
            {taskInputFields.detailed_instructions_url}
        </div>
    </div>
}
