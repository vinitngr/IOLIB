import { Button } from './ui/button'
import { renderField } from '@/lib/tsxUtils'
import { formFields2 } from '@/data/form2'

function WebForm() {
  return (
    <form className="space-y-2">
         <div className="grid grid-cols-3 gap-2">
           {formFields2.map((field, index) => (
             <div
               key={index}
               className={`${field.gridType === "single" ? "col-span-3" : field.gridType === "triple" ? "md:col-span-1" : "md:col-span-2"}`}
             >
               <label className="block text-sm font-[500] text-gray-500">
                 {field.label} {field.required && <span className="text-red-500">*</span>}
               </label>
               {renderField(field)}
             </div>
           ))}
         </div>
         <div className="flex justify-end space-x-2 pt-2">
           <Button variant="secondary">Cancel</Button>
           <Button className="px-6">Save</Button>
         </div>
       </form>
  )
}

export default WebForm