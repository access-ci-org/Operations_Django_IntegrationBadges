import jetstream2 from '../../../assets/img/jetstream2_logo.png';

export default function ResourceCardHeader ({ data }) {
    return (
        <div className="card-header">
            <div style={{width: '100%', height: '100%'}}>
                <img src={jetstream2} alt="Jetstream2"/>
            </div>
        </div>
    );
}