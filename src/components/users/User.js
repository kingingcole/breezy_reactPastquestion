import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getuserInfo,
  usereditValue,
  usereditPix,
  updatePix
} from '../../actions/UserActions';
import {
  getpastQuestion,
  deletepqsArray,
  deletePastquestion
} from '../../actions/UploadPquestionActions';
import { connect } from 'react-redux';
import { isNull } from 'util';

class User extends Component {
  componentWillMount() {
    const { id } = this.props.user;
    this.props.getuserInfo(id);
    this.props.getpastQuestion();
  }

  delete = e => {
    const { deletedPqs } = this.props;
    let data = {
      past_questions: deletedPqs,
      _method: 'DELETE'
    };
    this.props.deletePastquestion(data);
    e.preventDefault();
  };

  /** onUserPix = e => {
    const file = e.target.files[0];
    this.props.usereditPix(file);
  };*/

  onUserPix2 = () => {
    let picFormData = new FormData();
    picFormData.append('photos', this.userPic.files[0]);

    picFormData.append('id', this.props.user.id);
    return picFormData;
  };

  /**onUserPix = e => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.props.usereditPix(e.target.result);
    };
  };*/

  proPix = e => {
    this.props.updatePix(this.onUserPix2());

    e.preventDefault();
  };

  handleImageUpload = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'exampaperonline',
        uploadPreset: 'axgm909r',
        maxFileSize: 100000
      },
      async function(error, result) {
        //
        if (result && result.event === 'success') {
          let ourURL = await result.info.secure_url;
          this.props.updatePix(ourURL);
        }
      }
    );

    widget.open();
  };

  render() {
    const { singleuser, singleuserdocs, prev, next } = this.props;

    return (
      <div className="profile-page sidebar-collapse">
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={{ backgroundImage: 'url("../assets/img/city-profile.jpg")' }}
        />

        <div className="main main-raised">
          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="profile">
                    <div className="avatar">
                      <a
                        href="../../assets/img/faces/christian.jpg"
                        target="self"
                      >
                        <img
                          src="../assets/img/faces/christian.jpg"
                          alt="Circle"
                          className="img-raised rounded-circle img-fluid"
                        />
                      </a>
                      <i
                        onClick={this.handleImageUpload}
                        style={{
                          position: 'relative',
                          bottom: 13,
                          right: 28,
                          cursor: 'pointer'
                        }}
                        className="fa fa-camera fa-lg"
                      />
                    </div>
                    <div className="name">
                      <h3 className="title">{singleuser.name}</h3>
                      <h6>{singleuser.phone}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description text-center">
                <p style={{ fontSize: 16 }}>{singleuser.description}</p>
                <div style={{ paddingBottom: 8 }}>
                  <h6> {singleuser.votes} votes </h6>
                </div>
                <div id="buttons" className="cd-section">
                  <Link to={`/user/edit/${singleuser.id}`}>
                    <button className="btn btn-primary btn-sm">
                      Edit Profile
                    </button>
                  </Link>
                </div>
                <form className="contact-form" style={{ display: 'none' }}>
                  {/*<input 
                    type="file"
                    name="userpix"
                    onChange={this.onUserPix.bind(this)}
/>*/}
                  <input
                    ref={ref => (this.userPic = ref)}
                    type="file"
                    name="userpix"
                  />
                  <button onClick={this.proPix.bind(this)}>upload</button>
                </form>
              </div>

              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  {singleuserdocs.length > 0 ? (
                    <form className="form">
                      <div style={{ paddingTop: 24 }}>
                        <h2 className="text-center title">
                          Uploaded Documents
                        </h2>
                        <div id="checkRadios" style={{ marginTop: -20 }}>
                          {singleuserdocs.map(singleuserdoc => (
                            <div className="form-check" key={singleuserdoc.id}>
                              <label className="form-check-label">
                                <input
                                  true
                                  name="singleuserdoc.id"
                                  value={singleuserdoc.id}
                                  className="form-check-input"
                                  onChange={e =>
                                    this.props.deletepqsArray(e.target.value)
                                  }
                                  type="checkbox"
                                />{' '}
                                {singleuserdoc.course_name}
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="row">
                          <div className="col-md-2.5 ml-auto mr-auto">
                            <div id="buttons" class="cd-section">
                              <button
                                onClick={this.delete.bind(this)}
                                class="btn btn-primary btn-sm"
                                style={{ marginTop: 25 }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          id="progress"
                          style={{ marginTop: 9, paddingBottom: 40 }}
                        >
                          <ul className="pagination pagination-info mt-3">
                            <li className="page-item">
                              {isNull(prev) ? (
                                <span>
                                  <i className="fa fa-chevron-left" /> prev
                                </span>
                              ) : (
                                <Link
                                  to={prev}
                                  className="page-link"
                                  style={{ color: '#187bff' }}
                                >
                                  <span className="fa fa-chevron-left" /> prev
                                </Link>
                              )}
                            </li>
                            <li className="page-item">
                              {isNull(next) ? (
                                <span>
                                  next <i className="fa fa-chevron-right" />
                                </span>
                              ) : (
                                <Link
                                  to={next}
                                  className="page-link"
                                  style={{ color: '#187bff' }}
                                >
                                  next <span className="fa fa-chevron-right" />
                                </Link>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div style={{ paddingTop: 24 }}>
                      <h2 className="text-center title">
                        No Uploaded Documents
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer footer-default">
          <div className="container">
            <nav className="float-left"></nav>
            <div className="copyright float-right">ExamPaperOnline © 2019</div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  deletedPqs: state.uploadpquestion.deletedPqs,
  user: state.login.user,
  userpix: state.user.userpix,
  singleuser: state.user.singleuser,
  singleuserdocs: state.user.singleuserdocs,
  prev: state.uploadpquestion.prev,
  next: state.uploadpquestion.next
});

export default connect(
  mapStateToProps,
  {
    getuserInfo,
    getpastQuestion,
    deletepqsArray,
    deletePastquestion,
    usereditValue,
    usereditPix,
    updatePix
  }
)(User);
