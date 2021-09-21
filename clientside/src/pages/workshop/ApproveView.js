import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../main.css';

import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { useHistory } from 'react-router-dom';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Alert,
  Input,
  Label,
  Row,
} from 'reactstrap';

function ApproveWorkshopView() {
  const { id } = useParams();
  const add = '';
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [subject, setSubject] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [duration, setDuration] = useState('');
  const [credit, setCredit] = useState('');
  const [data, setData] = useState([]);
  const [conduct, setConductData] = useState(null);

  const { authState, setAuthState } = useContext(AuthContext);
  const [result, setResult] = useState();

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      id: id,
    };
    axios
      .post('http://localhost:3001/workshop/getApprovedWorkshop', sendData)

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          console.log(response.data[0]);
          setData(response.data[0]);
          setConductData(response.data);


          setTitle(response.data[0].title);
          setDesc(response.data[0].description);
          setSubject(response.data[0].subject);
          setFromDate(response.data[0].fromDate);
          setToDate(response.data[0].toDate);
          setDuration(response.data[0].duration);
          setCredit(response.data[0].credit);
          setImage(response.data[0].image);
        }
      })
      .catch(error => {});
  }, []);


  const back = () => {
    history.push('/manageworksops');
  };


  function downloadQR() {
    const canvas = document.getElementById(id);
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'cssl workshop QR - ' + id + '.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }


  const conductors =
  conduct &&
  conduct.map(conduct => (
    <>
      <Badge color="warning" pill className="mr-3">
      {conduct.T} .  {conduct.firstName} {conduct.lastName}
      </Badge>
      <br />
      
      {/* <CardText className="comments">{data.description}</CardText> */}
    </>
  ));
  return (
    <Page title="Approved Workshop">
      <hr></hr>

      <Link to="/manageworksops">
        <Button color="primary">Workshop List</Button>
      </Link>
      <hr></hr>
      <Row>
        <Col sm="5" md={{ size: 8, offset: 2 }}>
          <br></br>
          <Card className="shadow">
            <CardBody>
              <center>
                <h4>{title}</h4>
                {conductors}
  

                {/* {data.T}. {data.firstName} {data.lastName} */}
                <hr />
                {/* <br /> */}
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 0 }}>
                    <img
                      src={'http://localhost:3001/uploads/workshop/' + image}
                      height="150px"
                      width="150px"
                    />
                  </Col>
                  <Col sm="12" md={{ size: 4, offset: 0 }}>
                    <QRCode size={150} level={'H'} value={id} id={id} />
                  </Col>
                </Row>
                <br></br>
                <br></br>
                <Badge color="warning" pill className="mr-1">
                  {subject}
                </Badge>
                <br></br>
                <br></br>
                <Badge color="primary" pill className="mr-1">
                  From Date: {fromDate} | To Date: {toDate}
                </Badge>
                <br></br>
                <br></br>
                <Badge color="primary" pill className="mr-1">
                  {duration + '  hours per Day'}
                </Badge>
                <br></br>
                <br></br>
                <p>{desc}</p>
                <hr />
              </center>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default ApproveWorkshopView;
