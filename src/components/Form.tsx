import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Form = () => {
  // const nameRef=useRef<HTMLInputElement>(null);
  // const ageRef=useRef<HTMLInputElement>(null);
  // const [person,setPerson]=useState({name:"",age:""});
  const navigate = useNavigate();

  interface FormData {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  // const handleSubmit=(event:FormEvent)=>{
  //   event.preventDefault();
  // if(nameRef.current)
  // person.name=nameRef.current.value
  // if(ageRef.current)
  // person.age=parseInt(ageRef.current.value)
  //   console.log(person)
  // }
  const onSubmit = async (data: FieldValues) => {
    console.log(data.email);
    const response = await axios.post(
      "http://localhost:8000/api/login",
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login successful");
    // Store the token in localStorage
    localStorage.setItem("token", await response.data.message.token);
    navigate("/users");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Link to={`/register`} style={{ textDecoration: "none" }}>
        {" "}
        register
      </Link>
      <button className="btn btn-primary" type="submit">
        submit
      </button>
    </form>
  );
};

export default Form;
