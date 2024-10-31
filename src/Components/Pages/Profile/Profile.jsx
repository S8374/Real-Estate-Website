import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showFullBio, setShowFullBio] = useState(false);
    const {
        updatePasswordForUser,
        updateEmailForUser,
        sendVerificationEmail,
        updateUsername,
        user,
        updateProfilePicture,
        deleteUserAccount,
        reauthenticateUser,
        sendPasswordReset
    } = useContext(AuthContext);

    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [profilePictureURL, setProfilePictureURL] = useState('');
    
    const [resetEmail, setResetEmail] = useState('');

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            const result = await updatePasswordForUser(newPassword, currentPassword);
            toast.success(result);
            setNewPassword('');
        } catch (error) {
            toast.error("Failed to update password: " + error.message);
        }
    };
    const handleForgotPassword = async () => {
        try {
            await sendPasswordReset(resetEmail);
            toast.success("Password reset email sent to your provided email address.");
            setResetEmail(''); // Clear input after sending
        } catch (error) {
            toast.error("Failed to send password reset email: " + error.message);
        }
    };

    const handleProfilePictureUpdate = async (e) => {
        e.preventDefault();
        try {
            const result = await updateProfilePicture(profilePictureURL);
            toast.success(result);
            setProfilePictureURL('');
        } catch (error) {
            toast.error("Failed to update profile picture: " + error.message);
        }
    };

    const handleAccountDeletion = async () => {
        const currentPassword = prompt("Please enter your current password to delete the account:");
        if (!currentPassword) {
            toast.error("Account deletion canceled.");
            return;
        }

        try {
            await reauthenticateUser(currentPassword);
            await deleteUserAccount();
            toast.success("User account deleted successfully.");
        } catch (error) {
            toast.error("Failed to delete account: " + error.message);
        }
    };

    const handleEmailUpdate = async (e) => {
        e.preventDefault();
        if (!user.emailVerified) {
            await sendVerificationEmail();
            toast.success("A verification email has been sent to your current email. Please verify it.");
            return;
        }
        try {
            await updateEmailForUser(newEmail); // Removed currentPassword parameter
            toast.success(`Email has been updated to ${newEmail}.`);
            setNewEmail('');
        } catch (error) {
            toast.error("Failed to update email: " + error.message);
        }
    };

    const handleUsernameUpdate = async (e) => {
        e.preventDefault();
        try {
            const result = await updateUsername(newName);
            toast.success(result);
            setNewName('');
        } catch (error) {
            toast.error("Failed to update username: " + error.message);
        }
    };

    const bioText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
    const truncatedBio = `${bioText.substring(0, 100)}...`;

    const toggleBio = () => {
        setShowFullBio(!showFullBio);
    };

    return (
        <div className="container">
            <div className="profile-header">
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
                <div>
                    {
                        user.photoURL ? (
                            <div className="profile-img">
                                <img src={user.photoURL} width="200" alt="Profile" />
                            </div>
                        ) : (
                            <div className="profile-img">
                                <img src={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAJYAlgMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAABAIDAf/aAAgBAQAAAACoAAAAAAAAAAAAADWQAB07Y6S+AAKpSmYABVKVSgAKpSmYABvtLbGAB533metx5gBVwwHbU4ApmAqlANV4A6QgAAAAAAAAAAAAAAAD/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/9oACgICEAMQAAAA9fzYgiJCI72IIiSCO9iJc6RiIO1gztjO3MiO9gzqSacyI72M6lZmocyO1MdEgzq8YO1IiSCIO1iCSIgjvYhIiII//8QAMBAAAgEBBQYFAgcAAAAAAAAAAQIDAAQRFDAxEhMhMlFTECAiUoFBYCMzNEBhkaH/2gAIAQEAAT8A+1BeeABJrdyexv6/YwxGVrtAOJNG0BPTCoA61iZ/fQkSe5JAA30YU6lGKnUZ/JZf5dvJaPUsUnuGfLxstn+fJL+mgGfH+JZ3j+qnaHiAWIUamrUQGVBoi58chjcMKlRGTfJoTcR4AJZlDH1SMOHQUSSSTqc5LPI/G7ZHU1sWZOZy56CpJlKbCRhVv8N/G4Alj0Gorcwv+XLcejU8UkfMvzmIqQxiVxex5RUkryczfHmjndOBO0vQ1NGoCyR8jf5lAXkDqQKtbAy3DRQAMiH1QTr04jKjuEiE+4VLCHctvk41hh346ww76Vhh30rCjvpWGHfSsMO+lYYd9KjRYVlJlQ3p9y//xAAgEQADAAEDBQEAAAAAAAAAAAAAARExIDBREBJAQVBx/9oACAECAQE/APHZXwXYfr96PK2GWmXrbhHyYJreUdyKiob+F//EACkRAAIBAQYDCQAAAAAAAAAAAAECABESEyAhMVEwMmEQIkBBQlBicYH/2gAIAQMBAT8A8OASQBKINWJ+hGWgqDUcBPWfj2LyuOnAQgHPQ5GMpUw9xSPM641W1LSDRa9TGYtrLdeZQYVBBK/oxKCUYDcS7faXb7S7faIjBsxlQ+xf/9k='} width="200" alt="Profile" />
                            </div>
                        )
                    }
                </div>
                <div className="profile-nav-info">
                    <h3 className="user-name">{user.displayName}</h3>
                    <div className="address">
                        <p id="state" className="state">New York,</p>
                        <span id="country" className="country">USA.</span>
                        <span id="country" className="country">
                            {user.emailVerified ? <p className='px-7 bg-green-600 text-white'>Verified</p> : (
                                <div className='justify-center items-center'>
                                    <h1 className='px-7 bg-red-600 py-2 cursor-pointer text-white'>Not Verified</h1>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className="main-bd">
                <div className="left-side">
                    <div className="profile-side">
                        <p className="mobile-no"><i className="fa fa-phone"></i> +23470xxxxx700</p>
                        <p className="user-mail"><i className="fa fa-envelope"></i> {user.email}</p>
                        <div className="user-bio">
                            <h3>Bio</h3>
                            <p className="bio">
                                {showFullBio ? bioText : truncatedBio}
                                <span onClick={toggleBio} id="see-more-bio">
                                    {showFullBio ? "See Less" : "See More"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="right-side">
                    <div className="nav">
                        <ul>
                            <li onClick={() => setActiveTab(0)} className={`user-post ${activeTab === 0 ? 'active' : ''}`}> Password</li>
                            <li onClick={() => setActiveTab(1)} className={`user-review ${activeTab === 1 ? 'active' : ''}`}>Update</li>
                            <li onClick={() => setActiveTab(2)} className={`user-setting ${activeTab === 2 ? 'active' : ''}`}>Advance </li>
                        </ul>
                    </div>
                    <div className="profile-body">
                        {activeTab === 0 && (
                            <form onSubmit={handlePasswordUpdate} className='px-2 py-2'>
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className='mt-1'
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <div className=' mt-1 '>
                                <button type="submit " className='px-7 see'>Update Password</button>
                                </div>
                                <h1 className='text-xl font-bold'>Forget Password :</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                />
                <div className='mt-1'>
                <button onClick={handleForgotPassword} className='px-7 see'>Send Reset Link</button>
                </div>
                            </form>
                                
                            
                        )}
                        {activeTab === 1 && (
                            <form onSubmit={handleEmailUpdate} className='px-2'>
                                <input
                                 className='mt-2'
                                    type="email"
                                    placeholder="Enter Current Email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    required
                                />
                               <div className='mt-2'>
                               <button type="submit" className='px-7 see'>send Varification </button>
                               </div>
                            </form>
                        )}
                        {activeTab === 1 && (
                            <form onSubmit={handleUsernameUpdate} className='px-2'>
                                <input
                                 className='mt-2'
                                    type="text"
                                    placeholder="New Username"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    required
                                />
                               <div className='mt-2'>
                               <button type="submit" className='px-7 see'>Update Username</button>
                               </div>
                            </form>
                        )}
                        {activeTab === 2 && (
                            <form onSubmit={handleProfilePictureUpdate} className='px-2'>
                                <input
                                    className='mt-2'
                                    type="text"
                                    placeholder="Profile Picture URL"
                                    value={profilePictureURL}
                                    onChange={(e) => setProfilePictureURL(e.target.value)}
                                    required
                                />
                              <div className='mt-2'>
                              <button type="submit" className='px-7 see'>Update Profile Picture</button>
                              </div>

                                <div className='mt-7'>

                                    <button
                                        onClick={handleAccountDeletion}
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                                    >
                                        <svg
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="h-5 w-5 mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                stroke-width="2"
                                                stroke-linejoin="round"
                                                stroke-linecap="round"
                                            ></path>
                                        </svg>

                                        Delete Acount
                                    </button>

                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
