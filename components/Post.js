import Image from "next/image";
import Link from "next/link";

const Post = ({ post }) => {
  return (
    <div className="card">
      <Image
        src={post.frontmatter.cover_image}
        alt=""
        width="640"
        height="480"
      />

      <div className="post-date">Posted On: {post.frontmatter.date}</div>
      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
};

export default Post;
