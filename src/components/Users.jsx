import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
    const loadedData = useLoaderData();
    const [users, setUsers] = useState(loadedData);

    const deleteUser = (id) => {
        console.log(id);
        fetch(`https://coffeestoreserver.vercel.app/user/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount) {
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Creation time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, idx) => <tr key={user._id}>
                            <th>{idx+1}</th>
                            <td>{user.email}</td>
                            <td>{user.createdAt}</td>
                            <td><button onClick={() => deleteUser(user._id)} className="btn">X</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Users;
