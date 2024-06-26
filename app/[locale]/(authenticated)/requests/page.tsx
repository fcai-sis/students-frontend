// const url = "https://ckes.cu.edu.eg/facultypayment.aspx";

import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { SelectFilter } from "@/components/SetQueryFilter";
import { getCurrentPage } from "@/lib";
import { ServiceRequestStatusEnum } from "@fcai-sis/shared-models";
import Link from "next/link";
import { getStudentServiceRequests } from "./actions";

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: { page: string; status: string };
}>) {
  const page = getCurrentPage(searchParams);
  const limit = 2;

  const getStudentServiceRequestResponse = await getStudentServiceRequests();
  const studentServiceRequests =
    getStudentServiceRequestResponse.data?.studentServiceRequests;
  const totalRequests =
    getStudentServiceRequestResponse.data?.totalServiceRequests;

  const _filtered = studentServiceRequests.filter((serviceRequest: any) => {
    if (searchParams.status) {
      return serviceRequest.status === searchParams.status;
    }
    return true;
  });

  const _paginated = _filtered.slice((page - 1) * limit, page * limit);

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
      <Link href='/requests/create'>Create Service Request</Link>
      <SelectFilter name='status' options={statusOptions} />
      <div>
        {_paginated.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
      <Pagination totalPages={totalRequests / limit} />
    </>
  );
}
