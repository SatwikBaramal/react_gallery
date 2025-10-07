import { Link } from 'react-router-dom';

const UserList = ({ users, title }) => {
    return ( 
        <div className="user-list">
            <h2>{ title }</h2>
            {users.map((user) => (
                <div className="user-preview" key ={user.id}>
                    <Link to={`/userdetails/${user.id}`}>
                        <h2>{user.username}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default UserList;