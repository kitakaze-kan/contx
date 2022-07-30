import { FileUploader } from "@/components/pay/parts/FileUploader";
import { useCreateSponsor } from "@/hooks/useCreateSponsor";
import { useFileUpload } from "@/hooks/useFileUpload";
import { SponsorForm } from "@/interfaces";
import { FC,useEffect } from "react";
import { Card,Button } from "react-daisyui";
import { useForm } from "react-hook-form";

export const CreateContainer:FC = () => {

    const {create} = useCreateSponsor()
    const {fullPath, status} = useFileUpload()

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<SponsorForm>();

    const onClickSubmit = async(data:any) => {
        if(!data) return
        await create(data)
    }

    useEffect(() => {
        if(fullPath && status==="completed"){

            setValue("icon", fullPath)
        }
    },[fullPath, status])

    return (
        <main className=" text-center h-screen overflow-hidden flex justify-center ">
            <Card bordered normal={"lg"} className="w-[600px] h-[600px] md:h-[750px] bg-neutral overflow-hidden">
                <Card.Body className={"text-left"}>
                    <form
                        className="w-full h-full"
                        onSubmit={handleSubmit(onClickSubmit)}
                    >
                        <Card.Title>Create Account</Card.Title>
                        <div className="divider"></div>
                        <div className="overflow-y-scroll h-[350px] md:h-[500px]">
                            {/* sponsor account name */}
                            <div className="flex flex-wrap items-center">
                                <p className="font-semibold">
                                Account Name(Required)
                                <span className="cols-span-1 px-3 text-xs text-red-600">
                                    {errors.name?.message}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-3">
                                <input
                                className="w-full my-1 py-1 px-6 rounded-full text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none"
                                placeholder={"Enter an account name"}
                                {...register("name", { required: "Please enter a guild name" })}
                                />
                            </div>
                            {/* sponsor account name */}
                            <div className="flex flex-wrap items-center">
                                <p className="font-semibold">
                                Fund Account address(optional)
                                <span className="cols-span-1 px-3 text-xs text-red-600">
                                    {errors.fundAddress?.message}
                                    </span>
                                </p>
                            </div>
                            <div className="mb-3">
                                <input
                                className="w-full my-1 py-1 px-6 rounded-full text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none"
                                placeholder={""}
                                {...register("fundAddress")}
                                />
                            </div>
                            <div className="flex flex-wrap items-center">
                                <p className="font-semibold">
                                    Icon
                                </p>
                            </div>
                            <div className="mb-3">
                                {fullPath && (
                                <p
                                    className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none text-left"
                                >{fullPath}</p> 
                                )}
                                <FileUploader />
                                <div className="w-full grid grid-cols-2 mb-2">
                                {errors && errors.icon && (
                                    <span className="cols-span-1 px-3 text-xs text-red-600">
                                    {errors.icon.message}
                                    </span>
                                )}
                                </div>
                            </div>
                        </div>
                        <Card.Actions className="justify-end">
                            <Button type="submit" className=" bg-gradient-to-r from-border_l via-border_via to-border_r">Create</Button>
                        </Card.Actions>
                    </form>
                    </Card.Body>
            </Card>
        </main>
    )

}