import UserDetails from "./UserDetails";
import VideoList from '../videoList/VideoList';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile({currentUser, logout}) {

    const { userId } = useParams(); // Get the userId from the route parameters
    const [userVideoList, setUserVideoList] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const [imagePath, setImagePath] = useState('');


    const fetchUserVideos = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}/videos`);
            const data = await response.json();
            setUserVideoList(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const fetchUserDetails = async () => {
        try {
            const displayNameResponse = await fetch(`http://localhost:8080/api/users/${userId}/getDisplayName`);
            const displayNameData = await displayNameResponse.json();
            console.log('Display Name Data:', displayNameData); // Debugging
            setDisplayName(displayNameData.display_name);

            const profilePictureResponse = await fetch(`http://localhost:8080/api/users/${userId}/getImagePath`);
            const profilePictureData = await profilePictureResponse.json();
            setImagePath(profilePictureData.image);
            console.log('Profile Picture Data:', profilePictureData.image) // Debugging

        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchUserVideos();
        fetchUserDetails();
    }, [userId]); // Add userId to the dependency array

    return (
        <div className="main-content">
            <div className="container-fluid">
                <div className="row">
                    <UserDetails userDisplayName={displayName} userImagePath={imagePath} currentUser={currentUser} userID={userId} logout={logout}/>
                    <VideoList videos={userVideoList} />
                </div>
            </div>
        </div>

    );
}

export default UserProfile;
