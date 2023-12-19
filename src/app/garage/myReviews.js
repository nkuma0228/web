import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import moment from 'moment';
import ReactStars from "react-rating-stars-component";
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Header from "./header";
import Footer from "./footer";
import Review from "../../assets/garage/images/review.webp";

import { garageReviews, garageReplyCreate } from "../../redux/actions/provider/authAction";

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

const initialState = {
  replyText:'',
  replyTextEmpty:'',
}

const MyGarageReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProfileData = useSelector(state => state.provider)
    const { providerGarageReviewData } = getProfileData
    
    useEffect(() => {
        dispatch(garageReviews())
    },[])

    const time_ago = (time) => {

        switch (typeof time) {
          case 'number':
            break;
          case 'string':
            time = +new Date(time);
            break;
          case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
          default:
            time = +new Date();
        }
        var time_formats = [
          [60, 'seconds', 1], // 60
          [120, '1 minute ago', '1 minute from now'], // 60*2
          [3600, 'minutes', 60], // 60*60, 60
          [7200, '1 hour ago', '1 hour from now'], // 60*60*2
          [86400, 'hours', 3600], // 60*60*24, 60*60
          [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
          [604800, 'days', 86400], // 60*60*24*7, 60*60*24
          [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
          [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
          [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
          [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
          [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
          [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
          [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
          [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
          token = 'ago',
          list_choice = 1;
      
        if (seconds == 0) {
          return 'Just now'
        }
        if (seconds < 0) {
          seconds = Math.abs(seconds);
          token = 'from now';
          list_choice = 2;
        }
        var i = 0,
          format;
        while (format = time_formats[i++])
          if (seconds < format[0]) {
            if (typeof format[2] == 'string')
              return format[list_choice];
            else
              return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
          }
        return time;
    }
    
    const [reviewID, setReviewID] = useState('');

    const [modalReplyShow, setModalReplyShow] = useState(false);
    const handleModalReplyClose = () => setModalReplyShow(false);
    const handleModalReplyShow = (id) => { setModalReplyShow(true); setReviewID(id); }

    const [rState, updateRState] = useState(initialState);
    const {
        replyText,
        replyTextEmpty,
    } = rState

    const handleReplyInputChange = (e) => {
      const { name, value } = e.target
      updateRState({
          ...rState, [name]: value
      })
    }

    const handleValidation = () => {
      let replyTextEmpty = ''
      let formIsValid = true;

      if (!replyText.trim()) {
          replyTextEmpty = "Reply field is required";
          formIsValid = false;
      }
      updateRState({
          ...rState, 
          replyTextEmpty
      })
      return formIsValid;
    }

    let handleReplySubmit = (event) => {
      event.preventDefault();
      let formIsValid = handleValidation();
      if (formIsValid) {
          const data = { reviewID:reviewID, reply:replyText }
          dispatch(garageReplyCreate(data)).then(res => {
              if (res.code == 200) {
                  handleModalReplyClose();
                  toast.success("Reply added successfully", {
                      position: toast.POSITION.TOP_RIGHT
                  });
                  setTimeout(
                      function() { window.location.reload() }
                      .bind(this), 2000
                  );
              } else {
                  toast.error(res.message, {
                      position: toast.POSITION.TOP_RIGHT
                  });
                  updateRState({
                      ...rState, 
                      errorMsg: res.message,
                      replyTextEmpty: ''
                  })
              }
          }).catch(err => {
              const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
              toast.error(message, {
                  position: toast.POSITION.TOP_RIGHT
              });
          })
      }
    }

    return (
        <>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="Small-Wrapper">
                        <div className="TitleBox">
                            <h4>Garage Ratings & Reviews</h4>
                        </div>

                        <div className="CommentBox"> 
                            <ul>
                                { 
                                    providerGarageReviewData && providerGarageReviewData.length>0 ? providerGarageReviewData.map((item, i) => 
                                    
                                        <li>
                                            <figure><img src={Review} /></figure>
                                            <h4> { item.clientData.firstName } { item.clientData.lastName } </h4>
                                            <h5>
                                                <ReactStars
                                                    count={item.rating}
                                                    size={30}
                                                    activeColor="#fae700"
                                                    color="#fae700"
                                                />
                                            </h5>
                                            <p> { item.comment } </p>
                                            <h6>
                                                <span> { time_ago(item.createdAt) } </span>
                                            </h6> 
                                            <h6>Reply :
                                                { 
                                                  item.reply ? item.reply :
                                                  <a href="javascript:void(0);" onClick={()=>handleModalReplyShow(item._id)}>Reply</a>
                                                }
                                            </h6> 
                                        </li> 

                                ) : "Not any review yet"
                                }
                            </ul>
                        </div>
                        
                    </div>  
                </div>
            </div>
            
            <Modal show={modalReplyShow} className="PanelModal">
                <div className="modal-body">
                    <div className="Category">
                        <a href="javascript:void(0);" className="Close" onClick={handleModalReplyClose}>×</a>
                        <h3> Reply </h3>

                        <FORM onSubmit={handleReplySubmit}>
                            <div className="form-group">
                                <textarea className="form-control" name="replyText" value={replyText} onChange={handleReplyInputChange}></textarea>
                                <span style={{ color: "red" }}>{replyTextEmpty}</span>
                            </div>
                            <button type="submit" className="Accept"> Submit </button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default MyGarageReviews