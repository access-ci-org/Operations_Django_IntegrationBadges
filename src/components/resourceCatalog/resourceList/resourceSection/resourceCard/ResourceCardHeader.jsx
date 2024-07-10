import jetStream2 from '../../../../../assets/img/jetstream2_logo.png';


export default function ResourceCardHeader ({ resource }) {
    let logo = resource.organization_logo_url ? resource.organization_logo_url : jetStream2;

    return (
        <div className="card-header-wrapper">
            <div className="card-header">
                <img src={logo} alt={resource.organization_name}/>
            </div>
        </div>
    );
}