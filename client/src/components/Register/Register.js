import React, { useContext } from 'react';
import Log from '../Log';
import { UidContext } from '../AppContext';
import Profile from '../Profile/Profile';

export default function Register() {
  const uid = useContext(UidContext)
  return (
    <div className="profil-page">
    {uid ? (
      <Profile />
    ) : (
          <Log />
    )}
    </div>
  )
}
