import React from 'react';
import { useParams } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';

function ResetPasswordPage() {
  const { token } = useParams();

  return (
    <div className='reset-password-container'>
      <ResetPassword token={token} />
    </div>
  );
}

export default ResetPasswordPage;
