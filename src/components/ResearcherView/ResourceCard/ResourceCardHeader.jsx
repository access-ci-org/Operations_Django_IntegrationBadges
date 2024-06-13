import jetstream2 from '../../../assets/img/jetstream2_logo_small.png';

export default function ResourceCardHeader ({ data }) {
    return (
        <div className="card-header">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <p>{data.type} Resource</p>
                    <p className="resource-title">{data.name}</p>
                </div>
                <img src={jetstream2} alt="Jetstream2" style={{ paddingLeft: '8px', maxHeight: '48px', maxWidth: '80px' }}/>
            </div>
            <a href="#" className="resource-inst">{data.institution}</a>
        </div>
    );
}