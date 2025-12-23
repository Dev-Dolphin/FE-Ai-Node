import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, reset } from '../../redux/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-5">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {users?.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-200">
            <div className="p-4 flex flex-col flex-grow">
              <div className="text-lg font-semibold mb-2 flex-grow">{user.name}</div>
              <div className="text-lg font-semibold mb-2 flex-grow">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
