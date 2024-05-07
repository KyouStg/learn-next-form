import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema} from "@/lib/formSchema";
import {useCallback} from "react";
import {NextResponse} from "next/server";


export const useMailForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      subject: "",
      content: "",
      file: undefined
    }
  });

  const onSubmit = useCallback(async (values: any) => {
    const { username, email, subject, content, file } = values;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, email, subject, content})
      })
    } catch (error) {
      console.log(error)
      return NextResponse.json({error})
    }
  }, [])

  return {form, onSubmit};
}
