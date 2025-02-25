import React from "react";
import { Shield, Heart, Lock } from "lucide-react";
const CreatorCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) => <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1 relative overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="w-50 h-50 aspect-square rounded-xl mx-auto bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
        <img className='border-orange-600 p-0.5 aspect-square rounded-xl' src={Icon} alt="" />
      </div>
      <h3 className="text-center text-2xl font-semibold mb-3 text-gray-900 group-hover:text-orange-500 transition-colors duration-300 mt-15">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>;
export const Creators = () => {
  return <section id="features" className="py-24 bg-linear-to-b from-white to-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Creators
          </h2>
          <p className="text-xl text-gray-600">
            Meet the Creators of this platform
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-50 to-purple-50 rounded-3xl transform  scale-105 opacity-50" />
          <CreatorCard icon={'https://firebasestorage.googleapis.com/v0/b/pyq-next.appspot.com/o/WhatsApp%20Image%202025-02-25%20at%2020.57.47_f30d0266.jpg?alt=media&token=dff40dcf-c3c5-49ae-8417-a64b58b01856'} title="Lakshay jain" description="" />
          <CreatorCard icon={'https://firebasestorage.googleapis.com/v0/b/pyq-next.appspot.com/o/107908068.jpeg?alt=media&token=d59d3c84-f1b4-48a9-8927-c952f0c4d2b0'} title="Rish K" description="" />
          <CreatorCard icon={'https://firebasestorage.googleapis.com/v0/b/pyq-next.appspot.com/o/WhatsApp%20Image%202025-02-25%20at%2020.17.57_feec93da.jpg?alt=media&token=ec30b4a2-7dcb-4b57-a5a6-bd3b9e7b1d21'} title="Kanishk jha" description="" />
          <CreatorCard icon={'https://firebasestorage.googleapis.com/v0/b/pyq-next.appspot.com/o/WhatsApp%20Image%202025-02-25%20at%2020.18.38_6ff1b0c0.jpg?alt=media&token=197d859e-a03e-42e9-8c66-21263873e624'} title="Ayush Chand" description="" />
        </div>
      </div>
    </section>;
};