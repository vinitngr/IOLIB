import { formFields } from "@/data/form1"
import { renderField } from "@/lib/tsxUtils"
import { Button } from "./ui/button"

function BookFrom() {
  return (
    <form className="space-y-2">
          <div className="space-y-2 grid gap-x-2 grid-cols-3">
            {formFields.map((field, index) => (
              <div
                key={index}
                className={` ${
                  field.gridType === "triple" ? "md:col-span-1" : "md:col-span-3"
                }`}
              >
                <label className="block text-sm font-[500] text-gray-500">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

            <div className=" flex justify-end space-x-2 pt-2">
              <Button variant={'secondary'}>Cancel</Button>
              <Button className="px-6">Save</Button>
            </div>
          </form>
  )
}

export default BookFrom