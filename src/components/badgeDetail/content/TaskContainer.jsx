import {ReactComponent as WarningIcon} from '../../../assets/img/icons/alert-triangle.svg';
import {ReactComponent as ArrowIcon} from '../../../assets/img/icons/arrow-right.svg';

const tasks = [
    {title: 'Ticket Routing Queue Setup - For RP queues', url: "https://google.com"},
    {title: 'Ticket Routing Queue Setup - For ACCESS awardee queues', url: "https://google.com"},
    {title: 'Ticket Handling', url: "https://google.com"},
];

function BadgeTask({title, url}) {
    return (
        <button className="btn btn-secondary task-list-action"
                onClick={() => window.location.href = url}>
            {title}
            <ArrowIcon style={{color: '#1a5b6e'}}/>
        </button>
    );
}

export default function TaskContainer() {
    return (
        <div className="task-container">
            <div className="task-container-header">
                <div className="task-container-title">
                    <h5>Associated Tasks</h5>
                    <p><span><WarningIcon/></span> Please complete tasks for all pre-requisite
                        badges before completing the tasks for this badge.</p>
                </div>
                <button className="btn btn-medium disabled" style={{minHeight: '36px'}}>
                    Mark as Completed
                </button>
            </div>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <BadgeTask key={index} title={task.title} url={task.url}/>
                ))}
            </div>
        </div>
    );
}