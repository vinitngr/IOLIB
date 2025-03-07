import AiChat from '@/components/AiChat'

function Chat() {
  return (
    <div className="grid grid-cols-3 gap-10 h-screen overflow-hidden p-5 w-full">

  <div className="col-span-3 h-full overflow-hidden">
    <AiChat />
  </div>
</div>

  )
}

export default Chat