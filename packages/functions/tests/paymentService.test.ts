import { describe, it, vi } from "vitest";
import { PaymentService } from "../src/paymentService";
import { PaymentStore, type Payment } from "../src/paymentStore";
import { mockDeep } from "vitest-mock-extended";

const testPayment: Payment = {
  id: "000000",
  amount: 0,
  description: "Test payment for retrieval in tests",
};
const testPayments = [testPayment];

describe("PaymentService", () => {
  it("checks getting all payments", async ({ expect }) => {
    const mockedPaymentStore = mockDeep<PaymentStore>({
      fallbackMockImplementation: () => {
        throw new Error("A called method was not mocked");
      },
    });

    const paymentService = new PaymentService(mockedPaymentStore);

    mockedPaymentStore.getPaymentsFromStore.mockResolvedValue(testPayments);

    const actualPayments = await paymentService.getAllPayments();

    expect(actualPayments).toEqual(testPayments);
  });

  it("checks getting a payment", async ({ expect }) => {
    const mockedPaymentStore = mockDeep<PaymentStore>({
      fallbackMockImplementation: () => {
        throw new Error("A called method was not mocked");
      },
    });

    const paymentService = new PaymentService(mockedPaymentStore);

    mockedPaymentStore.getPaymentsFromStore.mockResolvedValue(testPayments);

    const actualPayment = await paymentService.findPayment(testPayment.id);

    expect(actualPayment).toEqual(testPayment);
  });
});
