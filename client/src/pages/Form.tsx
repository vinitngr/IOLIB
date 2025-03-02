import { useState } from "react"
import TabChanger from "@/components/TabChaner"
import BookFrom from "@/components/BookFrom"
import WebForm from "@/components/WebForm"

export default function Form() {
  const [activeTab, setActiveTab] = useState<"book" | "website">("book")
  
  return (
    <div className="flex justify-center items-center min-h-[90vh] ">
      <div className="bg-white rounded-lg shadow p-5 w-[700px] max-h-[90vh] overflow-y-auto">
        <TabChanger activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "book" ? <BookFrom /> : <WebForm />}
      </div>
    </div>
  )
}
