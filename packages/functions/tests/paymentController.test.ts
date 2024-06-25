import { describe, it, vi } from "vitest";
import { PaymentController } from "../src/paymentController";
import { Payment } from "../src/paymentStore";

const mockedFindPayment = vi.hoisted(() => vi.fn());
const mockedGetAllPayments = vi.hoisted(() => vi.fn());

vi.mock("../src/paymentService", () => {
  return {
    findPayment: mockedFindPayment,
    getAllPayments: mockedGetAllPayments,
  }
});

describe("PaymentController", () => {
  it("checks getting a payment via hoisting", async ({ expect }) => {
    const testPayment: Payment = {
      id: "000000",
      amount: 100,
      description: "money printer go brrr",
    };

    mockedFindPayment.mockResolvedValue(testPayment);

    const payment = await PaymentController.getPayment(testPayment.id);

    expect(payment).toEqual(testPayment);
  });

  it("checks getting all payments via hoisting", async ({ expect }) => {
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

    mockedGetAllPayments.mockResolvedValue(expectedPayments);

    const payment = await PaymentController.getPayments();

    expect(payment).toEqual(expectedPayments);
  });
});
