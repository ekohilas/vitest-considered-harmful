import { PaymentStore, type Payment } from "./paymentStore";

export class PaymentService {
  constructor(private paymentStore: PaymentStore) {}

  public async findPayment(id: string): Promise<Payment | undefined> {
    const payments = await this.paymentStore.getPaymentsFromStore();
    return payments.find((payment) => payment.id === id);
  }

  public async getAllPayments(): Promise<Payment[]> {
    const payments = await this.paymentStore.getPaymentsFromStore();
    await this.paymentStore.checkForFraudulentPayments();
    return payments;
  }
}
