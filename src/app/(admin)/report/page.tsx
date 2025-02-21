import { getReport } from "@/actions/Report"
import ReportGenerator from "@/Globalcomponents/ReportGenerator"
export const dynamic = "force-dynamic";

const page = async() => {
  const data = await getReport() || []
  return (
    <div>
      <ReportGenerator data={data}/>
    </div>
  )
}

export default page