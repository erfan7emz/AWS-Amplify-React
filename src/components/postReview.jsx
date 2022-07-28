import React, { useState} from 'react'
import { Button } from 'react-bootstrap';
import { postReview } from '../services/reviewService';

const PostReview = ({user, company}) => {
    const [data,setData] = useState({review: ''}) 
    const handleChange = e =>{
        setData( {[e.target.name]: e.target.value} )
    }
    const handleSubmit = () =>{
        if(user){
            postReview(data.review, user._id, company)
            setData( {review: ''} )
        } else {
            alert('Please login first to add review.')
        }
    }
    return (
        <div>
            <div className="mb-3">
                <h4 className="form-label mb-4">Share your experience of using this software</h4>
                <textarea className="form-control" 
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleChange}
                value={data.review}
                name="review"
                ></textarea>
            </div>
            <Button 
            className='btn btn-primary mt-4 mb-5' 
            onClick={handleSubmit}
            >Submit Review</Button>
        </div>
    );
};

export default PostReview;