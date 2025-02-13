import React from "react";
import { Shield, Heart, Lock } from "lucide-react";
const FeatureCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1 relative overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>;
export const Features = () => {
  return <section id="features" className="py-24 bg-linear-to-b from-white to-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Why SafeSpace?
          </h2>
          <p className="text-xl text-gray-600">
            Experience a new era of online interaction where safety meets
            innovation
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-50 to-purple-50 rounded-3xl transform  scale-105 opacity-50" />
          <FeatureCard icon={Heart} title="Incentivizing Positivity" description="Gamified kindness rewards for meaningful engagement and positive interactions." />
          <FeatureCard icon={Shield} title="Toxicity Detection" description="Advanced AI prevents cyberbullying before it happens, ensuring a safe environment." />
          <FeatureCard icon={Lock} title="Complete Privacy" description="Absolute anonymity for open, fear-free sharing in a protected space." />
        </div>
      </div>
    </section>;
};