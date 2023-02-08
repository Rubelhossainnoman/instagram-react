import { Link } from "react-router-dom"
import "./Home.scss"
import logo_svg from "./svg/logo.svg"
import home_svg from "./svg/home.svg"
import search_svg from "./svg/search.svg"
import explore_svg from "./svg/explore.svg"
import reels_svg from "./svg/reels.svg"
import messages_svg from "./svg/messenger.svg"
import notification_svg from "./svg/heart.svg"
import create_svg from "./svg/create.svg"
import profile_svg from "./img/Rubel Hossain.jpg"
import more_svg from "./svg/bar.svg"
import three_dot from "./svg/three-dot-black.svg"
import heart from "./svg/heart.svg"
import message from "./svg/message-black.svg"
import share from "./svg/share-black.svg"
import save_post_svg_black from "./svg/save-black.svg"
import save_post_svg_op from "./svg/save-op.svg"
import Modal from "../../components/Modal/Modal"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { BsArrowRight ,BsArrowLeft} from "react-icons/bs";


const Home = () => {
    // add new post modal instance
    const [modal,setModal] = useState({
        status : false,
    })

    // Manage delete actions
    const hendleOnDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`http://localhost:5050/posts/${id}`).then(res=>{
                        setPosts(Posts.filter(data => data.id !== id))
                    })
                } catch (error) {
                    console.log(error.message);
                }
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    // For sidebar
    const [sidebar, setSidebar] =useState('')
    const hendleOnWidthDecrease = () =>{
        setSidebar(`thin`)
    }
    const hendleOnWidthIncrease = () =>{
        setSidebar(``)
    }

    // Show all post here..
    const [Posts,setPosts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5050/posts?_sort=id&_order=desc').then(res=>{
            setPosts(res.data)
        })
    },[modal,sidebar])


  return (
    <>
        <div className="instagram-copy section">
            <div className={`sidebar ${sidebar}`}>
                <div className="sidebar_content">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo_svg} alt="" />
                        </Link>
                        <div onClick={hendleOnWidthDecrease} className="arrow_left"><BsArrowLeft/></div>
                        <div onClick={hendleOnWidthIncrease} className="arrow_right"><BsArrowRight/></div>
                    </div>
                    <div className="sidebar_menu">
                        <ul>
                            <li className="active"><Link to="/"><span><img src={home_svg} alt="" /></span> <span>Home</span></Link></li>
                            <li><Link to="/"><span><img src={search_svg} alt="" /></span> <span>Search</span></Link></li>
                            <li><Link to="/"><span><img src={explore_svg} alt="" /></span> <span>Explore</span></Link></li>
                            <li><Link to="/"><span><img src={reels_svg} alt="" /></span> <span>Reels</span></Link></li>
                            <li><Link to="/"><span><img src={messages_svg} alt="" /></span> <span>Messages</span></Link></li>
                            <li><Link to="/"><span><img src={notification_svg} alt="" /></span> <span>Notifications</span></Link></li>
                            <li onClick={()=> setModal((prevState)=>({...prevState, status : true}))}><Link to="/"><span><img src={create_svg} alt="" /></span> <span>Create</span></Link></li>
                            <li><Link to="/"><span><img src={profile_svg} className="profile" alt="" /></span> <span>Profile</span></Link></li>
                            <li className="bar"><Link to="/"><span><img src={more_svg} alt="" /></span> <span>More</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`main_content ${sidebar}`}>
                <div className="content_info">
                    <div className="posts">
                        <div className="story">
                            <ul>
                                <li>
                                    <Link to="/">
                                        <div className="story_img">
                                            <img src={profile_svg} alt="" />
                                        </div>
                                        <div className="story_title">
                                            <p>Rubel Hossain</p>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <div className="story_img">
                                            <img src={profile_svg} alt="" />
                                        </div>
                                        <div className="story_title">
                                            <p>Rubel Hossain</p>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <div className="story_img">
                                            <img src={profile_svg} alt="" />
                                        </div>
                                        <div className="story_title">
                                            <p>Rubel Hossain</p>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {Posts.map((item,index)=>(
                            <div className="post" key={index}>
                                <div className="post_header">
                                    <div className="post_header_info">
                                        <img src={profile_svg} alt="" />
                                        <div className="user_info">
                                            <div className="user_id">
                                                <Link className="user_name" to="/">devsrubel.me</Link>
                                                <p className="post-time">1 d</p>
                                                <Link className="follow_btn" to="/">Follow</Link>
                                            </div>
                                            <div className="user_categories">
                                                <p>Degital creator</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post_action">
                                        <input type="checkbox" name="" id="" />
                                        <button><img src={three_dot} alt="" /></button>
                                        <div className="action_menu">
                                            <ul>
                                                <li><Link to={`/edit/${item.id}`}>Edit</Link></li>
                                                <li onClick={()=>hendleOnDelete(item.id)}>Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="post_body">
                                    <div className="post_info">
                                        {item.message && <p>{item.message}</p>}
                                        {item.post_photo && <img src={item.post_photo} alt="" />}
                                        {item.post_video && <iframe width="100%" height="450" src={`${item.post_video}`} title="all_video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
                                    </div>
                                </div>
                                <div className="post_footer">
                                    <div className="footer_action">
                                        <div className="left_action">
                                            <ul>
                                                <li><img src={heart} alt="" /></li>
                                                <li><img src={message} alt="" /></li>
                                                <li><img src={share} alt="" /></li>
                                            </ul>
                                        </div>
                                        <div className="right_action">
                                            <ul>
                                                <input type="checkbox" name="" id="" />
                                                <li><img className="save_black" src={save_post_svg_black} alt="" /><img className="save_op" src={save_post_svg_op} alt="" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="post_like">
                                        <Link to="/">20,547 likes</Link>
                                    </div>
                                    <div className="post_tags">
                                        {item.tag && <p>{item.tag}</p>}
                                        <button>view all 57 comments</button>
                                    </div>
                                    <div className="comments">
                                        <form action="">
                                            <div className="my-3">
                                                <input name="comments" id="" cols="2" rows="3" placeholder="Type your comments"></input>
                                                <button type="submit">send</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="auth">
                        <div className="auth_content">
                            <div className="auth_profile_and_name">
                                <img src={profile_svg} alt="" />
                                <div className="auth_info">
                                    <p className="user_name m-0">devsrubel.me</p>
                                    <p className="display_name m-0">Rubel Hossain</p>
                                </div>
                            </div>
                            <div className="auth_switch">
                                <Link to="/">switch</Link>
                            </div>
                        </div>
                        <div className="suggetaion">
                            <div className="suggetaion_content">
                                <p>Suggestions for you</p>
                                <Link to="/">See all</Link>
                            </div>
                        </div>
                        <div className="follower">
                            <ul>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="follower_img">
                                        <img src={profile_svg} alt="" />
                                        <div className="follower_info">
                                            <div className="follower_id">
                                                <Link to="/">devesrubel.me</Link>
                                                <p>verified</p>
                                            </div>
                                            <p className="m-0 categories">populer</p>
                                        </div>
                                    </div>
                                    <div className="follow_btn">
                                        <Link to="/">follow</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="footer_menu">
                            <ul>
                                <li>
                                    <Link to="/">About</Link>
                                </li>
                                <li>
                                    <Link to="/">Help</Link>
                                </li>
                                <li>
                                    <Link to="/">Press</Link>
                                </li>
                                <li>
                                    <Link to="/">jobs</Link>
                                </li>
                                <li>
                                    <Link to="/">Privacy</Link>
                                </li>
                                <li>
                                    <Link to="/">Terms</Link>
                                </li>
                                <li>
                                    <Link to="/">locations</Link>
                                </li>
                                <li>
                                    <Link to="/">Language</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer_copyright">
                            <p>© 2023 INSTAGRAM FROM META</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="all_modal">
            {modal.status && <Modal hide={setModal}/>}
        </div>
    </>
  )
}

export default Home