import { describe, it, vi } from "vitest";
import { PaymentController } from "../src/paymentController";
import { Payment } from "../src/paymentStore";

describe("PaymentController", () => {
  it("checks getting a payment via mocking", async ({ expect }) => {
    const testPayment: Payment = {
      id: "0000001",
      amount: 100,
      description: "money printer go brrr",
    };

    vi.mock("../src/paymentService", () => {
      return {
        findPayment: vi.fn().mockResolvedValue({
          id: "0000001",
          amount: 100,
          description: "money printer go brrr",
        }),
      };
    });

    const payment = await PaymentController.getPayment("000001");

    expect(payment).toEqual(testPayment);
  });

  it("checks getting all payments via mocking", async ({ expect }) => {
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

    vi.mock("../src/paymentService", () => {
      return {
        getAllPayments: vi.fn().mockResolvedValue([
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
        ]),
      };
    });

    const payment = await PaymentController.getPayments();

    expect(payment).toEqual(expectedPayments);
  });
});
