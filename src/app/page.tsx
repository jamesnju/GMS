import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Wrench, Car, Cog, Star, LucideIcon } from 'lucide-react'

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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-Background text-Text">
      <header className="bg-Secondary text-Background p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold">
            AutoPro Garage
          </h1>
          <nav>
            <ul className="flex space-x-4">
              {['Home', 'Services', 'About', 'Contact', 'Login'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Login' ? '/auth' : `/${item.toLowerCase()}`} className="hover:text-Accent">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-primary text-Background py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-4">
              Your Trusted Auto Care Partner
            </h2>
            <p className="text-xl mb-8">
              Professional service for all your vehicle needs
            </p>
            <Button className="bg-Accent text-Secondary hover:bg-Accent/90 text-lg py-6 px-8">
              Book a Service
              <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </section>

        <section className="py-16 bg-Background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center text-Text">
              Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="h-full bg-Secondary border border-Primary ">
                  <CardContent className="flex flex-col items-center p-6">
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-Accent">{service.name}</h3>
                    <p className="text-center text-white">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-Background text-Text py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              What Our Customers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full bg-Secondary border border-primary">
                  <CardContent className="flex flex-col justify-between p-6">
                    <div>
                      <p className="italic mb-4 text-white">&quot;{testimonial.comment}&ldquo;</p>
                      <p className="font-semibold text-red-500">{testimonial.name}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-Accent fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-Background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center text-Text">
              Visit Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-Secondary border border-Primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-Accent">Contact Information</h3>
                  <p className="mb-2 text-white"><strong>Address:</strong> Ambank House, Nairobi CBD</p>
                  <p className="mb-2 text-white"><strong>Phone:</strong> (254) 123-4567</p>
                  <p className="mb-2 text-Primary"><strong>Email:</strong> info@autoprogarage.com</p>
                </CardContent>
              </Card>
              <Card className="bg-Secondary border border-Accent">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-Accent">Opening Hours</h3>
                  <p className="mb-2 text-white"><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
                  <p className="mb-2 text-white"><strong>Saturday:</strong> 9:00 AM - 3:00 PM</p>
                  <p className="mb-2 text-Primary"><strong>Sunday:</strong> Closed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-Background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center text-Text">
              Our Location
            </h2>
            <div className="h-[400px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176744277105!2d36.81334661475403!3d-1.2841000990669783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d23c29e5df%3A0x2b8e4d3a53e7c9e4!2sAmbank%20House%2C%20Nairobi!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-Secondary text-Background py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 AutoPro Garage. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/privacy" className="hover:text-Accent mr-4">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-Accent">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

