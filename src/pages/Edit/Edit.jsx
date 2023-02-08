import "./Edit.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    // Navigation
    const navigate = useNavigate();
    // Useprams
    const {id} = useParams();

    // Manage post from database
    const [input, setInput] = useState({
        message : '',
        tag : '',
        post_photo : '',
        post_video : ''
    });

    useEffect(() => {
        axios
          .get(`http://localhost:5050/posts/${id}`)
          .then((res) => {
                setInput({
                    message : res.data.message,
                    tag : res.data.tag,
                    post_photo : res.data.post_photo,
                    post_video : res.data.post_video
                })
            })
          .catch((err) => {
                console.log(err);
            });
    }, [id]);

  // Manage form on change
  const hendleOnChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // Manage form on submit
  const hendleOnSubmit = (e) => {
    e.preventDefault();
    if (input.message === "") {
      Swal.fire("Opps!", "Message fields are required!", "error");
    } else {
      axios
        .patch(`http://localhost:5050/posts/${id}`, {
          ...input,
          slug: input.message.toLowerCase().replace(/ +/g, "-"),
        })
        .then((res) => {
          setInput((prevState) => ({
            ...prevState,
            message: "",
            slug: "",
            tag: "",
            post_photo: "",
            post_video: "",
          }));
        });
        navigate('/')
      Swal.fire("Good Job!", "Data add successfully!", "success");
    }
  };
  //   GO back home page...
  const hendleGoBack = () => {
    navigate("/");
  };
    
  return (
    <>
      <div className="modal">
        <div className="modal_wrapper">
          <button onClick={hendleGoBack} className="close_btn">
            <AiOutlineClose />
          </button>
          <div className="modal_content">
            <div className="modal_header">
              <h3>Update Your Info..</h3>
            </div>
            <div className="modal_body">
              <div className="add_new_post_form">
                <form action="" onSubmit={hendleOnSubmit}>
                  <div className="div">
                    <label htmlFor="">What's on your mind?</label>
                    <textarea
                      value={input.message}
                      onChange={hendleOnChange}
                      name="message"
                      placeholder="What's on your mind?"
                      id=""
                      cols="30"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="div">
                    <label htmlFor="">Post tags (Optional)</label>
                    <input
                      type="text"
                      value={input.tag}
                      onChange={hendleOnChange}
                      name="tag"
                      id=""
                      placeholder="Tags"
                    />
                  </div>
                  <div className="div">
                    <label htmlFor="">Image (It should be an URL)</label>
                    <input
                      type="text"
                      value={input.post_photo}
                      onChange={hendleOnChange}
                      name="post_photo"
                      id=""
                      placeholder="Image url"
                    />
                  </div>
                  <div className="div">
                    <label htmlFor="">Video (It should be an URL)</label>
                    <input
                      type="text"
                      value={input.post_video}
                      onChange={hendleOnChange}
                      name="post_video"
                      id=""
                      placeholder="Video url"
                    />
                  </div>
                  <div className="div">
                    <button className="submit" type="submit">
                      Update Info
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
