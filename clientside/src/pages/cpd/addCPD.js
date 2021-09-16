import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';

// import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
// let history = useHistory();

const AddCpd = () => {
  //cpd
  const [recType, setRecType] = useState('type');

  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [mode, setMode] = useState('');
  const [level, setLevel] = useState('');
  const [platform, setPlatform] = useState('');
  const [partner, setPartner] = useState('');
  const [credit, setCredit] = useState('');

  const [workshopId, setWorkshopId] = useState('');
  const [workshopName, setWorkshopName] = useState('');
  const [workshopType, setWorkshopType] = useState('');
  const [workshopDate, setWorkshopDate] = useState('');

  const [glDate, setGLDate] = useState('');
  const [guestLecture, setGuestLecture] = useState('');
  const [guestLectureId, setGuestLectureId] = useState('');

  const [inCourseList, setInCourseList] = useState(null);
  const [outCourseList, setOutCourseList] = useState(null);
  const [outCoursePlatform, setOutCoursePlatform] = useState(null);
  const [outCoursePartner, setOutCoursePartner] = useState(null);
  const [inWorkshopList, setInWorkshopList] = useState(null);
  const [outWorkshopList, setOutWorkshopList] = useState(null);
  const [guestLectureList, setGuestLectureList] = useState(null);

  //retireve course details from database (cssl courses and other courses - depending on the selection)
  const getCourses = event => {
    setCourseType(event.target.value);

    const submitCourseData = {
      mId: 'cssl001',
      type: event.target.value,
    };

    if (submitCourseData.type != '') {
      axios
        .post('http://localhost:3001/cpd/getCourse', submitCourseData)

        .then(response => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            if (submitCourseData.type == 'CSSLcourse') {
              setInCourseList(response.data);
            } else if (submitCourseData.type == 'others') {
              setOutCourseList(response.data);
            } else {
              alert('Error:', response.data);
            }
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  //retireve distinct platforms and distinct partners from other course according to the course mode
  const getOtherCourseDetails = event => {
    setMode(event.target.value);

    const submitOtherCourseData = {
      mode: event.target.value,
    };
    if (submitOtherCourseData.mode == 'Online Course') {
      axios
        .post('http://localhost:3001/cpd/getPlatform', submitOtherCourseData)

        .then(response => {
          if (response.data.error) {
            alert(response.data.error);
            setOutCoursePlatform('Error on Data Loading');
          } else {
            setOutCoursePlatform(response.data);
            console.log('Platforms:', response.data);
          }
        })
        .catch(error => {
          alert(error);
        });
    }

    axios
      .post('http://localhost:3001/cpd/getPartner', submitOtherCourseData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setOutCoursePartner(response.data);
          console.log('Parners:', response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  //retireve workshop details from database (cssl workshop and other workshop - depending on the selection)
  const getWorkshops = event => {
    setWorkshopType(event.target.value);

    const submitWorkshopData = {
      mId: 'cssl001',
      type: event.target.value,
    };

    axios
      .post('http://localhost:3001/cpd/getWorkshop', submitWorkshopData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if (submitWorkshopData.type == 'CSSLworkshop') {
            setInWorkshopList(response.data);
          } else if (submitWorkshopData.type == 'others') {
            setOutWorkshopList(response.data);
          } else {
            alert('Error:', response.data);
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  //retireve guest lecture details from database
  const getGuestLectures = event => {
    setGLDate(event.target.value);

    const submitGLData = {
      mId: 'cssl001',
      gDate: event.target.value,
    };
    axios
      .post('http://localhost:3001/cpd/getGuestLecture', submitGLData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setGuestLectureList(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  //load data to CSSL Course dropdown list
  const allInCourses =
    inCourseList &&
    inCourseList.map((li, i) => {
      return (
        <option key={i} value={li.name}>
          {li.name}
        </option>
      );
    }, this);

  //load data to Course dropdown list (Online Other Courses)
  const allOnlineOutCourses =
    outCourseList &&
    outCourseList.map((li, i) => {
      if (li.mode == mode && li.platform == platform && li.partner == partner) {
        return (
          <option key={i} value={i}>
            {li.name}
          </option>
        );
      }
    }, this);

  //load data to Course dropdown list (Offline Other Courses)
  const allOfflineOutCourses =
    outCourseList &&
    outCourseList.map((li, i) => {
      if (li.mode == mode && li.partner == partner) {
        return (
          <option key={i} value={i}>
            {li.name}
          </option>
        );
      }
    }, this);

  //load data to Platform dropdown list
  const allOutPlatforms =
    outCoursePlatform &&
    outCoursePlatform.map((li, i) => {
      return (
        <option key={i} value={li.platform}>
          {li.platform}
        </option>
      );
    }, this);

  //load data to Online Partner/ Offline University dropdown list
  const allOutPartners =
    outCoursePartner &&
    outCoursePartner.map((li, i) => {
      return (
        <option key={i} value={li.partner}>
          {li.partner}
        </option>
      );
    }, this);

  //load data to CSSL Workshop dropdown list
  const allInWorkshops =
    inWorkshopList &&
    inWorkshopList.map((li, i) => {
      const fromDate = li.fromDate.substring(0, 10);
      const toDate = li.toDate.substring(0, 10);

      if (workshopDate >= fromDate && workshopDate <= toDate) {
        return (
          <option key={i} value={li.title}>
            {li.title}
          </option>
        );
      }
    }, this);

  //load data to Other Workshop dropdown list
  const allOutWorkshops =
    outWorkshopList &&
    outWorkshopList.map((li, i) => {
      const fromDate = li.fromDate.substring(0, 10);
      const toDate = li.toDate.substring(0, 10);
      if (workshopDate >= fromDate && workshopDate <= toDate) {
        return (
          <option key={i} value={li.title}>
            {li.title}
          </option>
        );
      }
    }, this);

  //load data to Guest Lecture dropdown list
  const allguestLectures =
    guestLectureList &&
    guestLectureList.map((li, i) => {
      return (
        <option key={i} value={li.university}>
          {li.university}
        </option>
      );
    }, this);

    const getCreditValue = (event) =>{
      const i = event.target.value;
      if(i != "Other" && i != ""){
        setCredit(outCourseList[i].credit);
      }
      else{
        setCredit("");
      }
    }

  return (
    <Page title="CPD Records" >
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          <Card>
            <CardHeader>New CPD Record</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Record Title
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="email"
                      onChange={event => {
                        //  setCompanyName(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Record Type
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      name="select"
                      onChange={e => setRecType(e.target.value)}
                    >
                      <option value="type"></option>
                      <option value="course">Courses</option>
                      <option value="workshops">Workshops</option>
                      <option value="guestLec">Guest Lectures</option>
                      <option value="others">Others</option>
                    </Input>
                  </Col>
                </FormGroup>

                {/*render other fields according to the record type*/}
                {renderDetails(recType)}

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Assigned Credits
                  </Label>
                  <Col sm={9}>
                    <Input readOnly value={credit}/>
                  </Col>
                </FormGroup>

             
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Note
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="textarea"
                      className="note"
                      placeholder="Description"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={12}>
                    Import Your Proof File From the Chooser (Images and PDF
                    Files)
                  </Label>
                  <Col sm="12" md={{ size: 6, offset:4} }>
                    <Input
                      type="file"
                      className="input"
                      id="avatar"
                      name="avatar"
                      accept="image/*, application/pdf"
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button color="success">Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
      <hr></hr>
    </Page>
  );

  function renderDetails(r_type) {
    if (r_type == 'type') {
      return <FormGroup row></FormGroup>;
    } else if (r_type == 'course') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course Type
            </Label>
            <Col sm={9}>
              <Input type="select" name="select" onChange={getCourses}>
                <option value=""></option>
                <option value="CSSLcourse">CSSL Courses</option>
                <option value="others">Others</option>
              </Input>
            </Col>
          </FormGroup>
          {renderCourseDetails(courseType)}
        </>
      );
    } else if (r_type == 'workshops') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Workshop Type
            </Label>
            <Col sm={9}>
              <Input type="select" name="select" onChange={getWorkshops}>
                <option value=""></option>
                <option value="CSSLworkshop">CSSL Workshop</option>
                <option value="others">Others</option>
              </Input>
            </Col>

            <Label for="exampleEmail" sm={3}>
              Workshop Date
            </Label>
            <Col sm={9}>
              <Input
                className="input"
                type="date"
                //placeholder="--Workshop Date--"
                onChange={e => setWorkshopDate(e.target.value)}
              />
            </Col>
          </FormGroup>
          {renderWorkshopDetails(workshopType, workshopDate)}
        </>
      );
    } else if (r_type == 'guestLec') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Guest Lecture Date
            </Label>
            <Col sm={9}>
              <Input
                type="date"
                //placeholder="--Workshop Date--"
                onChange={getGuestLectures}
              />
            </Col>
          </FormGroup>
          {renderGuestLectureList(glDate)}
        </>
      );
    } else if (r_type == 'others') {
      return (
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Event
          </Label>
          <Col sm={9}>
            <Input type="text" className="note" placeholder="Description" />
          </Col>

          <Label for="exampleEmail" sm={3}>
            Event Description
          </Label>
          <Col sm={9}>
            <Input type="textarea" className="note" placeholder="Description" />
          </Col>
        </FormGroup>
      );
    } else {
      return <FormGroup row></FormGroup>;
    }
  }

  function renderCourseDetails(c_type) {
    if (c_type == '') {
      return <FormGroup row></FormGroup>;
    }
    //render CSSL Course related fields
    else if (c_type == 'CSSLcourse') {
      return (
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            CSSL Course
          </Label>
          <Col sm={9}>
            <Input type="select" name="select">
              <option value="type"></option>
              {allInCourses}
            </Input>
          </Col>
        </FormGroup>
      );
    }
    //render Other Course related fields
    else if (c_type == 'others') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Mode of the Course
            </Label>
            <Col sm={9}>
              <Input
                type="select"
                name="select"
                onChange={getOtherCourseDetails}
              >
                <option value=""></option>
                <option value="Online Course">Online Course</option>
                <option value="Onsite Course">Onsite Course</option>
              </Input>
            </Col>
            {/* </FormGroup>
          
          <FormGroup row> */}
            <Label for="exampleEmail" sm={3}>
              Difficulty Level
            </Label>
            <Col sm={9}>
              <Input
                type="select"
                name="select"
                value={level}
                onChange={e => setLevel(e.target.value)}
              >
                <option value=""></option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </Input>
            </Col>
          </FormGroup>

          {rederOtherCourseFields(mode, level)}
        </>
      );
    } else {
      return <FormGroup row></FormGroup>;
    }
  }

  function rederOtherCourseFields(mode, level) {
    if (level == '') {
      return <FormGroup row></FormGroup>;
    } else {
      if (mode == 'Online Course') {
        return (
          <>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Online Platform
      
              </Label>
              <Col sm={9}>
                <Input
                  type="select"
                  name="select"
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                >
                  <option value=""></option>
                  {allOutPlatforms}
                  <option value="Other">Other</option>
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                University/ Institute/ Partner
              </Label>
              <Col sm={9}>
                <Input
                  type="select"
                  name="select"
                  value={partner}
                  onChange={e => setPartner(e.target.value)}
                >
                  <option value=""></option>
                  {allOutPartners}
                  <option value="Other">Other</option>
                </Input>
              </Col>
            </FormGroup>

            {renderOnlineOtherCourseList(platform, partner)}
          </>
        );
      } else if (mode == 'Onsite Course') {
        return (
          <>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                University/ Institute
              </Label>
              <Col sm={9}>
                <Input
                  type="select" name="select"
                  onChange={e => setPartner(e.target.value)}
                  value={partner}
                >
                  <option value=""></option>
                  {allOutPartners}
                  <option value="Other">Other</option>
                </Input>
              </Col>
            </FormGroup>
            {renderOfflineOtherCourseList(partner)}
          </>
        );
      } else {
        return <FormGroup row></FormGroup>;
      }
    }
  }

  function renderOnlineOtherCourseList(platform, partner) {
    if (
      platform == '' ||
      platform == 'Other' ||
      partner == '' ||
      partner == 'Other'
    ) {
      return <FormGroup row></FormGroup>;
    } else {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course
            </Label>
            <Col sm={9}>
              <Input
                type="select" name="select"
                onChange={getCreditValue}
              >
                <option value=""></option>
                {allOnlineOutCourses}
                <option value="Other">Other</option>
              </Input>
            </Col>
          </FormGroup>
        </>
      );
    }
  }

  function renderOfflineOtherCourseList(partner) {
    if (partner == '' || partner == 'Other') {
      return <FormGroup row></FormGroup>;
    } else {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course
            </Label>
            <Col sm={9}>
              <Input type="select" name="select">
                <option value=""></option>
                {allOfflineOutCourses}
                <option value="Other">Other</option>
              </Input>
            </Col>
          </FormGroup>
        </>
      );
    }
  }

  function renderWorkshopDetails(w_type, w_date) {
    if (w_type == '' || w_date == '') {
      return <FormGroup row></FormGroup>;
    }
    //render CSSL Workshop related fields
    else if (w_type == 'CSSLworkshop') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              CSSL Workshops
            </Label>
            <Col sm={9}>
              <Input type="select" name="select">
                <option value=""></option>
                {allInWorkshops}
              </Input>
            </Col>
          </FormGroup>
        </>
      );
    }
    //render Other Course related fields
    else if (w_type == 'others') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Workshops
            </Label>
            <Col sm={9}>
              <Input type="select" name="select">
                <option value=""></option>
                {allOutWorkshops}
              </Input>
            </Col>
          </FormGroup>
        </>
      );
    } else {
      return <FormGroup row></FormGroup>;
    }
  }

  //render Guest Lecture related fields
  function renderGuestLectureList(g_date) {
    if (g_date == '') {
      return <FormGroup row></FormGroup>;
    } else {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Guest Lecture
            </Label>
            <Col sm={9}>
              <Input type="select" name="select">
                <option value=""></option>
                {allguestLectures}
              </Input>
            </Col>
          </FormGroup>
        </>
      );
    }
  }
};

export default AddCpd;
