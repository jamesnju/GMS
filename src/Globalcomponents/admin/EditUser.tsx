import React from 'react'

const EditUser = ({userData}:{userData:any}) => {
  return (
    <div className='text-Text'>
        {userData.name}
        {userData.email}

    </div>
  )
}

export default EditUser