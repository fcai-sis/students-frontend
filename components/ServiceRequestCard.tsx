import { CreatedAt } from "./CreatedAt";
import ServiceRequestCardImage from "./ServiceRequestCardImage";

export default async function ServiceRequestCard({
  serviceRequest,
}: {
  serviceRequest: any;
}) {
  return (
    <div className={`border border-black w-64 p-4`}>
      <h3>{serviceRequest.serviceName}</h3>
      <p>
        Status: <b>{serviceRequest.status}</b>
      </p>
      {serviceRequest.message && (
        <p>
          <b>Message:</b> {serviceRequest.message}
        </p>
      )}
      <ServiceRequestCardImage src={serviceRequest.image} />
      <CreatedAt date={serviceRequest.createdAt} />
    </div>
  );
}
