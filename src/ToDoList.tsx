import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm();
  const handleValid = (data: any) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "required!",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
