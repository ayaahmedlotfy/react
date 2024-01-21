import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  interface FormData {
    name: string;
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FieldValues) => {
    const response = await axios.post(
      "http://localhost:8000/api/register",
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("register successful:", response.data);
    navigate("/users");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-lable">
          Name
        </label>
        {/* <input ref={nameRef} id="name" type="text" className="form-control" /> */}
        {/* <input onChange={(event)=>setPerson({...person, name:event.target.value})} id="name" type="text" className="form-control" /> */}
        <input
          {...register("name", { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name?.type == "required" && (
          <p className="text-danger">input field required</p>
        )}
        {errors.name?.type == "minLength" && (
          <p className="text-danger">min char is 3</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-lable">
          Email
        </label>
        {/* <input ref={ageRef} id="age" type="number" className="form-control" /> */}
        {/* <input  onChange={(event)=>setPerson({...person, age:event.target.value})}  id="age" type="number" className="form-control" /> */}
        <input
          {...register("email", { required: true })}
          id="age"
          type="email"
          className="form-control"
        />
        {errors.email?.type == "required" && (
          <p className="text-danger">input field required</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-lable">
          Password
        </label>
        {/* <input ref={ageRef} id="age" type="number" className="form-control" /> */}
        {/* <input  onChange={(event)=>setPerson({...person, age:event.target.value})}  id="age" type="number" className="form-control" /> */}
        <input
          {...register("password", { required: true, minLength: 6 })}
          id="password"
          type="password"
          className="form-control"
        />
        {errors.password?.type == "required" && (
          <p className="text-danger">input field required</p>
        )}
        {errors.password?.type == "minLength" && (
          <p className="text-danger">min char is 6</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        submit
      </button>
    </form>
  );
};

export default Register;
