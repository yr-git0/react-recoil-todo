import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector } from "recoil";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To Do should be longer");
//     }
//     console.log("submit");
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

interface IForm {
  toDo: string;
  id: string;
  email: string;
  password: string;
  password1: string;
  extraError: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "server Offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("toDo", {
            required: "toDo is required",
            minLength: { value: 10, message: "Your toDo is too short." },
          })}
          placeholder="Write a to do"
        />
        <span>{errors?.toDo?.message}</span>
        <input
          {...register("id", {
            required: true,
            validate: {
              chkValid1: /*async도 가능*/ (value) =>
                value === "nico" ? "no nico allowed" : true,
              chkValid2: (value) =>
                value === "nico222" ? "no nico222 allowed" : true,
            },
          })}
          placeholder="Write a id"
        />
        <span>{errors?.id?.message}</span>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Write a email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("password", {
            required: "password is required",
            minLength: { value: 5, message: "Your password is too short." },
          })}
          placeholder="Write a password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "password1 is required",
            minLength: { value: 5, message: "Your password1 is too short." },
          })}
          placeholder="Write a password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
