"use client"
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer"
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


const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#f3f4f6",
    padding: 5,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
})

interface ReportGeneratorProps {
  data: ReportData
}

export default function ReportGenerator({ data }: ReportGeneratorProps) {
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Auto Service Management System Report</Text>
            <Text style={styles.date}>Date: {new Date().toLocaleDateString()}</Text>
          </View>

          {/* Services Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services Overview</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Service Name</Text>
                <Text style={styles.tableCell}>Category</Text>
                <Text style={styles.tableCell}>Price (KES)</Text>
              </View>
              {data.services.map((service, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{service.name}</Text>
                  <Text style={styles.tableCell}>{service.category.name}</Text>
                  <Text style={styles.tableCell}>{service.price}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Vehicles Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Registered Vehicles</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>License Plate</Text>
                <Text style={styles.tableCell}>Make</Text>
                <Text style={styles.tableCell}>Model</Text>
                <Text style={styles.tableCell}>Owner</Text>
              </View>
              {data.vehicles.map((vehicle, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{vehicle.licensePlate}</Text>
                  <Text style={styles.tableCell}>{vehicle.make}</Text>
                  <Text style={styles.tableCell}>{vehicle.model}</Text>
                  <Text style={styles.tableCell}>{vehicle.owner.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Bookings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Service</Text>
                <Text style={styles.tableCell}>Customer</Text>
                <Text style={styles.tableCell}>Date</Text>
                <Text style={styles.tableCell}>Status</Text>
              </View>
              {data.bookingServices.map((booking, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{booking.service.name}</Text>
                  <Text style={styles.tableCell}>{booking.user.name}</Text>
                  <Text style={styles.tableCell}>{new Date(booking.bookedDate).toLocaleDateString()}</Text>
                  <Text style={styles.tableCell}>{booking.status}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Payments Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Summary</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Transaction ID</Text>
                <Text style={styles.tableCell}>Amount</Text>
                <Text style={styles.tableCell}>Status</Text>
                <Text style={styles.tableCell}>Date</Text>
              </View>
              {data.payments.map((payment, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{payment.transactionId.substring(20)}</Text>                  
                  <Text style={styles.tableCell}>{payment.amount}</Text>
                  <Text style={styles.tableCell}>{payment.paymentStatus}</Text>
                  <Text style={styles.tableCell}>{new Date(payment.paymentDate).toLocaleDateString()}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

