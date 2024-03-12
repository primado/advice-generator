
'use client'
import hori from "../public/images/pattern-divider-desktop.svg"
import Image from "next/image"
import dice from "../public/images/icon-dice.svg"
import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import { Oval } from 'react-loader-spinner'

export default function AdviceCard() {

    const {data, isLoading, refetch} = useQuery({
        queryKey: ['advice'],
        queryFn: async () => {
            const response = await axios.get('https://api.adviceslip.com/advice', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Advice data:", response.data.slip)
            return response.data
        }
    })

    const handleClick = () => {
        refetch()
    }



    return (

        <>
            <div className=" bg-dark-grayish-blue w-[20rem] h-[12rem] p-5 flex flex-col gap-2 justify-center items-center rounded-md shadow-lg">
                <div className="text-neon-green text-center text-sm">
                    <span className="uppercase ">advice #{data?.slip.id}</span>
                </div>
                <div className="text-light-cyan text-center">
                    {isLoading || !data ? (
                        <>
                            <Oval 
                                visible={true}
                                height="30"
                                width="30"
                                color="hsl(150, 100%, 66%)"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </>
                    ): (
                        <>
                         &quot;
                            {data.slip.advice}
                         &quot;
                        </>
                    )}

                   
                </div>
                <div className="">
                    <Image 
                        src={hori}
                        alt="Horitanl line"
                        className=""
                    />

                </div>
                <div className="relative flex justify-center">
                    <div className="absolute top-3">
                        <button 
                            type="submit" 
                            className=""
                            onClick={handleClick}
                        >
                            <div className="bg-neon-green rounded-full w-10 h-10 relative">
                           
                                <Image 
                                    alt="dice icon"
                                    src={dice}
                                    className="absolute w-4 right-3 top-3"
                                />
                            
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}