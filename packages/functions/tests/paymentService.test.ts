import { describe, it, vi } from "vitest";
import { PaymentService } from "../src/paymentService";
import { type Payment } from "../src/paymentStore";

const testPayment: Payment = {
  id: "000000",
  amount: 0,
  description: "Test payment for retrieval in tests",
};
const testPayments = [testPayment];

describe("PaymentService", () => {
  it("checks getting all payments", async ({ expect }) => {
    const { PaymentStore: mockedPaymentStore } = await vi.importMock<
      typeof import("../src/paymentStore")
    >("../src/paymentStore");

    const paymentService = new PaymentService(mockedPaymentStore.prototype);

    mockedPaymentStore.prototype.getPaymentsFromStore.mockResolvedValue(
      testPayments
    );

    const actualPayments = await paymentService.getAllPayments();

    expect(actualPayments).toEqual(testPayments);
  });

  it("checks getting a payment", async ({ expect }) => {
    const { PaymentStore: mockedPaymentStore } = await vi.importMock<
      typeof import("../src/paymentStore")
    >("../src/paymentStore");

    const paymentService = new PaymentService(mockedPaymentStore.prototype);

    mockedPaymentStore.prototype.getPaymentsFromStore.mockResolvedValue(
      testPayments
    );

    const actualPayment = await paymentService.findPayment(testPayment.id);

    expect(actualPayment).toEqual(testPayment);
  });
});
