import { Button } from "@/components/ui/button";
import Link from "next/link";

import '../login/styles.css';


export default function Dashboard(){

    return(
        <>  
          <div className="login_container">
                <form id="project-form">
                    <h2>Register</h2>
                    <p>Input your information to join us at Juan Hub.</p>

                    <div className="form-group">
                        <label htmlFor="project-name">Name</label>
                        <input type="text" id="project-name" name="project-name" placeholder="Name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="project-name">Email</label>
                        <input type="text" id="project-name" name="project-name" placeholder="Email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="framework">Password</label>
                        <input type="password" placeholder="Password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="framework">Confirm Password</label>
                        <input type="password" placeholder="Password"/>
                    </div>    
                    
                    <div>
                        <p>{`Already have an account? `}
                            <Link href="/login" className="text-emphasis">
                                Log In
                            </Link>
                        </p>
                    </div>

                    <div className="button-group">
                        <Link href="/">
                        <Button>Register</Button>
                        </Link>
                    </div>
                </form>
          </div>
        </>
    );
}