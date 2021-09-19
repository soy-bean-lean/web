import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import Page from 'components/Page';

import classnames from 'classnames';
import Typography from 'components/Typography';

import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  InputGroupAddon,
  InputGroup,
  FormGroup,
  Input,
  Badge,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  CardHeader,
  Table,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { AuthContext } from '../../helpers/AuthContext';
import Rating from '../../components/RatingStars/RatingStars';

const CardPage = props => {

  const { authState, setAuthState } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('2');
  const [activeSubTab, setActiveSubTab] = useState('3');
  const [memberId, setMemberId] = useState('');
  const [course, setCourse] = useState(null);
  const [enCourse, setEnCourse] = useState(null);
  const [level, setLevel] = useState('');
  const [instructor, setInstructor] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [searchCourse, setSearchCourse] = useState('');

  const [filterCourse, setFilterCourse] = useState(null);
  const [sortCourse, setSortCourse] = useState(null);
  const [selectCourse, setSelectCourse] = useState(null);
  const [instructorList, setInstructorList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);

  useEffect(() => {
    //setMemberId(authState.id);
    const formData = {
      mId: 'cssl001',
    };
    axios
      .post('http://localhost:3001/csslcourse/getCourseList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCourse(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getEnrollCourseList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setEnCourse(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getInstructorList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setInstructorList(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getCategoryList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCategoryList(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const filterResult = (e, val) => {
    setType('');
    setSearchCourse('');
    var searchData = {};
    if (val == 'instructor') {
      searchData = {
        mId: 'cssl001',
        level: level,
        instructor: e.target.value,
        category: category,
      };
    } else if (val == 'level') {
      searchData = {
        mId: 'cssl001',
        level: e.target.value,
        instructor: instructor,
        category: category,
      };
    } else if (val == 'category') {
      searchData = {
        mId: 'cssl001',
        level: level,
        instructor: instructor,
        category: e.target.value,
      };
    } else {
      searchData = {
        mId: 'cssl001',
        level: level,
        instructor: instructor,
        category: category,
      };
    }
    axios
      .post('http://localhost:3001/csslcourse/getFilterCourseList', searchData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFilterCourse(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const sortResult = event => {
    console.log(event.target.value);
    setLevel('');
    setInstructor('');
    setCategory('');
    setSearchCourse('');
    setType(event.target.value);

    const searchData = {
      mId: 'cssl001',
      sortType: event.target.value,
    };
    axios
      .post('http://localhost:3001/csslcourse/getSortCourseList', searchData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          setSortCourse(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const getSearchResult = () => {
    setLevel('');
    setInstructor('');
    setCategory('');
    setType('');

    const searchData = {
      mId: 'cssl001',
      sQuery: searchCourse,
    };
    axios
      .post('http://localhost:3001/csslcourse/getSearchCourseList', searchData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setSelectCourse(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleSub = tab => {
    if (activeSubTab !== tab) setActiveSubTab(tab);
  };

  const insList =
    instructorList &&
    instructorList.map((li, i) => {
      return (
        <option key={i} value={li.conductedBy}>
          {li.title}. {li.firstName} {li.lastName}
        </option>
      );
    }, this);

  const catList =
    categoryList &&
    categoryList.map((li, i) => {
      return (
        <option key={i} value={li.category}>
          {li.category}
        </option>
      );
    }, this);

  const allCourseList =
    course &&
    course.map((course, i) => (
      <>
        <Link
          to={
            '/csslcourses/courseview/cssl00' +
            course.courseId +
            '/' +
            course.name
          }
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <CardImg
                src={
                  'http://localhost:3001/uploads/csslCourses/' + course.image
                }
                style={{ width: 175, height: 150 }}
              />
              <CardBody>
                <h3>{course.name}</h3>
                <CardText>
                  Rating: {course.avgRate}{' '}
                  <Rating rate={course.avgRate} status={true} />
                  Views: {course.noOfInteraction}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const FilterCourseList =
    filterCourse &&
    filterCourse.map((course, i) => (
      <>
        <Link
          to={
            '/csslcourses/courseview/cssl00' +
            course.courseId +
            '/' +
            course.name
          }
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <CardImg
                src={
                  'http://localhost:3001/uploads/csslCourses/' + course.image
                }
                style={{ width: 175, height: 150 }}
              />
              <CardBody>
                <h3>{course.name}</h3>
                <CardText>
                  Rating: {course.avgRate}{' '}
                  <Rating rate={course.avgRate} status={true} />
                  Views: {course.noOfInteraction}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const SortCourseList =
    sortCourse &&
    sortCourse.map((course, i) => (
      <>
        <Link
          to={
            '/csslcourses/courseview/cssl00' +
            course.courseId +
            '/' +
            course.name
          }
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <CardImg
                src={
                  'http://localhost:3001/uploads/csslCourses/' + course.image
                }
                style={{ width: 175, height: 150 }}
              />
              <CardBody>
                <h3>{course.name}</h3>
                <CardText>
                  Rating: {course.avgRate}{' '}
                  <Rating rate={course.avgRate} status={true} />
                  Views: {course.noOfInteraction}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const SearchCourseList =
    selectCourse &&
    selectCourse.map((course, i) => (
      <>
        <Link
          to={
            '/csslcourses/courseview/cssl00' +
            course.courseId +
            '/' +
            course.name
          }
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <CardImg
                src={
                  'http://localhost:3001/uploads/csslCourses/' + course.image
                }
                style={{ width: 175, height: 150 }}
              />
              <CardBody>
                <h3>{course.name}</h3>
                <CardText>
                  Rating: {course.avgRate}{' '}
                  <Rating rate={course.avgRate} status={true} />
                  Views: {course.noOfInteraction}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const enrollOngoingCourseList =
    enCourse &&
    enCourse.map((enCourse, i) => {
      if (enCourse.status == 'Ongoing') {
        return (
          <>
            <Link
              to={
                '/csslcourse/enrolledcourse/cssl00' +
                enCourse.courseId +
                '/' +
                enCourse.name
              }
              key={i}
              className="link-tag"
            >
              <Col md={12} sm={10} xs={10} className="mb-2">
                <Card className="flex-row">
                  <CardImg
                    src={
                      'http://localhost:3001/uploads/csslCourses/' +
                      enCourse.image
                    }
                    style={{ width: 175, height: 150 }}
                  />
                  <CardBody>
                    <h3>{enCourse.name}</h3>
                    <CardText>{enCourse.status}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Link>
            <hr className="course-view-line"></hr>
          </>
        );
      }
    });

  const enrollCompletedCourseList =
    enCourse &&
    enCourse.map((enCourse, i) => {
      if (enCourse.status == 'Completed') {
        return (
          <>
            <Link
              to={
                '/csslcourse/enrolledcourse/cssl00' +
                enCourse.courseId +
                '/' +
                enCourse.name
              }
              key={i}
              className="link-tag"
            >
              <Col md={12} sm={10} xs={10} className="mb-2">
                <Card className="flex-row">
                  <CardImg
                    src={
                      'http://localhost:3001/uploads/csslCourses/' +
                      enCourse.image
                    }
                    style={{ width: 175, height: 150 }}
                  />
                  <CardBody>
                    <h3>{enCourse.name}</h3>
                    <CardText>{enCourse.status}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Link>
          </>
        );
      }
    });

  return (
    <Page title="CSSL COURSES">
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Enrolled Courses
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <InputGroup>
                    <Input
                      type="text"
                      className="note"
                      placeholder="What do you want to Learn"
                      value={searchCourse}
                      onChange={e => setSearchCourse(e.target.value)}
                    />
                    <InputGroupAddon addonType="prepend">
                      <Button
                        color="success"
                        size="LG"
                        onClick={getSearchResult}
                      >
                        Search{' '}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <br></br>
                  <FormGroup row>
                    <Col sm={3}>
                      <Input
                        type="select"
                        className="note"
                        value={level}
                        onChange={e => {
                          setLevel(e.target.value);
                          filterResult(e, 'level');
                        }}
                      >
                        <option value="">Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </Input>
                    </Col>
                    <Col sm={3}>
                      <Input
                        type="select"
                        className="note"
                        value={category}
                        onChange={e => {
                          setCategory(e.target.value);
                          filterResult(e, 'category');
                        }}
                      >
                        <option value="">Category</option>
                        {catList}
                      </Input>
                    </Col>
                    <Col sm={3}>
                      <Input
                        type="select"
                        className="note"
                        value={instructor}
                        onChange={e => {
                          setInstructor(e.target.value);
                          filterResult(e, 'instructor');
                        }}
                      >
                        <option value="">Instructor</option>
                        {insList}
                      </Input>
                    </Col>
                    <Col sm={3}>
                      <Input
                        type="select"
                        className="note"
                        value={type}
                        onChange={sortResult}
                      >
                        <option value="">Sort By</option>
                        <option value="Rating">Highest to Lowest Rating</option>
                        <option value="Interaction">
                          Most to Least Viewed
                        </option>
                        <option value="Date">Newest to Oldest Course</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </CardHeader>
                {level == '' &&
                  instructor == '' &&
                  category == '' &&
                  type == '' &&
                  searchCourse == '' && <CardBody>{allCourseList}</CardBody>}
                {(level != '' || instructor != '' || category != '') &&
                  type == '' &&
                  searchCourse == '' && <CardBody>{FilterCourseList}</CardBody>}
                {level == '' &&
                  instructor == '' &&
                  category == '' &&
                  type != '' &&
                  searchCourse == '' && <CardBody>{SortCourseList}</CardBody>}
                {level == '' &&
                  instructor == '' &&
                  category == '' &&
                  type == '' &&
                  searchCourse != '' && <CardBody>{SearchCourseList}</CardBody>}
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          {/* editing start */}
          <Nav tabs>
            <NavItem style={{ backgroundColor: 'white' }}>
              <NavLink
                className={classnames({ active: activeSubTab === '3' })}
                onClick={() => {
                  toggleSub('3');
                }}
              >
                Ongoing Courses
              </NavLink>
            </NavItem>
            <NavItem style={{ backgroundColor: 'white' }}>
              <NavLink
                className={classnames({ active: activeSubTab === '4' })}
                onClick={() => {
                  toggleSub('4');
                }}
              >
                Completed Courses
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeSubTab}>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardHeader>
                      <Typography className="text-primary">
                        Ongoing Courses
                      </Typography>
                    </CardHeader>
                    <CardBody>{enrollOngoingCourseList}</CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardHeader>
                      <Typography className="text-primary">
                        Completed Courses
                      </Typography>
                    </CardHeader>
                    <CardBody>
                      <CardBody>{enrollCompletedCourseList}</CardBody>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          {/* editing end */}
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default CardPage;
