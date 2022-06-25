import { tokenList } from "@/constants";
import { useFileUpload } from "@/hooks/useFileUpload";
import { WorkCredentialForm } from "@/interfaces";
import { FC } from "react";
import { Card,Button } from "react-daisyui";
import { useForm } from "react-hook-form";
import { FileUploader } from "./parts/FileUploader";
import { PaymentStepModal } from "./parts/PaymentStepModal";
import { TokenList } from "./parts/TokenList";

type PayCardProps = {
    onSubmit:(data: any) => void
}
export const PayCard:FC<PayCardProps> = ({onSubmit}) => {

    const {cid, status} = useFileUpload()

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkCredentialForm>({defaultValues: {tokenAddress: tokenList[0].address, tokenDecimal: tokenList[0].decimal, tokenSymbol: tokenList[0].value}});

    const onClickSubmit = (data:any) => {
        if(!data) return
        onSubmit(data)
    }
    
    return (
        <>
        <Card bordered normal={"lg"} className="w-[600px] h-[600px] md:h-[750px] bg-card overflow-hidden">
            <Card.Body className={"text-left"}>
                <form
                    className="w-full h-full"
                    onSubmit={handleSubmit(onClickSubmit)}
                >
                    <div>
                        {/* address */}
                        <div className="flex flex-wrap items-center">
                            <p className="font-semibold">
                            To Address
                            <span className="cols-span-1 px-3 text-xs text-red-600">
                                {errors.to?.message}
                                </span>
                            </p>
                        </div>
                        <div className="mb-3">
                            <input
                            className="w-full my-1 py-1 px-6 rounded-full text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none"
                            placeholder={"0x12345678..."}
                            {...register("to", { required: "Please enter the TO address" })}
                            />
                        </div>
                        {/* Token */}
                        <div className="flex flex-wrap items-center">
                            <span className="cols-span-1 px-3 text-xs text-red-600">
                                {errors.value?.message}
                            </span>
                        </div>
                        <div className="mb-3 flex items-center space-x-2">
                            <input
                                className="min-w-[120px] sm:min-w-fit sm:flex-1 my-1 py-2 px-6 rounded-full text-sm md:text-base bg-form border-none hover:border-none focus:outline-white appearance-none"
                                placeholder={"0.0"}
                                {...register("value", { required: "Please enter amount more than 0" })}
                            />
                            <div className="w-[300px] sm:w-[180px]">
                                <TokenList
                                    handleToken={(t) =>
                                        {
                                            setValue("tokenSymbol", t.value, { shouldValidate: true })
                                            setValue("tokenDecimal", t.decimal, { shouldValidate: true })
                                            setValue("tokenAddress", t.address, { shouldValidate: true })
                                        }
                                    }
                                    token={getValues("tokenSymbol")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="overflow-y-scroll h-[350px] md:h-[500px]">
                        {/* title */}
                        <div className="flex flex-wrap items-center">
                            <p className="font-semibold">
                            Summary
                            <span className="cols-span-1 px-3 text-xs text-red-600">
                                {errors.summary?.message}
                                </span>
                            </p>
                        </div>
                        <div className="mb-3">
                            <input
                            className="w-full my-1 py-1 px-6 rounded-full text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none"
                            placeholder={"Enter a summary... (e.g.Bitcoin Development)"}
                            {...register("summary", { required: "Please enter a summary" })}
                            />
                        </div>

                        {/* detail */}
                        <div className="flex flex-wrap items-center">
                            <p className="font-semibold">Description</p>
                        </div>
                        <div className="mb-3">
                            <textarea
                            className="w-full my-1 py-2 px-6 border rounded-xl text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none"
                            rows={3}
                            placeholder={"Write your description here..."}
                            {...register("detail")}
                            />
                            <div className="w-full grid grid-cols-2 mb-2">
                            <span className="cols-span-1 px-3 text-xs text-red-600">
                                {errors.detail?.message}
                            </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <p className="font-semibold">Deliverable</p>
                        </div>
                        <div className="mb-3">
                            <input
                            className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none"
                            placeholder={"Enter Deliverable link.."}
                            {...register("deliverableLink")}
                            />
                        </div>
                        <div className="mb-3">
                            {cid && (
                            <p
                                className="w-full my-1 py-1 px-6 border rounded-full text-xs md:text-sm bg-form border-none hover:border-none focus:outline-white appearance-none text-left"
                            >{cid}</p> 
                            )}
                            <FileUploader />
                            <div className="w-full grid grid-cols-2 mb-2">
                            {errors && errors.deliverableLink && (
                                <span className="cols-span-1 px-3 text-xs text-red-600">
                                {errors.deliverableLink.message}
                                </span>
                            )}
                            {errors && errors.deliverableCID && (
                                <span className="cols-span-1 px-3 text-xs text-red-600">
                                {errors.deliverableCID.message}
                                </span>
                            )}
                            </div>
                        </div>
                    </div>
                    <Card.Actions className="justify-end">
                        <Button type="submit" className="text-white bg-gradient-to-r from-border_l via-border_via to-border_r">Transfer</Button>
                    </Card.Actions>
                </form>
                </Card.Body>
        </Card>
        <PaymentStepModal />
        </>
    )
}