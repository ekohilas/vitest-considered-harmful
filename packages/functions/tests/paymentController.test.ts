import { describe, it, vi } from "vitest";
import { PaymentController } from "../src/paymentController";
import { Payment } from "../src/paymentStore";

describe("PaymentController", () => {
  it("checks getting a payment in integration", async ({ expect }) => {
    const testPayment: Payment = {
      id: "000001",
      amount: 100,
      description: "money printer go brrr",
    };

    const payment = await PaymentController.getPayment(testPayment.id);

    expect(payment).toEqual(testPayment);
  });
});
