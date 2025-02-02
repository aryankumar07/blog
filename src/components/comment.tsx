import Image from './image.tsx'


const Comment = () => {
  return (
    <div className="b-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image src='userImg.jpeg' className='rounded-full w-10 h-10' />
        <span className='font-medium' >Joh Doe</span>
        <span className='text-sm text-gray-500'>@ days ago</span>
      </div>
      <div className='mt-4'>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed qui a
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt
        </p>
      </div>
    </div>
  )
}

export default Comment
