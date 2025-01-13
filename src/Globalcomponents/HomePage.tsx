'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Wrench, Car, Cog, Star, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface Service {
  name: string;
  description: string;
  icon: LucideIcon;
}

interface Testimonial {
  name: string;
  comment: string;
  rating: number;
}

const services: Service[] = [
  { name: "Repairs", description: "Expert repairs for all makes and models", icon: Wrench },
  { name: "Maintenance", description: "Regular maintenance to keep your vehicle in top condition", icon: Car },
  { name: "Diagnostics", description: "State-of-the-art diagnostic services", icon: Cog },
]

const testimonials: Testimonial[] = [
  { name: "John Doe", comment: "Great service! They fixed my car quickly and at a reasonable price.", rating: 5 },
  { name: "Jane Smith", comment: "Very professional team. I always feel confident leaving my car with them.", rating: 5 },
  { name: "Mike Johnson", comment: "Excellent diagnostic work. They found and fixed an issue that other shops missed.", rating: 4 },
]

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
}

export default function HomePage() {
  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-Background text-Text"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <header className="bg-Secondary text-Background p-4">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-display font-bold"
            variants={slideUp}
          >
            AutoPro Garage
          </motion.h1>
          <nav>
            <motion.ul 
              className="flex space-x-4"
              variants={staggerChildren}
            >
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <motion.li key={item} variants={slideUp}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-Accent">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <motion.section 
          className="bg-primary text-Background py-20"
          variants={fadeIn}
        >
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-4xl font-display font-bold mb-4"
              variants={slideUp}
            >
              Your Trusted Auto Care Partner
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              variants={slideUp}
            >
              Professional service for all your vehicle needs
            </motion.p>
            <motion.div variants={slideUp}>
              <Button className="bg-Accent text-Secondary hover:bg-Accent/90 text-lg py-6 px-8">
                Book a Service
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="py-16 bg-Background"
          variants={fadeIn}
        >
          <div className="container mx-auto">
            <motion.h2 
              className="text-3xl font-display font-bold mb-8 text-center text-Text"
              variants={slideUp}
            >
              Our Services
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={slideUp}>
                  <Card className="h-full bg-Background border border-Secondary">
                    <CardContent className="flex flex-col items-center p-6">
                      <service.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-Text">{service.name}</h3>
                      <p className="text-center text-Text">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="bg-Secondary text-Background py-16"
          variants={fadeIn}
        >
          <div className="container mx-auto">
            <motion.h2 
              className="text-3xl font-display font-bold mb-8 text-center"
              variants={slideUp}
            >
              What Our Customers Say
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={slideUp}>
                  <Card className="h-full bg-Background border border-primary">
                    <CardContent className="flex flex-col justify-between p-6">
                      <div>
                        <p className="italic mb-4 text-Text">&quot;{testimonial.comment}&quot;</p>
                        <p className="font-semibold text-Text">{testimonial.name}</p>
                      </div>
                      <div className="flex justify-end mt-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-Accent fill-current" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="py-16 bg-Background"
          variants={fadeIn}
        >
          <div className="container mx-auto">
            <motion.h2 
              className="text-3xl font-display font-bold mb-8 text-center text-Text"
              variants={slideUp}
            >
              Visit Us
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={staggerChildren}
            >
              <motion.div variants={slideUp}>
                <Card className="bg-Background border border-Secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-Text">Contact Information</h3>
                    <p className="mb-2 text-Text"><strong>Address:</strong> 123 Auto Street, Carville, ST 12345</p>
                    <p className="mb-2 text-Text"><strong>Phone:</strong> (555) 123-4567</p>
                    <p className="mb-2 text-Text"><strong>Email:</strong> info@autoprogarage.com</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={slideUp}>
                <Card className="bg-Background border border-Secondary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-Text">Opening Hours</h3>
                    <p className="mb-2 text-Text"><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
                    <p className="mb-2 text-Text"><strong>Saturday:</strong> 9:00 AM - 3:00 PM</p>
                    <p className="mb-2 text-Text"><strong>Sunday:</strong> Closed</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <motion.footer 
        className="bg-Secondary text-Background py-8"
        variants={fadeIn}
      >
        <div className="container mx-auto text-center">
          <motion.p variants={slideUp}>&copy; 2024 AutoPro Garage. All rights reserved.</motion.p>
          <motion.div className="mt-4" variants={staggerChildren}>
            <motion.span variants={slideUp}>
              <Link href="/privacy" className="hover:text-Accent mr-4">Privacy Policy</Link>
            </motion.span>
            <motion.span variants={slideUp}>
              <Link href="/terms" className="hover:text-Accent">Terms of Service</Link>
            </motion.span>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  )
}

