import { Button } from "@/components/ui/button";
// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

// import Navbar from "@/components/Navbar";

import './styles.css';
// import '../globals.css';

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
          <div className="login_container">
              <form id="project-form">
                <h2>Log In</h2>
                <p>Input your credentials to get started.</p>

                <div className="form-group">
                  <label htmlFor="project-name">Email</label>
                  <input type="text" id="project-name" name="project-name" placeholder="Email"/>
                </div>

                <div className="form-group">
                  <label htmlFor="framework">Password</label>
                  <input type="password" placeholder="Password"/>
                </div>

                <div>
                        <p>{`Don't have an account? `}
                            <Link href="/register" className="text-emphasis">
                                Register
                            </Link>
                        </p>
                    </div>

                <div className="button-group">
                  <Link href="/">
                    <Button>Log In</Button>
                  </Link>
                </div>
              </form>
          </div>
        </>
    );
}