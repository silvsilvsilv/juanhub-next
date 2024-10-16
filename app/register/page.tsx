// import { Button } from "@/components/ui/button";
import Link from "next/link";

import '../login/styles.css';
import '../login/main.css';
import '../login/util.css';

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
                
                <div className="login100-more" style={styling}>
                </div>

                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-43">
                    Create an account
                  </span>
                  
                  <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input className="input100 has-val" type="text" name="name"/>
                    <span className="focus-input100"></span>
                    <span className="label-input100 has-val">Name</span>
                  </div>

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

                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <input className="input100 has-val" type="password" name="confirmPass"/>
                    <span className="focus-input100"></span>
                    <span className="label-input100">Confirm Password</span>
                  </div>

                  <div className="flex-sb-m w-full p-t-3 p-b-32">

                    <div>
                      <p className="txt1">
                        Already have an account? <a className="txt1 text-bold" href="/login">Log In</a>
                      </p>
                    </div>
                  </div>
              

                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                      <Link href="/" className="text-white" >Register</Link>
                    </button>
                  </div>
                  
                </form>

                
              </div>
            </div>
          </div>
        </>
    );
}