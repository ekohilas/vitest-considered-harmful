import { getPaymentsFromStore, type Payment } from "./paymentStore";

export async function findPayment(id: string): Promise<Payment | undefined> {
  const payments = await getPaymentsFromStore();
  return payments.find((payment) => payment.id === id);
}

export async function getAllPayments(): Promise<Payment[]> {
  const payments = await getPaymentsFromStore();
  return payments;
}

