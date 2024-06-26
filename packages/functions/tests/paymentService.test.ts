import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { PaymentService } from "../src/paymentService";
import { type Payment, PaymentStore } from "../src/paymentStore";

const testPayment: Payment = {
  id: "000000",
  amount: 0,
  description: "Test payment for retrieval in tests",
};
const testPayments = [testPayment];

describe("PaymentService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("checks getting all notes", async ({ expect }) => {
    vi.spyOn(PaymentStore, "getPaymentsFromStore").mockResolvedValue(
      testPayments
    );

    const actualPayments = await PaymentService.getAllPayments();

    expect(actualPayments).toEqual(testPayments);
  });

  it("checks getting a note via spying", async ({ expect }) => {
    vi.spyOn(PaymentStore, "getPaymentsFromStore").mockResolvedValue(
      testPayments
    );

    const actualNote = await PaymentService.findPayment(testPayment.id);

    expect(actualNote).toEqual(testPayment);
  });
});
