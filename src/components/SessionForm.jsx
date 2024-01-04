import { useForm } from "react-hook-form";

const SessionForm = ({ onAddSession }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onAddSession(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="session-form">
      <div className="add-new-session">
        <p>Add New Session</p>
      </div>
      <div className="top-section">
        <div className="session-title">
          <label htmlFor="header">Session Title</label>
          <input
            type="text"
            id="header"
            {...register("header", { required: true })}
          />
        </div>
        <div className="session-date">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
          />
        </div>
      </div>
      <div className="session-body">
        <label htmlFor="body">Session details</label>
        <textarea id="body" {...register("body", { required: true })} />
      </div>
      <div className="sumbit-btn">
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
};

export default SessionForm;
