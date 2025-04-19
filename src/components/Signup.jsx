import React, { useState } from "react";
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
        <div className="min-h-[80vh] flex items-center justify-center w-full p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-6 px-8">
                        <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[100px]">
                                <Logo width="100%" />
                            </span>
                        </div>
                        <h2 className="text-center text-2xl font-bold text-white">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-center text-base text-white/80">
                            Join our community and start sharing
                        </p>
                    </div>
                    
                    <div className="p-8">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit(create)} className="space-y-5">
                            <div>
                                <Input
                                    label="Name"
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name", {
                                        required: "Name is required"
                                    })}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
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
                                    placeholder="Create a strong password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full mt-2"
                                variant="default"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Create Account
                            </Button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:text-blue-800"
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
