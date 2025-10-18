import { useState } from "react";
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
        <div className="min-h-[80vh] flex items-center justify-center w-full p-4 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-8 px-8 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="login-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="1" fill="white" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#login-dots)" />
                            </svg>
                        </div>
                        <div className="relative">
                            <div className="mb-3 flex justify-center">
                                <span className="inline-block w-full max-w-[100px]">
                                    <Logo width="100%" />
                                </span>
                            </div>
                            <h2 className="text-center text-3xl font-bold text-white">
                                Welcome Back!
                            </h2>
                            <p className="mt-2 text-center text-base text-white/90">
                                Sign in to access your account
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
                        
                        <form onSubmit={handleSubmit(login)} className="space-y-6">
                            <div>
                                <Input
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    type="email"
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
                                    placeholder="Enter your password"
                                    error={errors.password?.message}
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                />
                                <div className="mt-2 text-right">
                                    <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full"
                                variant="gradient"
                                size="lg"
                                isLoading={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
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
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
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
