// const url = "https://ckes.cu.edu.eg/facultypayment.aspx";

import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { SelectFilter } from "@/components/SetQueryFilter";
import { dummyServiceRequests } from "@/dummy/serviceRequests";
import { fakeResponse } from "@/dummy/utils";
import { getCurrentPage } from "@/lib";
import { ServiceRequestStatusEnum } from "@fcai-sis/shared-models";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: { page: string; status: string };
}>) {
  const page = getCurrentPage(searchParams);
  const limit = 2;

  const _filtered = dummyServiceRequests.filter((serviceRequest) => {
    if (searchParams.status) {
      return serviceRequest.status === searchParams.status;
    }
    return true;
  });
  const _total = _filtered.length;

  const _paginated = _filtered.slice((page - 1) * limit, page * limit);

  const { data } = await fakeResponse({
    status: 200,
    data: {
      serviceRequests: _paginated,
      total: _total,
    },
  });

  const { serviceRequests, total } = data;

  const statusOptions = [
    { label: "All", value: "" },
    { label: "Pending", value: ServiceRequestStatusEnum[0] },
    { label: "In progress", value: ServiceRequestStatusEnum[1] },
    { label: "Completed", value: ServiceRequestStatusEnum[2] },
    { label: "Rejected", value: ServiceRequestStatusEnum[3] },
  ];

  return (
    <>
      <h1>Service Requests</h1>
      <Link href="/requests/create">Create Service Request</Link>
      <SelectFilter name="status" options={statusOptions} />
      <div>
        {serviceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
      <Pagination totalPages={total / limit} />
    </>
  );
}
