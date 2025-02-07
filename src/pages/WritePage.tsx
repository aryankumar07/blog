import { useAuth, useUser } from "@clerk/clerk-react";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import Upload from "../components/upload.tsx";
import Image from "../components/image.tsx";


interface FormDataType {
  title: FormDataEntryValue | null,
  category: FormDataEntryValue | null,
  desc: FormDataEntryValue | null,
  content: FormDataEntryValue | null
}



export interface FileData {
  fileId: string;
  name: string;
  size: number;
  versionInfo: string;
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
  AITags: string[];
}


const filler: FileData = {
  fileId: "",
  name: "",
  size: 0,
  versionInfo: "",
  filePath: "",
  url: "",
  fileType: "",
  height: 0,
  width: 0,
  thumbnailUrl: "",
  AITags: [],
};



const WritePage = () => {
  const { isLoaded, isSignedIn } = useUser()
  const [value, setValue] = useState<string>('')
  const [cover, setCover] = useState<FileData>(filler)
  const [img, setImg] = useState<FileData>(filler)
  const [vid, setVid] = useState<FileData>(filler)




  useEffect(() => {
    if (img && img.url.length !== 0) {
      setValue((prev) => prev + `<p><img src="${img.url}" alt="Uploaded Image" /></p>`);
    }
  }, [img]);



  useEffect(() => {
    if (vid && vid.url.length !== 0) {
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${vid.url}"/></p>`
      );
    }
  }, [vid]);





  const { getToken } = useAuth()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async (newPost: FormDataType) => {
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    },
    onSuccess: (res) => {
      toast('😲 new Post created !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/${res.data.slug}`)
    }
  })
  if (!isLoaded) {
    return <div>Loading ....</div>
  }
  if (isLoaded && !isSignedIn) {
    return <div>Please Sign In</div>
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      img: cover.filePath,
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    }
    mutation.mutate(data)
  }

  return (
    <div className="h-[calc(100vh-64px)]  md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create A New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 flex-1">
        {
          cover.filePath.length === 0 ?
            <Upload setData={setCover} type="image">
              {/*important to add type="button" otherwise the form was getting submitted everytime*/}
              <button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
                Add A Cover Image
              </button>
            </Upload>
            :
            <Image src={cover.filePath} className="w-30 max-h-80 object-cover" />
        }
        <input
          name="title"
          type="text"
          className="text-4xl font-semibold bg-transparent outline-none"
          placeholder="Here my opnions/ discoveries" />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">Choose a Category</label>
          <select name='category' id='' className="p-2 rounded-xl bg-white shadow-md" >
            <option value="general">General</option>
            <option value="web design">Web Design</option>
            <option value="development">Development</option>
            <option value="database">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea name="desc" placeholder="Enter a short Description" className="" />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setData={setImg} >🌉</Upload>
            <Upload type="video" setData={setVid}>📽️</Upload>
          </div>
          <ReactQuill
            value={value}
            onChange={setValue}
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md" />
        </div>
        <button
          disabled={mutation.isPending}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed">
          {mutation.isPending ? "Wait.." : "Send"}
        </button>
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  )
}


export default WritePage;
