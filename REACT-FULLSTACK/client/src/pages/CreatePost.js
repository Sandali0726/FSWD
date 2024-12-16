import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function CreatePost() {
  return (
    <div className="App"> {/* Reusing .App class for layout */}
      <div className="post"> {/* Reusing .post for styling */}
        <Formik>
          <Form className="formContainer"> {/* Form container */}
            <div className="title"> {/* Reusing title class */}
              Create a Post
            </div>

            <div className="body"> {/* Reusing body class */}
              <label htmlFor="title">Title:</label>
              <Field
                id="inputCreatePost"
                name="title"
                placeholder="(Ex. Title...)"
              />

              <label htmlFor="postText">Post:</label>
              <Field
                id="inputCreatePost"
                name="postText"
                placeholder="(Ex. Post...)"
              />

              <label htmlFor="username">Username:</label>
              <Field
                id="inputCreatePost"
                name="username"
                placeholder="(Ex. John...)"
              />
            </div>

            <div className="footer"> {/* Reusing footer class */}
              <button type="submit">Create Post</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreatePost;
