import { useState } from 'react';

import {
  Clock,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';

import {
  Form,
  FormHeader,
  FormInput,
  MessageArea,
} from '../component/form';

export const ContactUs = () => {
  // const [name, setname] = useState("");
  // const [email, setemail] = useState("");
  // const [subject, setsubject] = useState("");
  // const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill all form fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully..");
      console.log(formData);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="bg-black/90 flex flex-col justify-center itesm-center  gap-4  px-3 py-4 sm:px-10 lg:px-10 sm:py-6  text-sm border-t border-t-brandborder max-w-screen overflow-hidden">
      <div className="flex flex-col gap-4.5 text-center my-4">
        <p className="text-3xl md:text-5xl font-semibold text-white">
          Get in Touch
        </p>
        <p className="text-lg text-white/80">
          We'd love to hear from you. Reach out for any inquiries or support.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:max-w-4xl lg:mx-47 my-3 items-center">
        {[
          {
            icon: <Phone className="w-8 h-8" />,
            header: "Phone",
            detail_1: "+234 8116394666",
            description: "Mon-Sun, 10am-10pm",
          },
          {
            icon: <Mail className="w-8 h-8" />,
            header: "Expert Chefs",
            detail_1: "more@neemahtreat.com",
            description: "We reply within 24 hours",
          },
          {
            icon: <MapPin className="w-8 h-8" />,
            header: "Fast Delivery",
            detail_1: "123 Okene Street",
            description: "Okene, Kogi",
          },
          {
            icon: <Clock className="w-8 h-8" />,
            header: "Made with Love",
            detail_1: "Mon-Fri: 11am-10pm",
            description: "Sat-Sun: 10am-11pm",
          },
        ].map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-1 p-7.5 bg-gray-400/10 border border-orange-400/50 rounded-xl w-full"
          >
            <div className="pt-3 text-orange-400/90 my-5">{data.icon}</div>
            <h2 className=" text-xl md:text-2xl font-semibold">
              {data.header}
            </h2>
            <p className="text-xl">{data.detail_1} </p>
            <p className="text-sm">{data.description} </p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Form
          action={handleSubmit}
          BtnText={`${isLoading ? "Sending Message...." : "Send Message"}`}
        >
          <FormHeader>Send us a Message</FormHeader>
          <div
            className={`flex flex-wrap md:flex-nowrap items-center gap-4 w-full font-medium text-xl `}
          >
            <FormInput
              inputType={"text"}
              labelName={`name`}
              inputName={"name"}
              inputValue={formData.name}
              onChange={handleChange}
            >
              Name
            </FormInput>
            <FormInput
              inputType={"email"}
              labelName={`email`}
              inputName={"email"}
              inputValue={formData.email}
              onChange={handleChange}
            >
              Email
            </FormInput>
          </div>
          <FormInput
            inputType={"text"}
            labelName={`subject`}
            inputName={"subject"}
            inputValue={formData.subject}
            onChange={handleChange}
          >
            Subject
          </FormInput>
          <MessageArea
            Label={"Message"}
            inputName={"message"}
            inputValue={formData.message}
            onChange={handleChange}
          ></MessageArea>
        </Form>
      </motion.div>
    </div>
  );
};
