import { IKContext, IKUpload } from 'imagekitio-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { FileData } from '../pages/WritePage';

interface UploadProps {
  children: React.ReactNode;
  type: string;
  setData: React.Dispatch<React.SetStateAction<FileData>>;
}

const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (e) {
    throw new Error(`Authentication request failed ${e}`);
  }
};

const Upload: React.FC<UploadProps> = ({ children, type, setData }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);


  const onError = () => {
    toast.error('Failed to upload image');
  };

  const onSuccess = (res: unknown) => {
    setData(res as FileData)
  };

  return (



    <IKContext
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      authenticator={authenticator}
    >
      <IKUpload
        ref={inputRef}
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
        accept={`${type}/*`}
      />
      <div
        className="cursor-pointer"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
