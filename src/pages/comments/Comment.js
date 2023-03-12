import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { DropdownEdit } from "../../components/DropdownEdit";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;

  const currentUser = useCurrentUser()
  const is_owner = currentUser?.username === owner;

  return (
    <div>
      <hr />
      <Card>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Card.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Card.Body>
        {is_owner && (
            <DropdownEdit handleEdit={() => {}} handleDelete={() => {}} />
        )}
      </Card>
    </div>
  );
};

export default Comment;