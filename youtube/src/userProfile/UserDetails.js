import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDetails({ userDisplayName, userImagePath, currentUser, userID, logout }) {
    const correctedUserImagePath = userImagePath.startsWith('\\') ? userImagePath : '\\' + userImagePath;
    const [imageSrc, setImageSrc] = useState(userImagePath);
    const [isEditing, setIsEditing] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState(userDisplayName);
    const navigate = useNavigate();

    useEffect(() => {
        const img = new Image();
        img.src = correctedUserImagePath;
        img.onload = () => {
            setImageSrc(correctedUserImagePath);
        };
        img.onerror = () => {
            setImageSrc('/uploads/photos/default-user.png');
        };
    }, [correctedUserImagePath]);

    const handleEditClick = () => {
        if ((currentUser?._id ?? null) !== userID) {
            alert("You are not authorized to edit this user's details.");
            return;
        }
        setIsEditing(true);
    };

    const handleDisplayNameChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const handleUpdateDisplayName = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ display_name: newDisplayName })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                alert('Display name updated successfully');
                setIsEditing(false);
                setNewDisplayName(updatedUser.display_name);
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Failed to update display name: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error updating display name:', error);
            alert('An error occurred while updating the display name.');
        }
    };

    const handleDeleteUser = async () => {
        if ((currentUser?._id ?? null) !== userID) {
            alert("You are not authorized to delete this user.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/api/users/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('User deleted successfully');
                // Log out user
                logout();
                // Redirect to the home page
                navigate('/');
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="col-lg-2 col-md-2 col-sm-1">
            <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <img
                        src={imageSrc}
                        alt="User Profile"
                        className="rounded-circle"
                        style={{ width: '80px', height: '80px', marginLeft: '10px', marginBottom: '10px' }}
                    />
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={newDisplayName}
                                onChange={handleDisplayNameChange}
                                className="form-control"
                                placeholder="Edit your display name"
                                aria-label="Edit your display name"
                                aria-describedby="button-addon2"
                                style={{ marginBottom: '10px' }}
                            />
                            <button type="button" className="btn btn-primary mb-2"  onClick={handleUpdateDisplayName}>Save</button>
                            <button type="button" className="btn btn-secondary mb-2"  onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <h5>{userDisplayName}</h5>
                            {(currentUser?._id ?? null) === userID && (
                                <>
                                    <button type="button" className="btn btn-primary mb-2"  onClick={handleEditClick}>Edit Details</button>
                                    <button type="button" className="btn btn-danger mb-2"  onClick={handleDeleteUser}>Delete User</button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;