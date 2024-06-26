import { PaymentStore, type Payment } from "./paymentStore";

export async function findPayment(id: string): Promise<Payment | undefined> {
  const payments = await PaymentStore.getPaymentsFromStore();
  return payments.find((payment) => payment.id === id);
}

export async function getAllPayments(): Promise<Payment[]> {
  const payments = await PaymentStore.getPaymentsFromStore();
  await PaymentStore.checkForFraudulentPayments();
  return payments;
}

export * as PaymentService from "./paymentService";

