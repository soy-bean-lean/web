import React from "react";
import course from "./course";
import Navbar from "../../components/Navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style/Ongoingtabs.css";


function Ongoinf() {
  return (
    
    <div style={{ margin: "20px" }}>
    <course/>
      <Tabs>
        <TabList>
          <Tab>Courses</Tab>
          <Tab>Workshops</Tab>
          <Tab>Blogs</Tab>
        </TabList>

        <TabPanel>
        <div>

       </div>

        </TabPanel>
        <TabPanel>
          
        </TabPanel>
        <TabPanel>
          
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Ongoinf;
