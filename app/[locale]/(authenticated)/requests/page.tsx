// const url = "https://ckes.cu.edu.eg/facultypayment.aspx";

import { serviceRequestsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { getAccessToken, getCurrentPage } from "@/lib";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: { page: string };
}>) {
  const page = getCurrentPage(searchParams);
  const pageSize = 5;

  const accessToken = await getAccessToken();
  const getMyServiceRequestsResponse = await serviceRequestsAPI.get("/mine", {
    params: {
      page,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { serviceRequests, totalServiceRequests } =
    getMyServiceRequestsResponse.data;

  return (
    <>
      <h1>Service Requests</h1>
      <Link href="/requests/create">Create Service Request</Link>
      <div>
        {serviceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
      <Pagination
        route="/requests"
        currentPage={page}
        totalPages={totalServiceRequests / pageSize}
      />
    </>
  );
}
