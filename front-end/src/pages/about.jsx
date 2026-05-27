import {
  Award,
  Clock,
  Heart,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AboutUs = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 px-4.5 py-10 sm:px-10 lg:px-20 sm:py-9">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 font-semibold text-center"
      >
        <p className="text-2xl sm:text-4xl lg:text6xl">About Neemah's Treat</p>
        <p className="text-lg">
          Where pasion meets excellence in every dish we serve
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-7.5 text-lg bg-gray-400/10 border border-orange-400/50 rounded-xl text-left lg:max-w-4xl md:text-justify"
      >
        <p className="mb-4">
          Founded in 2020, Neemah's Treat has been at the forefront of
          delivering exceptional dining experiences to food lovers across Lagos.
          Our commitment to quality, authenticity, and customer satisfaction has
          made us a household name in the Nigerian culinary scene.
        </p>
        <p className="mt-5">
          We source the finest ingredients, employ skilled chefs with years of
          experience, and ensure every meal is prepared with love and attention
          to detail. From traditional Nigerian favorites to international
          cuisines, we bring the restaurant experience right to your doorstep.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:max-w-4xl">
        {[
          {
            icon: <Award className="w-10 h-10" />,
            header: "Premium Quality",
            description: "Only the finest ingredients make it to your plate",
          },
          {
            icon: <Users className="w-10 h-10" />,
            header: "Expert Chefs",
            description: "Trained professionals with passion for culinary arts",
          },
          {
            icon: <Clock className="w-10 h-10" />,
            header: "Fast Delivery",
            description: "Hot, fresh meals delivered within 45-60 minutes",
          },
          {
            icon: <Heart className="w-10 h-10" />,
            header: "Made with Love",
            description: "Every dish is crafted with care and attention",
          },
        ].map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 p-7.5 bg-gray-400/10 border border-orange-400/50 rounded-xl w-full"
          >
            <div className="pt-3 text-orange-400/90">{data.icon}</div>
            <h2 className=" text-xl md:text-2xl font-semibold">
              {data.header}
            </h2>
            <p>{data.description} </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
