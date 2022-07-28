import React, {useEffect, useState} from 'react'
import { getCompany } from '../services/companyService';
import { useParams } from 'react-router';
import { getReviews} from '../services/reviewService';
import PostReview from './postReview';

const Company = ({user}) => {
    const { id } = useParams();
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [logo, setLogo] = useState()
    const [web, setWeb] = useState()
    const [reviews, setReviews] = useState()
    useEffect(() => {
        const getData = async () => {
            try {
                const {data} = await getCompany(id);
                const {data: revs} = await getReviews();
                setName(data.name)
                setDescription(data.description)
                setWeb(data.website)
                setReviews(revs)
                import(`../images/${name.toLowerCase()}.jpeg`).then((module) => {
                    setLogo(module.default);
                });
            } catch (error) {
                if(error.response && error.response.status === 404) {
                    this.props.history.replace('/not-found')
                } else {
                    console.log("error", error);
                }
            }
        };
        getData();
    });
    
    return(
        <div>
            <img src={logo} alt="company logo" style={{width: '25rem', height: '20rem',
            justifyContent: 'center', alignItems: 'center', marginLeft: '28%', marginTop: '2rem', marginBottom: '3rem'}}></img>
            <h1 className="card-title">{name}</h1>
            <p className="card-text">{description}</p>
            <a href={web} target='_blank' rel="noreferrer" className='btn btn-primary' style={{marginTop: '1rem', marginBottom: '5rem'}}>Visit Website</a>

            <PostReview user={user} company={name}/>
            
            <h2 className="form-label mt-5 mb-5">What others think about this company</h2>

            <div>
            {reviews?.map(review => (
                review.company === name ? 
                (<div key={review._id} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col-auto d-none d-lg-block mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>                           
                    </div>
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{review.user.firstName} {review.user.lastName}</strong>
                    <p className="card-text mb-auto">{review.content}</p>
                    </div>
                </div>)
                : null
            ))}
        </div>
        </div>
    )
}
export default Company;
