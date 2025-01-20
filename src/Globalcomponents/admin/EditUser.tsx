import React from 'react'

interface User{
  name: string;
  email: string;
}

const EditUser = ({userData}:{userData:User}) => {
  return (
    <div className='text-Text'>
        {userData.name}
        {userData.email}

    </div>
  )
}

export default EditUser