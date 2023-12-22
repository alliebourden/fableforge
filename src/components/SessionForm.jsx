import { useForm } from 'react-hook-form';

const SessionForm = ({ onAddSession }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onAddSession(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="session-form">
      <div className="form-section">
        <label htmlFor="header">Session Title</label>
        <input type="text" id="header" {...register('header', { required: true })} />
      </div>
      <div className="form-section">
        <label htmlFor="body">Body:</label>
        <textarea id="body" {...register('body', { required: true })} />
      </div>
      <div className="form-section">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" {...register('date', { required: true })} />
      </div>
      <div className="form-section">
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
};

export default SessionForm;