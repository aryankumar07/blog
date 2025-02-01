import { IKImage } from "imagekitio-react";

interface ImageProp {
  src: string;
  className?: string;
  alt?: string;
}

const Image: React.FC<ImageProp> = ({
  src,
  className,
  alt = "No!"
}) => {
  if (!src) {
    console.error("src is required");
    return null;
  }

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
    />
  );
};

export default Image;
