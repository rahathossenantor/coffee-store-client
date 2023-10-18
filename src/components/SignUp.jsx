import { FaGoogle, FaGithub, FaEyeSlash, FaEye } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
    const [isShow, setIsShow] = useState(false);
    const [errorStatus, setRrrorStatus] = useState("");
    const { registerUserWithEmailAndPass, signInUserWithGoogle, signInUserWithGitHub } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleEmailPassRegister = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const avater = event.target.photoURL.value;
        const email = event.target.email.value;
        const pass = event.target.password.value;
        // const terms = event.target.terms.checked;

        // reset error status
        setRrrorStatus("");

        if (pass.length < 6) {
            setRrrorStatus("Password must be at least 6 characters!");
            return;
        }
        else if (!/[A-Z]/.test(pass)) {
            setRrrorStatus("Password must have at least one upper case character!");
            return;
        }
        else if (!/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(pass)) {
            setRrrorStatus("Password must have at least one special character!");
            return;
        }
        // else if (!terms) {
        //     setRrrorStatus("Please accept our terms & conditions!");
        //     return;
        // }

        // create new user account with email and password
        registerUserWithEmailAndPass(email, pass)
            .then(res => {
                updateProfile(res.user, {
                    displayName: name,
                    photoURL: avater
                })
                    .then(() => {})
                    .catch((error) => {
                        setRrrorStatus(error.message);
                    });
                const user = res.user;
                const userData = {
                    email: user.email,
                    createdAt: user.metadata.creationTime
                };

                fetch("https://coffeestoreserver.vercel.app/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })
                .then(res => res.json())
                .then(data => console.log(data));

                event.target.reset();
                Swal.fire({
                    title: "Success!",
                    text: "Registration successful!",
                    icon: "success",
                    confirmButtonText: "Close"
                });
                // navigate("/");
            })
            .catch(err => setRrrorStatus(err.message));
    };

    // create new user with google
    const handleGoogleRegister = () => {
        signInUserWithGoogle()
            .then(res => {
                Swal.fire({
                    title: "Success!",
                    text: "Registration successful!",
                    icon: "success",
                    confirmButtonText: "Close"
                });
                console.log(res);
                navigate("/");
            })
            .catch(err => setRrrorStatus(err.message));
    };

    // create new user with github
    const handleGitHubRegister = () => {
        signInUserWithGitHub()
            .then(res => {
                Swal.fire({
                    title: "Success!",
                    text: "Registration successful!",
                    icon: "success",
                    confirmButtonText: "Close"
                });
                console.log(res);
                navigate("/");
            })
            .catch(err => setRrrorStatus(err.message));
    };

    return (
        <div className="md:container md:mx-auto 2xl:px-0 xl:px-0 lg:px-5 md:px-5 px-5 w-full flex flex-col items-center justify-center font-inter py-14">
            <div className="text-center mb-5">
                <h2 className="text-4xl font-medium font-inter">Sign Up now!</h2>
            </div>
            <div data-aos="fade-in" className="bg-base-100 2xl:w-96 xl:w-96 lg:w-[380px] md:w-[380px] w-[340px] shadow-2xl rounded-xl border">
                <form onSubmit={handleEmailPassRegister} className="p-6">
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="text-lg">Full name <span className="text-red-500">*</span></span>
                        </label>
                        <input type="text" placeholder="Full name" name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label pb-1">
                            <span className="text-lg">Photo URL</span>
                        </label>
                        <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label pb-1">
                            <span className="text-lg">Email <span className="text-red-500">*</span></span>
                        </label>
                        <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label pb-1">
                            <span className="text-lg">Password <span className="text-red-500">*</span></span>
                        </label>
                        <div className="relative form-control">
                            <input required type={isShow ? "text" : "password"} name="password" placeholder="Password" className="input input-bordered" />
                            <span onClick={() => setIsShow(!isShow)} className="absolute h-full flex items-center top-0 right-3 cursor-pointer">{isShow ? <FaEyeSlash className="text-xl"></FaEyeSlash> : <FaEye className="text-xl"></FaEye>}</span>
                        </div>
                        <div className="mt-3">
                            <input type="checkbox" className="cursor-pointer" name="terms" id="terms" />
                            <label className="ml-2 cursor-pointer" htmlFor="terms">Accept our terms & conditions</label>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn px-7 py-[8px]">Sign Up</button>
                    </div>
                    <p className="my-3">Already have an acount? <Link className="text-blue-700 underline font-medium" to="/login">Login</Link></p>
                    <div className="text-center">
                        <p className="text-xl mb-2">-------------or-------------</p>
                        <div className="flex items-center justify-center gap-5">
                            <a onClick={handleGoogleRegister} className="text-4xl cursor-pointer"><FaGoogle></FaGoogle></a>
                            <a onClick={handleGitHubRegister} className="text-4xl cursor-pointer"><FaGithub></FaGithub></a>
                        </div>
                    </div>
                </form>
            </div>
            {errorStatus && <div>
                <p className="text-red-500 text-lg font-medium">{errorStatus}</p>
            </div>}
        </div>
    );
};

export default SignUp;
