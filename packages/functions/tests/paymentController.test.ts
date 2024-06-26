import { describe, it, vi } from "vitest";
import { PaymentController } from "../src/paymentController";
import { Payment } from "../src/paymentStore";
import FakeFlags from "./fakeFlags";
import { PaymentService } from "../src/paymentService";
import { mockDeep } from "vitest-mock-extended";

describe("PaymentController", () => {
  it("checks getting a payment via hoisting", async ({ expect }) => {
    const mockedPaymentService = mockDeep<PaymentService>({
      fallbackMockImplementation: () => {
        throw new Error("A called method was not mocked");
      },
    });
    const fakeFlags = new FakeFlags();

    const paymentController = new PaymentController(
      mockedPaymentService,
      fakeFlags
    );

    const testPayment: Payment = {
      id: "000000",
      amount: 100,
      description: "money printer go brrr",
    };

    mockedPaymentService.findPayment.mockResolvedValue(testPayment);

    const payment = await paymentController.getPayment(testPayment.id);

    expect(payment).toEqual(testPayment);
  });

  it("checks getting all payments via hoisting", async ({ expect }) => {
    const mockedPaymentService = mockDeep<PaymentService>({
      fallbackMockImplementation: () => {
        throw new Error("A called method was not mocked");
      },
    });

    const fakeFlags = new FakeFlags();
    fakeFlags.setGlobalFlagValue("disabledFlag", true);

    const paymentController = new PaymentController(
      mockedPaymentService,
      fakeFlags
    );

    const expectedPayments: Payment[] = [
      {
        id: "000001",
        amount: 100,
        description: "money printer go brrr",
      },
      {
        id: "000002",
        amount: 420,
        description: "lol",
      },
    ];

    mockedPaymentService.getAllPayments.mockResolvedValue(expectedPayments);

    const payment = await paymentController.getPayments();

    expect(payment).toEqual(expectedPayments);
  });
});
