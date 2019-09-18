import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  uploadpquestionValue,
  uploadPquestion,
  imgdocValue,
  getpastQuestion,
  searchpastQuestion,
  getprevpastQuestion
} from '../../actions/UploadPquestionActions';
import { connect } from 'react-redux';
import { isNull } from 'util';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getpastQuestion();
  }
  onImageChange = e => {
    const files = Array.from(e.target.files);
    console.log(e.target.files);
    console.log(files);
    this.props.imgdocValue(true);
    let formData = new FormData();

    files.forEach = (file, i) => {
      formData.append('images' + i, file);
      console.log(formData);
    };

    this.props.uploadpquestionValue({
      props: e.target.name,
      value: formData
    });
  };

  onDocChange = e => {
    const files = Array.from(e.target.files);
    this.props.imgdocValue(true);

    let formData = new FormData();
    files.map = (file, i) => {
      formData.append('docs' + i, file);
    };
    this.props.uploadpquestionValue({
      props: e.target.name,
      value: formData
    });
  };

  submit = e => {
    let {
      course_name,
      school,
      year,
      course_code,
      department,
      semester,
      images,
      docs
    } = this.props;

    docs.append('course_name', course_name);
    docs.append('course_code', course_code);
    docs.append('year', year);
    docs.append('department', department);
    docs.append('school', school);
    docs.append('semester', semester);
    console.log(images.entries(), docs);
    this.props.uploadPquestion(docs);

    e.preventDefault();
  };

  search = e => {
    const { search } = this.props;
    this.props.searchpastQuestion(search);
    e.preventDefault();
  };

  prev = e => {
    const { prev } = this.props;
    this.props.getprevpastQuestion(prev);
    e.preventDefault();
  };

  next = e => {
    const { next } = this.props;
    this.props.getprevpastQuestion(next);
    e.preventDefault();
  };
  render() {
    const {
      course_name,
      year,
      course_code,
      school,
      department,
      semester,
      questions,
      prev,
      next,
      search,
      results
    } = this.props;

    return (
      <div className="landing-page sidebar-collapse">
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={{
            backgroundImage: 'url("../assets/img/profile_city.jpg")',
            height: 450
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div id="buttons" className="cd-section">
                  <form>
                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        name="search"
                        className="form-control"
                        value={search}
                        required
                        placeholder="Search Question Papers..."
                        onChange={e =>
                          this.props.uploadpquestionValue({
                            props: e.target.name,
                            value: e.target.value
                          })
                        }
                      />
                    </div>
                    <br />
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={this.search.bind(this)}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            {questions.length > 0 && results.length === 0 ? (
              <div className="section text-center">
                <div className="row">
                  <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="title" style={{ paddingBottom: 15 }}>
                      Recent Upload{' '}
                    </h2>
                    <div className="description">
                      <div className="list-group">
                        {questions.map(question => (
                          <Link
                            to={`dashboard/singleitem/${question.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="list-group-item" key={question.id}>
                              <h4 className="list-group-item-heading">
                                {question.course_name}
                              </h4>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {question.course_code}
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {question.semester} semester
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {question.year}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div id="progress">
                        <ul className="pagination pagination-info mt-3">
                          <li className="page-item">
                            {isNull(prev) ? (
                              <span>
                                <i className="fa fa-chevron-left" /> prev
                              </span>
                            ) : (
                              <span
                                onClick={this.prev.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                <span className="fa fa-chevron-left" /> prev
                              </span>
                            )}
                          </li>
                          <li className="page-item">
                            {isNull(next) ? (
                              <span>
                                next <i className="fa fa-chevron-right" />
                              </span>
                            ) : (
                              <span
                                onClick={this.next.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                next <span className="fa fa-chevron-right" />
                              </span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="section text-center">
                <div className="row">
                  <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="title" style={{ paddingBottom: 15 }}>
                      Search Result{' '}
                    </h2>
                    <div className="description">
                      <div className="list-group">
                        {results.map(result => (
                          <Link
                            to={`dashboard/singleitem/${result.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="list-group-item" key={result.id}>
                              <h4 className="list-group-item-heading">
                                {result.course_name}
                              </h4>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {result.course_code}
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {result.semester} semester
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {result.year}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div id="progress">
                        <ul className="pagination pagination-info mt-3">
                          <li className="page-item">
                            {prev === null ? (
                              <span>
                                <i className="fa fa-chevron-left" /> prev
                              </span>
                            ) : (
                              <span
                                onClick={this.prev.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                <span className="fa fa-chevron-left" /> prev
                              </span>
                            )}
                          </li>
                          <li className="page-item">
                            {next === null ? (
                              <span>
                                next <i className="fa fa-chevron-right" />
                              </span>
                            ) : (
                              <span
                                onClick={this.next.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                next <span className="fa fa-chevron-right" />
                              </span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="section section-contacts">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="text-center title">Upload Question Papers</h2>

                  <form className="contact-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Course Name
                          </label>
                          <input
                            type="text"
                            name="course_name"
                            className="form-control"
                            value={course_name}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Course Code
                          </label>
                          <input
                            type="text"
                            name="course_code"
                            className="form-control"
                            value={course_code}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Department
                          </label>
                          <input
                            type="text"
                            name="department"
                            className="form-control"
                            value={department}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Semester</label>
                          <input
                            type="text"
                            name="semester"
                            className="form-control"
                            value={semester}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label className="bmd-label-floating">School</label>
                          <input
                            type="text"
                            name="school"
                            className="form-control"
                            value={school}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Year</label>
                          <input
                            type="text"
                            name="year"
                            className="form-control"
                            value={year}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">Images</span>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="images"
                              className="file-input"
                              id="inputGroupFile01"
                              onChange={this.onImageChange.bind(this)}
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">Docs</span>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              name="docs"
                              className="file-input"
                              id="inputGroupFile02"
                              onChange={this.onDocChange.bind(this)}
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 ml-auto mr-auto text-center">
                        <button
                          className="btn btn-primary btn-raised"
                          style={{ marginTop: 25 }}
                          type="button"
                          onClick={this.submit.bind(this)}
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </form>
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
  course_name: state.uploadpquestion.course_name,
  year: state.uploadpquestion.year,
  school: state.uploadpquestion.school,
  course_code: state.uploadpquestion.course_code,
  department: state.uploadpquestion.department,
  semester: state.uploadpquestion.semester,
  images: state.uploadpquestion.images,
  docs: state.uploadpquestion.docs,
  questions: state.uploadpquestion.questions,
  prev: state.uploadpquestion.prev,
  next: state.uploadpquestion.next,
  search: state.uploadpquestion.search,
  results: state.uploadpquestion.results
});

export default connect(
  mapStateToProps,
  {
    uploadpquestionValue,
    uploadPquestion,
    imgdocValue,
    getpastQuestion,
    searchpastQuestion,
    getprevpastQuestion
  }
)(Dashboard);
