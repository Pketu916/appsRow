import React from "react";

const BlogCard = ({ blog }) => {
   const { title, content = "", tags, image } = blog;

  return (
    <div className="card">
      <img src={image} alt={"image"} />
      <h3>{title}</h3>
      <p>{content}</p> 
      <div>{tags?.join(', ')}</div>
    </div>
  );
};

export default BlogCard;