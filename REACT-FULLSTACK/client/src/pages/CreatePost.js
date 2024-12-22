import React, {useContext,useEffect}  from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";




function CreatePost() {
  const {authState } = useContext(AuthContext);
  const initialValues = {
    title: "",
    postText: "", 
  };

  useEffect(() => {
    if (!authState.status){
      navigate("/login")
    }
  },[]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().min(3).required(),
    
  });
  
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data,
      {headrer: {accessToken: localStorage.getItem("accessToken")}}
    ).then((response) => {
      navigate("/");
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;