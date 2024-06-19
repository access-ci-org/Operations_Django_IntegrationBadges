import jetStream2 from '../../../../../assets/img/jetstream2_logo.png';
import delta from '../../../../../assets/img/delta_logo.png';
import anton from '../../../../../assets/img/anton_logo.png';
import ookami from '../../../../../assets/img/OOKAMI_logo.png';

export default function ResourceCardHeader ({ data }) {
    let logo = jetStream2;
    if (data.institution === 'National Center for Supercomputing Applications') {
        logo = delta;
    } else if (data.institution === 'Pittsburgh Supercomputing Center') {
        logo = anton;
    } else if (data.institution === 'Institute for Advanced computational Science at Stony Brook University') {
        logo = ookami;
    }

    return (
        <div className="card-header-wrapper">
            <div className="card-header">
                <img src={logo} alt={data.institution}/>
            </div>
        </div>
    );
}