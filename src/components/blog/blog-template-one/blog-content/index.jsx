import '../../../../style/BlogOneTemplate.css'
import SubHeading from "./SubHeading";
import Image from "./Image";
import Content from "./Content";

export default function BlogContent({ subHeadingText, imageUrl, content }) {
  return (
    <div>
      <SubHeading text={subHeadingText} />
      <Image imageUrl={imageUrl} />
      <Content content={content} />
    </div>
  );
}

BlogContent.SubHeading = SubHeading;
BlogContent.Image = Image;
BlogContent.Content = Content;
