import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.js";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useForm } from "react-hook-form";

function Signup() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        setIsLoading(true);
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center w-full p-4 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-8 px-8 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="1" fill="white" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#dots)" />
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="mb-3 flex justify-center">
                                <span className="inline-block w-full max-w-[100px]">
                                    <Logo width="100%" />
                                </span>
                            </div>
                            <h2 className="text-center text-3xl font-bold text-white">
                                Create an Account
                            </h2>
                            <p className="mt-2 text-center text-base text-white/90">
                                Join our community and start sharing your stories
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        {error && (
                            <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-slide-in">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit(create)} className="space-y-5">
                            <div>
                                <Input
                                    label="Full Name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    error={errors.name?.message}
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }
                                    })}
                                />
                            </div>
                            
                            <div>
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="Enter your email"
                                    error={errors.email?.message}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                />
                            </div>
                            
                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Create a strong password (min. 8 characters)"
                                    error={errors.password?.message}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                />
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full mt-2"
                                variant="gradient"
                                size="lg"
                                isLoading={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                        
                        <div className="mt-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">or</span>
                            </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
