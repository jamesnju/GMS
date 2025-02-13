import { getCategoryServiceById, getServiceById } from '@/actions/Services';
import EditService from '@/Globalcomponents/admin/manageSerives/EditService';
import EditServiceCategory from '@/Globalcomponents/admin/manageSerives/EditServiceCategory';
import React from 'react';

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const {id} = await params; // ✅ Fix: params is NOT a Promise

  const service = await getServiceById(id);
  const category = await getCategoryServiceById(id);

  console.log(service, category, "Fetched Data"); // Debugging

  return (
    <div>
      {service && Object.keys(service).length > 0 ? (
        <EditService booking={service} categories={category || []} />
      ) : (
        <EditServiceCategory initialData={category || []} />
      )}
    </div>
  );
};

export default Page;
