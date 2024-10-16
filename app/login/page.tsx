// import { Button } from "@/components/ui/button";
// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

// import Navbar from "@/components/Navbar";

// import './styles.css';
import './main.css';
import './util.css';
// import '../globals.css';

import bgPic from '../public/reshot-illustration-website-design-ZK3N2W7CDX.png';

export default function Dashboard(){

    const styling = {
      backgroundImage: `url(${bgPic.src})`,

    };

    return(
        <>  
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-43">
                    Login to continue
                  </span>
                  
                  
                  <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input className="input100 has-val" type="text" name="email"/>
                    <span className="focus-input100"></span>
                    <span className="label-input100 has-val">Email</span>
                  </div>
                  
                  
                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100 has-val" type="password" name="pass"/>
                    <span className="focus-input100"></span>
                    <span className="label-input100">Password</span>
                  </div>

                  <div className="flex-sb-m w-full p-t-3 p-b-32">

                    <div>
                      <p className="txt1">
                        New to Juan Hub? <a className="txt1 text-bold" href="/register">Register</a>
                      </p>
                    </div>
                  </div>
              

                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                      <Link href="/" className="text-white" >Login</Link>
                    </button>
                  </div>
                  
                </form>

                <div className="login100-more" style={styling}>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}