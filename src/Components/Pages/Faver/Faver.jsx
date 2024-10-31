import React from 'react';
import './Faver.css'
const Faver = () => {
    return (
        <main className="mt-24 faver-container">


            <div className="items-center tt flex flex-col md:flex-row-reverse">
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto my-16 md:my-0">
                    <img
                        alt="FAVR"
                        className="max-w-full rounded-lg"
                        src="https://favr-images.s3.us-east-2.amazonaws.com/branding/image.png"
                    />
                </div>
                <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                    <div className="pt-0 md:pt-32">
                        <h2 className="font-semibold text-4xl text-white">
                            Find your <span className="text-black text-4xl">property</span> by your finger tip
                        </h2>
                        <p className="mt-4 text-2xl leading-relaxed text-gray-600">
                            Our mobile apps are available now
                        </p>
                        <div className="mt-12">
                            <div className="flex flex-wrap">
                                <div className="w-6/12 md:w-5/12 p-1">

                                    <button className="cursor-pointer">
                                        <div
                                            className="flex max-w-48 h-12 px-3 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:gap-3 sm:h-14"
                                        >
                                            <svg viewBox="0 0 384 512" className="w-5 sm:w-7">
                                                <path
                                                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                            <div>
                                                <div className="text-[.5rem] sm:text-xs text-left">Download on the</div>
                                                <div className="text-lg font-semibold font-sans -mt-1 sm:text-2xl">
                                                    App Store
                                                </div>
                                            </div>
                                        </div>
                                    </button>

                                </div>
                                <div className="w-6/12 md:w-5/12 p-1">

                                    <button className="cursor-pointer">
                                        <div
                                            className="flex max-w-48 h-12 px-3 py-4 gap-2 rounded-xl items-center justify-center bg-black text-white dark:text-black dark:bg-white sm:h-14"
                                        >
                                            <svg viewBox="0 0 16 16" className="w-5 sm:w-7">
                                                <path
                                                    fill="currentColor"
                                                    d="m10.213 1.471l.691-1.26q.069-.124-.048-.192q-.128-.057-.195.058l-.7 1.27A4.8 4.8 0 0 0 8.005.941q-1.032 0-1.956.404l-.7-1.27Q5.281-.037 5.154.02q-.117.069-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.7 3.7 0 0 0 3.5 5.02h9q0-1.125-.623-2.072a4.27 4.27 0 0 0-1.664-1.476ZM6.22 3.303a.37.37 0 0 1-.267.11a.35.35 0 0 1-.263-.11a.37.37 0 0 1-.107-.264a.37.37 0 0 1 .107-.265a.35.35 0 0 1 .263-.11q.155 0 .267.11a.36.36 0 0 1 .112.265a.36.36 0 0 1-.112.264m4.101 0a.35.35 0 0 1-.262.11a.37.37 0 0 1-.268-.11a.36.36 0 0 1-.112-.264q0-.154.112-.265a.37.37 0 0 1 .268-.11q.155 0 .262.11a.37.37 0 0 1 .107.265q0 .153-.107.264M3.5 11.77q0 .441.311.75q.311.306.76.307h.758l.01 2.182q0 .414.292.703a.96.96 0 0 0 .7.288a.97.97 0 0 0 .71-.288a.95.95 0 0 0 .292-.703v-2.182h1.343v2.182q0 .414.292.703a.97.97 0 0 0 .71.288a.97.97 0 0 0 .71-.288a.95.95 0 0 0 .292-.703v-2.182h.76q.436 0 .749-.308q.31-.307.311-.75V5.365h-9zm10.495-6.587a.98.98 0 0 0-.702.278a.9.9 0 0 0-.293.685v4.063q0 .406.293.69a.97.97 0 0 0 .702.284q.42 0 .712-.284a.92.92 0 0 0 .293-.69V6.146a.9.9 0 0 0-.293-.685a1 1 0 0 0-.712-.278m-12.702.283a1 1 0 0 1 .712-.283q.41 0 .702.283a.9.9 0 0 1 .293.68v4.063a.93.93 0 0 1-.288.69a.97.97 0 0 1-.707.284a1 1 0 0 1-.712-.284a.92.92 0 0 1-.293-.69V6.146q0-.396.293-.68"
                                                ></path>
                                            </svg>
                                            <div>
                                                <div className="text-[.5rem] sm:text-xs text-left">Download</div>
                                                <div className="text-sm font-semibold font-sans -mt-1 sm:text-xl">
                                                    Android APK
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    );
};

export default Faver;
