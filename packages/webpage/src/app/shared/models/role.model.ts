export interface Role {
  id: string;
  name: string;
  defaultForClinic?: boolean;
  defaultForSalesRep?: boolean;
  isAdmin?: boolean;
}
