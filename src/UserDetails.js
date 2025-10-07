import useFetch from "./useFetch";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

const UserDetails = () => {
    const { id } = useParams();
    const {
        data: fetchedUser,
        error,
        isPending,
    } = useFetch("http://localhost:5000/users/" + id);

    // Local state to manage user data
    const [user, setUser] = useState(null);

    // Update local state when data is fetched
    useEffect(() => {
        if (fetchedUser) {
            setUser(fetchedUser);
        }
    }, [fetchedUser]);

    const handleClick = async (indexToDelete) => {
        if (!user || !user.pics) return;

        // Step 1: remove the clicked pic locally
        const updatedPics = user.pics.filter(
            (_, index) => index !== indexToDelete
        );

        try {
            // Step 2: send a PATCH request to JSON Server
            const res = await fetch(`http://localhost:5000/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pics: updatedPics }),
            });

            if (!res.ok) throw new Error("Failed to update");

            // Step 3: update the React state to refresh UI
            setUser((prev) => ({ ...prev, pics: updatedPics }));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="user-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {user && (
                <article>
                    <h2>{user.username}</h2>
                    <div className="pictures">
                        {user.pics &&
                            user.pics.map((pic, index) => (
                                <div key={index} className="image-container">
                                    <img
                                        src={pic}
                                        alt={`${user.username} motorcycle ${
                                            index + 1
                                        }`}
                                        className="motorcycle-image"
                                    />
                                    <button
                                        className="image-button"
                                        onClick={() => handleClick(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                    </div>
                </article>
            )}
        </div>
    );
};

export default UserDetails;
