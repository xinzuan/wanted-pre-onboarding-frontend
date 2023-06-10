import { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthService from "../services/auth.service";


type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const submitData = (data: any) => {
    let params = {
      email: data.email,
      password: data.password,
    };

    AuthService.register(

        params.email,
        params.password
      ).then(
          
        () => {
            
            history.push("/todo");
            window.location.reload();
          },
        error => {
            toast.error(error.response.data, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: 0,
                toastId: "my_toast",
              });
        }
      );
    
  };
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Sign Up Form
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >

                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      data-testid="email-input"
                      {...register("email", { 
                          required: "Email is required!",
                          validate: (value) => {
                            // regex /^[A-Z0-9._%+-]+@[A-Z0-9.-]$/i,
                            if (!value.includes("@")) {
                              return "Email should contain @!";
                            }
                            return true;
                          },
                         })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        Email should contain @ !
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      data-testid="password-input"
                      {...register("password", {
                        required: "Password is required!",
                        validate: (value) => {
                          if (value.length < 8) {
                            return false;
                          }
                          return true;
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        Password should be at least 8 characters long!
                      </p>
                    )}
                  </div>

                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                      data-testid="signup-button"
                      disabled={!isValid}
                    >
                      회원가입
                    </button>
                    <p className="card-text">
                      Already have an account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/signin"}>
                        Log In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default SignUp;