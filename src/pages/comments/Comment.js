import React, {useState} from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { DropdownEdit } from "../../components/DropdownEdit";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Comment.module.css";
import CommentEditForm from "./CommentEditForm";
import { useTheme } from "../../contexts/ThemeContext";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { theme } = useTheme();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Card className={styles.Comment}>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Card.Body className={`align-self-center ml-2 ${styles.Comment}`}>
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Card.Body>
        {is_owner && !showEditForm && (
          <DropdownEdit
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Card>
    </>
  );



};

export default Comment;