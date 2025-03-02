import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formFields } from "@/data/form1";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Upload } from "lucide-react";

export const renderField = (field : typeof formFields[number]) => {
    switch (field.type) {
      case "text":
      case "number":
      case "url":
        return (
          <Input
            required={field.required}
            type={field.type}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
          />
        );
      case "file":
          return (
            <div className="flex">
              <label className="flex flex-grow-1 justify-center items-center border-2 py-2 border-dashed gap-2 text-gray-400">
                upload <Upload/>
                <input type="file" accept="image/*" hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const preview = document.getElementById("preview");
                      if (preview) {
                        (preview as HTMLImageElement).src = e.target?.result as string;
                      }
                    };
                    reader.readAsDataURL(file as Blob);
                  }}
                />
              </label>
                <img id="preview" className="h-24 ml-2"/>
            </div>
          )
      case "select":
        return (
          <Select required={field.required} >
            <SelectTrigger>
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: { value: string; label: string }) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return <Textarea placeholder={field.placeholder} />;
      default:
        return null;
    }
  };