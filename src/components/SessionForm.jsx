import { useForm } from 'react-hook-form';

const SessionForm = ({ onAddSession }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onAddSession(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="header">Session Title</label>
      <input type="text" id="header" {...register('header', { required: true })} />

      <label htmlFor="body">Body:</label>
      <textarea id="body" {...register('body', { required: true })} />

      <label htmlFor="date">Date:</label>
      <input type="date" id="date" {...register('date', { required: true })} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SessionForm;