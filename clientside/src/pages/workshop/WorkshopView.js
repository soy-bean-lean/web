import { Link } from 'react-router-dom';

import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';

import { confirmAlert } from 'react-confirm-alert';
import { useParams } from 'react-router-dom';

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

function WorkshopView() {
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

  const { authState, setAuthState } = useContext(AuthContext);
  const [result, setResult] = useState();

  
  //const [image, setBlogImage] = useState();
 
  // var today = new Date(),
  //   Currentdate =
  //     today.getFullYear() +
  //     '-' +
  //     (today.getMonth() + 1) +
  //     '-' +
  //     today.getDate();
  let history = useHistory();

  

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccefull Attempt,Try Againg</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Greate Attempt is Succesfull</Alert>
        </>
      );
    }
  }

  const deleteItem = () => {
    const data = {
      wid: id,
      tableName: 'csslworkshop',
      coloum: 'wId',
    };
console.log(id);
    axios.post('http://localhost:3001/workshop/deleteItem', data).then(response => {
      if (response.data.error) {
        setResult('err');
        setTimeout(
          function () {
            history.push('/manageworksops');
          },

          2000,
        );
      } else {
        setResult('done');

        setTimeout(
          function () {
            history.push('/manageworksops');
            //hri giyoth yana thena
          },

          2000,
        );
      }
    });
  };

  const submit = () => {
    confirmAlert({
      message: 'Are you sure to Delete ?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteItem();
          },
        },
        {
          label: 'No',
          onClick: () => {
            //alert('Click No')
          },
        },
      ],
    });
  };


  const updateBlog = () => {
    const blogData = new FormData();
    //blogData.append('image', image);
    blogData.append('title', title);
    blogData.append('description', desc);
    blogData.append('subject', subject);
    blogData.append('fromDate', fromDate);
    blogData.append('toDate', toDate);
    blogData.append('duration', duration);
    blogData.append('credit', credit);
    blogData.append('wId', id);

    console.log("data;",blogData);
    fetch('http://localhost:3001/blog/updateBlog', {
      method: 'POST',
      body:blogData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
    .then(res => res.json())
      .then(res => {
        setResult('done');
        setTimeout(
          function () {
            history.push('/manageworksops');
          },

          2000,
        );
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/addCredit/cssl00' + blogData.wId + '/' + blogData.title);
          },

          2000,
        );
      });
  };

  


  useEffect(() => {
    const sendData={
      id:id,
    }
    axios
      .post('http://localhost:3001/workshop/getWorkshopView', sendData)

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          console.log(response.data[0]);
          setTitle(response.data[0].title);
          setDesc(response.data[0].description);
          setSubject(response.data[0].subject);
          setFromDate(response.data[0].fromDate);
          setToDate(response.data[0].toDate );
          setDuration(response.data[0].duration);
          setCredit(response.data[0].credit);
          setImage(response.data[0].image);
          
          
        }
      })
      .catch(error => {
        //   alert(error);
      });
    

   

     
      
  }, []);

//   return (
//     <Page title="Assign Credit/Deny Request">
//        <Link to="/manageworksops">
//         <Button color="primary">Back</Button>
//       </Link>
      
//     </Page>
//   );

return (
    <Page title={title}>
        <Link to="/manageworksops">
        <Button color="primary">Workshop List</Button>
      </Link>
      <hr></hr>
      <Row>
        <Col sm="5" md={{ size: 6, offset: 3 }}>
          <br></br>
          <Card className="profileInfo">
            <CardBody>
              <center>
                {msg()}{' '}
                <Badge pill color="primary" className="mr-1">
                  Workshop details
                </Badge>
                <br />
                {/* <br /> */}
                <img
                  src={'http://localhost:3001/uploads/workshop/' + image}
                  height="60%"
                          width="60%"
                  className="writeImg"
                />
                <br></br>
                <br></br>
                <h4>
                  {title} 
                </h4>{' '}
                {/* <Badge pill color="warning" className="mr-1">
                  {type.toUpperCase()}
                </Badge> */}
                <br />
                <br />
                <p>{desc}</p>
                <p>{subject}</p>
               <p> { 'From' +'  '+ fromDate + '  To ' + toDate}</p>
                <p>{duration + '  hours per Day'}</p>
             
                
              </center>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default WorkshopView;
