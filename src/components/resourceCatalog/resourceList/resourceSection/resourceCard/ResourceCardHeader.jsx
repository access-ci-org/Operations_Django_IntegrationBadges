import QuestionIcon from '../../../../../assets/img/icons/question-circle.svg';


export default function ResourceCardHeader ({ resource }) {
    let logo = resource.organization_logo_url ? resource.organization_logo_url : QuestionIcon;

    return (
        <div className="card-header-wrapper">
            <div className="card-header">
                <img src={logo} alt={resource.organization_name}/>
            </div>
        </div>
    );
}