export interface User {
    name: string
    email: string
    role: string
    createdAt: string
  }
  
  export interface Service {
    name: string
    description: string
    price: number
    categoryId: number
    category: ServiceCategory
  }
  
  export interface ServiceCategory {
    name: string
    description: string
    services: Service[]
  }
  
  export interface Vehicle {
    licensePlate: string
    make: string
    model: string
    owner: User
  }
  
  export interface BookingService {
    description: string
    bookedDate: string
    status: string
    user: User
    service: Service
    category: ServiceCategory
    Payment: Payment[]
  }
  
  export interface Payment {
    amount: number
    paymentMethod: string
    paymentStatus: string
    paymentDate: string
    transactionId: string
  }
  
  export interface ReportData {
    users: User[]
    services: Service[]
    serviceCategories: ServiceCategory[]
    bookingServices: BookingService[]
    payments: Payment[]
    vehicles: Vehicle[]
  }
  
  