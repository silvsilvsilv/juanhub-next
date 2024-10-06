import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

import Navbar from "@/components/Navbar";

import './index.css';

// <div className="flex flex-col sm:flex-row">
            // <div className="w-full sm:w-1/2">
            // a
            //     </div>
            // <div className="w-full sm:w-1/2">
            // b
            //     </div>
            // </div>   

export default function Dashboard(){

    return(
        <>  

            {/* <Card className="w-[350px] items-center justify-center">
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <CardDescription>Log In pls</CardDescription>
                </CardHeader>

                <CardContent>
                    CARD CONTENT
                </CardContent>
            </Card> */}
            <form id="project-form">
  <h2>Create Project</h2>
  <p>Deploy your new project in one-click.</p>
  <div className="form-group">
    <label htmlFor="project-name">Name</label>
    <input type="text" id="project-name" name="project-name" placeholder="Name of your project"/>
  </div>
  <div className="form-group">
    <label htmlFor="framework">Framework</label>
    <select id="framework" name="framework">
      <option value="">Select</option>
      </select>
  </div>
  <div className="button-group">
    <button type="button" className="cancel-button">Cancel</button>
    <button type="submit" className="deploy-button">Deploy</button>
  </div>
</form>
        </>
    );
}