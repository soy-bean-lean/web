import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import { Link, useHistory } from 'react-router-dom';
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
import FileUpload from '../../components/FileUpload/FileUploader';
// let history = useHistory();

const AddCpd = () => {
  let history = useHistory();

  const { authState, setAuthState } = useContext(AuthContext);

  //cpd
  const [recordName, setRecordName] = useState('');
  const [recType, setRecType] = useState('type');
  const [credit, setCredit] = useState('');
  const [note, setNote] = useState('');
  const [proofFile, setProofFile] = useState();

  const [courseId, setCourseId] = useState('');

  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [mode, setMode] = useState('');
  const [level, setLevel] = useState('');
  const [platform, setPlatform] = useState('');
  const [partner, setPartner] = useState('');
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState('');

  const [typeCourseName, setTypeCourseName] = useState('');
  const [platformOther, setPlatformOther] = useState('');
  const [partnerOther, setPartnerOther] = useState('');

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

  const [result, setResult] = useState('');

  //SUBMIT CPD RECORD
  const submitRecord = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    const mId = authState.memberId;
    const formData = new FormData();
    if (recordName != '' && recType != '') {
      if (recType == 'Course') {
        console.log('Inside if 1');
        if(proofFile == null &&
          proofFile == ''){
            setResult('validate');
            scrollToTop();
          }
        if (
          courseType == 'CSSLcourse' &&
          courseName != '' &&
          credit != '' &&
          proofFile != null &&
          proofFile != ''
        ) {
          console.log('Inside if 2');
          formData.append('mId', authState.memberId);
          formData.append('recTitle', recordName);
          formData.append('recordType', recType);
          formData.append('type', courseType);
          formData.append('proof', proofFile);
          formData.append('note', note);
          formData.append('credit', credit);
          formData.append('refId', courseName);
          formData.append('recDate', today);
          console.log(mId);
          fetch('http://localhost:3001/cpd/submitCsslCourseCpd', {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'multipart/form-data',
            },
            credentials: 'include',
          })
            .then(res => res.json())
            .then(res => {
              console.log(res.data);
              setResult('done');
              scrollToTop();
              setTimeout(function () {
                history.push('/csslmember/cpdrecords');
              }, 2000);
            })
            .catch(error => {
              setResult('err');
              console.log(error);
            });
        } else if (
          courseType == 'others' &&
          courseName != '' &&
          credit != '' &&
          proofFile != null &&
          proofFile != ''
        ) {
          const newCourseData = new FormData();
          if (platform == 'Other') {
            newCourseData.append('platform', platformOther);
          } else {
            newCourseData.append('platform', platform);
          }
          if (partner == 'Other') {
            newCourseData.append('partner', partnerOther);
          } else {
            newCourseData.append('partner', partner);
          }
          if (
            courseName == 'Other' ||
            partner == 'Other' ||
            platform == 'Other'
          ) {
            newCourseData.append('courseName', typeCourseName);
            newCourseData.append('mode', mode);
            newCourseData.append('skillLevel', level);
            newCourseData.append('duration', duration);
            newCourseData.append('durationType', durationType);

            axios
              .post(
                'http://localhost:3001/cpd/addNewOtherCourse',
                newCourseData,
              )

              .then(response => {
                if (response.data.error) {
                  alert(response.data.error);
                } else {
                  console.log(response.data);
                  formData.append('refId', response.data.insertId);
                }
              })
              .catch(error => {
                setResult('err');
                console.log(error);
              });
          } else {
            formData.append('refId', courseName);
          }

          formData.append('mId', authState.memberId);
          formData.append('recTitle', recordName);
          formData.append('recordType', recType);
          formData.append('type', courseType);
          formData.append('proof', proofFile);
          formData.append('note', note);
          formData.append('credit', credit);
          formData.append('refId', courseName);
          formData.append('recDate', today);

          fetch('http://localhost:3001/cpd/submitOtherCourseCpd', {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'multipart/form-data',
            },
            credentials: 'include',
          })
            .then(res => res.json())
            .then(res => {
              console.log(res.data);
              setResult('done');
              setTimeout(function () {
                history.push('/csslmember/cpdrecords');
              }, 2000);
            })
            .catch(error => {
              setResult('err');
              console.log(error);
            });
        }
        console.log();
      }
    } else {
      setResult('validate');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Again</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Attempt Successfull</Alert>
        </>
      );
    } else if (result == 'validate') {
      return (
        <>
          <Alert color="danger">
            Need to Complete Required Fields Correctly and Provide Necessary Documents Before Submit!
          </Alert>
        </>
      );
    }
  }

  //retireve course details from database (cssl courses and other courses - depending on the selection)
  const getCourses = event => {
    setCourseType(event.target.value);
    setCredit('');
    const submitCourseData = {
      mId: authState.memberId,
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
      mId: authState.memberId,
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
      mId: authState.memberId,
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

  //get file details
  const getFileData = val => {
    console.log(val);
    //setProofFile(val);
  };

  //load data to CSSL Course dropdown list
  const allInCourses =
    inCourseList &&
    inCourseList.map((li, i) => {
      return (
        <option key={i} value={i}>
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
      //const fromDate = li.fromDate.substring(0, 10);
      //const toDate = li.toDate.substring(0, 10);
      //if (workshopDate >= fromDate && workshopDate <= toDate) {
      if (workshopDate >= li.fromDate && workshopDate <= li.toDate) {
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

  const getOtherCourseCreditValue = event => {
    const i = event.target.value;
    if (i != 'Other' && i != '') {
      setCredit(outCourseList[i].credit);
      setCourseName(outCourseList[i].courseId);
    } else {
      setCredit('');
      setCourseName('');
    }
  };

  const getInCourseCreditValue = event => {
    const i = event.target.value;
    if (i != 'type' && i != '') {
      setCredit(inCourseList[i].credit);
      setCourseName(inCourseList[i].courseId);
    } else {
      setCredit('');
      setCourseName('');
    }
  };

  return (
    <Page title="CPD Records">
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
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
                      onChange={event => setRecordName(event.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Record Type
                  </Label>
                  <Col sm={9}>
                    <Input
                      name="select"
                      type="select"
                      onChange={e => {
                        setRecType(e.target.value);
                        setCredit('');
                      }}
                    >
                      <option value="type"></option>
                      <option value="Course">Courses</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Guest Lecture">Guest Lectures</option>
                      <option value="Others">Others</option>
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
                    <Input readOnly value={credit} />
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
                      onChange={e => setNote(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={12}>
                    Import Your Proof File(Images, PDF and Zip Files Accepted)
                  </Label>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Input
                      color="primary"
                      type="file"
                      className="input"
                      id="avatar"
                      name="avatar"
                      accept="image/*, application/pdf"
                      onChange={e => setProofFile(e.target.files[0])}
                    />
                    {/* <FileUpload onUploadFile={getFileData} /> */}
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button color="success" onClick={submitRecord}>
                      Submit
                    </Button>
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

  //render details according to the record type
  function renderDetails(r_type) {
    if (r_type == 'type') {
      return <FormGroup row></FormGroup>;
    } else if (r_type == 'Course') {
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
    } else if (r_type == 'Workshops') {
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
    } else if (r_type == 'Guest Lecture') {
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
    } else if (r_type == 'Others') {
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

  //if record type is Course, then check this condition to get the type of the course
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
            <Input
              type="select"
              name="select"
              onChange={getInCourseCreditValue}
            >
              <option value="type" data-value="type"></option>
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
              <Label for="exampleEmail" sm={3}></Label>
              <Col sm={9}>{renderTypePlatformFields(platform)}</Col>
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
              <Label for="exampleEmail" sm={3}></Label>
              <Col sm={9}>{renderTypePartnerFields(partner)}</Col>
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
                  type="select"
                  name="select"
                  onChange={e => setPartner(e.target.value)}
                  value={partner}
                >
                  <option value=""></option>
                  {allOutPartners}
                  <option value="Other">Other</option>
                </Input>
              </Col>
              <Label for="exampleEmail" sm={3}></Label>
              <Col sm={9}>{renderTypePartnerFields(partner)}</Col>
            </FormGroup>
            {renderOfflineOtherCourseList(partner)}
          </>
        );
      } else {
        return <FormGroup row></FormGroup>;
      }
    }
  }

  function renderTypePlatformFields(platform) {
    if (platform == 'Other') {
      return (
        <>
          <Input
            type="text"
            name="select"
            placeholder="Type Platform"
            onChange={e => setPlatformOther(e.target.value)}
            value={platformOther}
          ></Input>
        </>
      );
    }
  }

  function renderTypePartnerFields(partner) {
    if (partner == 'Other') {
      return (
        <>
          <Input
            type="text"
            name="select"
            placeholder="Type Platform"
            onChange={e => setPartnerOther(e.target.value)}
            value={partnerOther}
          ></Input>
        </>
      );
    }
  }

  function renderOnlineOtherCourseList(platform, partner) {
    if (platform == '' || partner == '') {
      return <FormGroup row></FormGroup>;
    } else if (platform == 'Other' || partner == 'Other') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course Duration
            </Label>
            <Col sm={3}>
              <Input
                className="input"
                type="number"
                onChange={e => setDuration(e.target.value)}
              />
            </Col>
            <Col sm={6}>
              <Input
                type="select"
                name="select"
                onChange={e => setDurationType(e.target.value)}
              >
                <option value="type"></option>
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                onChange={e => setTypeCourseName(e.target.value)}
                placeholder="Type Course Name"
              ></Input>
            </Col>
          </FormGroup>
        </>
      );
    } else {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course
            </Label>
            <Col sm={9}>
              <Input
                type="select"
                name="select"
                onChange={getOtherCourseCreditValue}
              >
                <option value=""></option>
                {allOnlineOutCourses}
                <option value="Other">Other</option>
              </Input>
            </Col>
            <Label for="exampleEmail" sm={3}></Label>
            <Col sm={9}>{renderTypeCourseFields(courseName)}</Col>
          </FormGroup>
          {renderDurationFields(courseName)}
        </>
      );
    }
  }

  function renderTypeCourseFields(course) {
    if (course == 'Other') {
      return (
        <>
          <Input
            type="text"
            name="select"
            placeholder="Type Course Name"
            onChange={e => setTypeCourseName(e.target.value)}
            value={typeCourseName}
          ></Input>
        </>
      );
    }
  }

  function renderDurationFields(course) {
    if (course == 'Other') {
      return (
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Course Duration
          </Label>
          <Col sm={3}>
            <Input
              className="input"
              type="number"
              onChange={e => setDuration(e.target.value)}
            />
          </Col>
          <Col sm={6}>
            <Input
              type="select"
              name="select"
              onChange={e => setDurationType(e.target.value)}
            >
              <option value="type"></option>
              <option value="Hours">Hours</option>
              <option value="Days">Days</option>
              <option value="Weeks">Weeks</option>
              <option value="Months">Months</option>
            </Input>
          </Col>
        </FormGroup>
      );
    }
  }

  function renderOfflineOtherCourseList(partner) {
    if (partner == '') {
      return <FormGroup row></FormGroup>;
    } else if (partner == 'Other') {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course Duration
            </Label>
            <Col sm={3}>
              <Input
                className="input"
                type="number"
                onChange={e => setDuration(e.target.value)}
              />
            </Col>
            <Col sm={6}>
              <Input
                type="select"
                name="select"
                onChange={e => setDurationType(e.target.value)}
              >
                <option value="type"></option>
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                onChange={e => setCourseName(e.target.value)}
                placeholder="Type Course Name"
              ></Input>
            </Col>
          </FormGroup>
        </>
      );
    } else {
      return (
        <>
          <FormGroup row>
            <Label for="exampleEmail" sm={3}>
              Course
            </Label>
            <Col sm={9}>
              <Input
                type="select"
                name="select"
                onChange={getOtherCourseCreditValue}
              >
                <option value=""></option>
                {allOfflineOutCourses}
                <option value="Other">Other</option>
              </Input>
            </Col>
            <Label for="exampleEmail" sm={3}></Label>
            <Col sm={9}>{renderTypeCourseFields(courseName)}</Col>
          </FormGroup>
          {renderDurationFields(courseName)}
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
            <Label for="exampleEmail" sm={3}></Label>
            <Col sm={9}>{renderTypeCourseFields(courseName)}</Col>
          </FormGroup>
        </>
      );
    }
  }
};

export default AddCpd;
