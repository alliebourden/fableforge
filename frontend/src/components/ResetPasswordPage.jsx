import React from 'react';
import { useParams } from 'react-router-dom';
import ResetPassword from './ResetPassword';

function ResetPasswordPage() {
  const { token } = useParams();

  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
}

export default ResetPasswordPage;
