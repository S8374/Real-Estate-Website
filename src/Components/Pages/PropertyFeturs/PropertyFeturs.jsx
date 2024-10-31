import React from 'react';
import { BiArea } from "react-icons/bi";
import { MdOutlineBedroomParent, MdOutlineBathroom } from "react-icons/md";
import { GiHomeGarage } from "react-icons/gi";

const PropertyFeturs = ({ cardDetails }) => {
    const { facilities , description} = cardDetails;

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col justify-between lg:flex-row">
                {/* Property Details */}
                <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0">
                    <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                        Property Details
                    </h2>
<p>{description}</p>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full mb-6">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2"><BiArea className="inline-block text-lg mr-2" /> Area</td>
                                    <td className="py-2">1200 sq.ft</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2"><MdOutlineBedroomParent className="inline-block text-lg mr-2" /> Bedrooms</td>
                                    <td className="py-2">3</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2"><MdOutlineBathroom className="inline-block text-lg mr-2" /> Bathrooms</td>
                                    <td className="py-2">2</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2"><GiHomeGarage className="inline-block text-lg mr-2" /> Garage</td>
                                    <td className="py-2">1</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Facilities */}
                        <p className="text-lg font-semibold mb-4">Facilities:</p>
                        <div className="flex flex-wrap">
                            {facilities.map(facility => (
                                <div key={facility.id} className="mr-2 mb-2">
                                    <button className="btn btn-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        {facility}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Auto-playing YouTube Video */}
                <div className="autovedios lg:w-1/2">
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/jPkBJY1KI_Q?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default PropertyFeturs;
