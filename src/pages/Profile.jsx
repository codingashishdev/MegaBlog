import { useEffect, useState } from "react";
import { Container, PostCard, Button, Input } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Query } from "appwrite";

function Profile() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: ""
    });
    const [updateLoading, setUpdateLoading] = useState(false);

    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                oldPassword: "",
                newPassword: ""
            });
        }
    }, [userData]);

    useEffect(() => {
        let isMounted = true;

        const fetchUserPosts = async () => {
            setIsLoading(true);
            try {
                const response = await appwriteService.getAllPosts([
                    Query.equal("userId", userData.$id)
                ]);
                if (isMounted && response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Failed to load user posts", error);
                if (isMounted) {
                    setPosts([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (userData) {
            fetchUserPosts();
        }

        return () => {
            isMounted = false;
        };
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);

        try {
            let updatedUser = { ...userData };

            // Update name if changed
            if (formData.name !== userData.name) {
                await authService.updateName(formData.name);
                updatedUser.name = formData.name;
            }

            // Update email if changed
            if (formData.email !== userData.email && formData.oldPassword) {
                await authService.updateEmail(formData.email, formData.oldPassword);
                updatedUser.email = formData.email;
            }

            // Update password if provided
            if (formData.newPassword && formData.oldPassword) {
                await authService.updatePassword(formData.newPassword, formData.oldPassword);
            }

            // Update Redux store
            dispatch(login(updatedUser));

            setIsEditing(false);
            setFormData(prev => ({
                ...prev,
                oldPassword: "",
                newPassword: ""
            }));

        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please check your inputs.");
        } finally {
            setUpdateLoading(false);
        }
    };

    if (!userData) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="text-center">
                        <p>Please log in to view your profile.</p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                            <Button
                                onClick={() => setIsEditing(!isEditing)}
                                variant={isEditing ? "secondary" : "primary"}
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </Button>
                        </div>

                        {!isEditing ? (
                            // Display Mode
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <p className="mt-1 text-lg text-gray-900">{userData.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="mt-1 text-lg text-gray-900">{userData.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Account Created</label>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {new Date(userData.$createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // Edit Mode
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div>
                                    <Input
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="Current Password (required for email/password changes)"
                                        name="oldPassword"
                                        type="password"
                                        value={formData.oldPassword}
                                        onChange={handleInputChange}
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="New Password (optional)"
                                        name="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        disabled={updateLoading}
                                        variant="primary"
                                    >
                                        {updateLoading ? "Updating..." : "Update Profile"}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* User's Posts */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posts</h2>

                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
                                <Button onClick={() => window.location.href = "/add-post"}>
                                    Create Your First Post
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map((post) => (
                                    <PostCard key={post.$id} {...post} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Profile;