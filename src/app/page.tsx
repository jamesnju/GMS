"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Wrench, Car, Cog, Star, type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface Service {
  name: string
  description: string
  icon: LucideIcon
  image: string
}

interface Testimonial {
  name: string
  comment: string
  rating: number
  avatar: string
}

const services: Service[] = [
  {
    name: "Repairs",
    description: "Expert repairs for all makes and models",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    name: "Maintenance",
    description: "Regular maintenance to keep your vehicle in top condition",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    name: "Diagnostics",
    description: "State-of-the-art diagnostic services",
    icon: Cog,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1283&q=80",
  },
]

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    comment: "Great service! They fixed my car quickly and at a reasonable price.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    comment: "Very professional team. I always feel confident leaving my car with them.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Mike Johnson",
    comment: "Excellent diagnostic work. They found and fixed an issue that other shops missed.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <motion.header
        className="bg-blue-600 text-white p-4 shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="AutoPro Garage Logo" width={50} height={50} className="rounded-full" />
            <h1 className="text-2xl font-bold">GMS</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              {["Home", "Services", "About", "Contact", "Login"].map((item) => (
                <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item === "Login" ? "/auth" : `/${item.toLowerCase()}`}
                    className="hover:text-yellow-300 transition duration-300"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.header>

      <main className="flex-grow">
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
              alt="Garage Background"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <div className="container mx-auto text-center relative z-10">
            <motion.h2
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your Trusted Auto Care Partner
            </motion.h2>
            <motion.p
              className="text-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Professional service for all your vehicle needs
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button className="bg-yellow-400 text-blue-800 hover:bg-yellow-300 text-lg py-6 px-10 rounded-full transition duration-300 shadow-lg">
                Book a Service
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto">
            <motion.h2 className="text-4xl font-bold mb-12 text-center text-blue-600" {...fadeInUp}>
              Our Services
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-3 gap-10"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full bg-gray-50 border-none shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-blue-600 bg-opacity-70 flex items-center justify-center">
                          <service.icon className="h-16 w-16 text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-4 text-blue-800">{service.name}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-100 py-24">
          <div className="container mx-auto">
            <motion.h2 className="text-4xl font-bold mb-12 text-center text-blue-600" {...fadeInUp}>
              What Our Customers Say
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-3 gap-10"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full bg-white border-none shadow-lg hover:shadow-xl transition duration-300">
                    <CardContent className="flex flex-col justify-between p-8">
                      <div>
                        <div className="flex items-center mb-4">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="rounded-full mr-4"
                          />
                          <div>
                            <p className="font-semibold text-lg text-blue-800">{testimonial.name}</p>
                            <div className="flex mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="italic text-gray-600">&quot;{testimonial.comment}&ldquo;</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto">
            <motion.h2 className="text-4xl font-bold mb-12 text-center text-blue-600" {...fadeInUp}>
              Visit Us
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 gap-10"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <Card className="bg-gray-50 border-none shadow-lg h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-blue-800">Contact Information</h3>
                    <p className="mb-4 text-gray-600">
                      <strong>Address:</strong> Ambank House, Nairobi CBD
                    </p>
                    <p className="mb-4 text-gray-600">
                      <strong>Phone:</strong> (254) 123-4567
                    </p>
                    <p className="mb-4 text-blue-600">
                      <strong>Email:</strong> info@autoprogarage.com
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card className="bg-gray-50 border-none shadow-lg h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-blue-800">Opening Hours</h3>
                    <p className="mb-4 text-gray-600">
                      <strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM
                    </p>
                    <p className="mb-4 text-gray-600">
                      <strong>Saturday:</strong> 9:00 AM - 3:00 PM
                    </p>
                    <p className="mb-4 text-blue-600">
                      <strong>Sunday:</strong> Closed
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gray-100">
          <div className="container mx-auto">
            <motion.h2 className="text-4xl font-bold mb-12 text-center text-blue-600" {...fadeInUp}>
              Our Location
            </motion.h2>
            <motion.div
              className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176744277105!2d36.81334661475403!3d-1.2841000990669783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d23c29e5df%3A0x2b8e4d3a53e7c9e4!2sAmbank%20House%2C%20Nairobi!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.footer
        className="bg-blue-800 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-8">
            <Image src="/logo.png" alt="AutoPro Garage Logo" width={60} height={60} className="rounded-full" />
            <h2 className="text-3xl font-bold ml-4">AutoPro Garage</h2>
          </div>
          <p className="mb-6">&copy; 2024 AutoPro Garage. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="hover:text-yellow-300 transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-yellow-300 transition duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

