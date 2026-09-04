export type VendorType = "Independent" | "Company";

export type ServiceOffering = "Housekeeping" | "Window Cleaning" | "Car Valet";

export type RegistrationStatus = "Onboarded" | "Rejected";

export type ServiceProvider = {
  id: number;
  email: string;
  phone: string;
  postcode: string;
  vendorType: VendorType;
  serviceOffering: ServiceOffering;
  signupDate: string;
  status: RegistrationStatus;
};

export type SortDirection = "asc" | "desc";

export type SortableColumn =
  | "email"
  | "phone"
  | "postcode"
  | "vendorType"
  | "serviceOffering"
  | "signupDate"
  | "status";

export type SortState = {
  column: SortableColumn;
  direction: SortDirection;
};

export type FilterState = {
  postcode: string;
  statuses: RegistrationStatus[];
  startDate: string;
  endDate: string;
  vendorTypes: VendorType[];
  serviceOfferings: ServiceOffering[];
};

export type ToastVariant = "success" | "error" | "info";

export type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
};
