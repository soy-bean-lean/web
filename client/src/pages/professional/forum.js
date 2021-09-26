import React, { useState, useEffect, useContext } from "react";
import "./style/forum.css";
import { AuthContext } from "../../helpers/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DiscussionBoard from 'react-discussion-board';
import 'react-discussion-board/dist/index.css'
import { useHistory } from "react-router-dom";

function Forum(){
  const [ image, setImage] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  var today = new Date(),
  Currentdate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();
    let history = useHistory();

  const allPosts = [
    // {
    //   profileImage:
    //     'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
    //   name: 'Jane Doe',
    //   content: '<p>Hello everyone!</p><p>How are you all doing?</p><p>-Jane</>',
    //   date: new Date('01 Jan 2020 01:12:00 GMT')
    // },
    {
      profileImage:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      name: 'John Doe',
      content:
        '<p>Raising say express had chiefly detract demands she. Quiet led own cause three him. Front no party young abode state up. Saved he do fruit woody of to. Met defective are allowance two perceived listening consulted contained. It chicken oh colonel pressed excited suppose to shortly. He improve started no we manners however effects. Prospect humoured mistress to by proposal marianne attended. Simplicity the far admiration preference everything. Up help home head spot an he room in Barton waited twenty always repair in within we do. An delighted offending curiosity my is dashwoods at. Boy prosperous increasing surrounded companions her nor advantages sufficient put. John on time down give meet help as of. Him waiting and correct believe now cottage she another. Vexed six shy yet along learn maids her tiled. Through studied shyness evening bed him winding present. Become excuse hardly on my thirty it wanted. </p>',
      date: new Date('01 Jan 2020 09:12:00 GMT')
    }
  ]

  const addForum = () => {
    const formData = new FormData();
    formData.append("image", authState.image);
    formData.append("name",name);
    formData.append("content",content);
    formData.append("date", Currentdate);
    alert(image);
    fetch("http://localhost:3001/blog/addBlog", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("Blog Has Successfully Added!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/dashboardP");
      })
      .catch((error) => {
        toast.error("Unable to Uploaded  Blog,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/addBlogs");

        console.log(error);
      });
  };

  const [posts, setPosts] = useState(allPosts)

  const submitPost = (text) => {
    console.log(text);
    const curDate = new Date()

    setPosts([
      ...posts,
      {
        profileImage:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        name: 'Jane Doe',
        content: text,
        date: curDate
      }
    ])
  }
 
    return(
        <div className='title'>
        <h1>Forum</h1>
        <br></br>
        <div className="title2">
        <DiscussionBoard posts={posts} onSubmit={submitPost}  />
        </div>
        
      </div>
    );
}

 export default Forum;


// import React from "react";
// import { Container, Row, Col } from "shards-react";


// import SidebarActions from "../../components/AddBlog/SidebarActions";
// import SidebarCategories from "../../components/AddBlog/SidebarCategories";
// //import Editor from "../../components/AddBlog/Editor";
// import PageTitle from "../../components/AddBlog/PageTitle";

// const Forum = () => (
//   <Container fluid className="main-content-container px-4 pb-4">
//     {/* Page Header */}
//     <Row noGutters className="page-header py-4">
//       <PageTitle sm="4" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
//     </Row>

//     <Row>
//       {/* Editor */}
//       <Col lg="9" md="12">
//         //<Editor />
//       </Col>

//       {/* Sidebar Widgets */}
//       <Col lg="3" md="12">
//         <SidebarActions />
//         <SidebarCategories />
//       </Col>
//     </Row>
//   </Container>
// );

// export default Forum;

