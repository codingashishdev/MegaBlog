import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice";
import { Button, Input, Logo} from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const login = async (data) => {
        setError("");
        setIsLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData));
                navigate("/");
            }
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center w-full p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-8">
                        <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[100px]">
                                <Logo width="100%" />
                            </span>
                        </div>
                        <h2 className="text-center text-2xl font-bold text-white">
                            Welcome Back!
                        </h2>
                        <p className="mt-2 text-center text-base text-white/80">
                            Sign in to access your account
                        </p>
                    </div>
                    
                    <div className="p-8">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit(login)} className="space-y-6">
                            <div>
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Please enter a valid email"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                                <div className="mt-1 text-right">
                                    <Link to="#" className="text-sm text-blue-600 hover:text-blue-800">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full"
                                variant="default"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Sign in
                            </Button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
