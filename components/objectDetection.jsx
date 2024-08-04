"use client"
import { useEffect, useState, useRef } from "react"
import Webcam from "react-webcam"
import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd"
import * as tf from '@tensorflow/tfjs'
import {renderPredictions} from "@/utils/predictions"

let detectInterval;

const ObjectDetection = ()=>{
     const [isloading, setIsLoading] = useState(false)
     const webcamRef = useRef(null)
     const canvasRef = useRef(null)

     async function runModel(){
        setIsLoading(true)
        const net = await cocoSSDLoad()
        detectInterval = setInterval(()=>{
            runObjectDetection(net)
        },3)
        setIsLoading(false)

        

     }

     async function runObjectDetection(net){
        if(
            canvasRef.current &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ){
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            const detectedObject = await net.detect(
                webcamRef.current.video,
                undefined,
                0.6
            )

            console.log(detectedObject)

            const context = canvasRef.current.getContext("2d");
            renderPredictions(detectedObject, context)
        }
     }

     const showVideo = ()=>{
        if(
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ){
            const myVideoWidth = webcamRef.current.video.videoWidth;
            const myVideoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = myVideoWidth
            webcamRef.current.video.height = myVideoHeight
        }
     }

     useEffect(()=>{
        runModel()
        showVideo()
     },[])

     return(
        <div>
            {
                isloading ? (
                    <div>Loading...</div>
                ):(
                    <div>
                        <Webcam 
                        ref={webcamRef}
                        className="rounded w-full lg:h-[720px]"
                        muted   
                        />

                        {/* canvasRef */}
                        <canvas 
                          ref={canvasRef}
                          className="absolute top-0 left-0 z-[99999] w-full lg:h-[720px]"
                        />
                    </div>
                )
            }
        </div>
     )
}

export default ObjectDetection