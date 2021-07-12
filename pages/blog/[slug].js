import fs from "fs";
import path from "path";
import marked from "marked";
import matter from "gray-matter";

import Image from "next/image";
import Link from "next/link";

const PostPage = ({ frontmatter, content, slug }) => {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>

      <div className="card card-page">
        <h1 className="post-title">{frontmatter.title}</h1>
        <div className="post-date">{frontmatter.date}</div>
        <Image src={frontmatter.cover_image} alt="" width="1280" height="720" />

        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
