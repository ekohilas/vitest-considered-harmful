export interface Payment {
  id: string;
  description: string;
  amount: number;
}

const payments: Payment[] = [
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

export async function getPaymentsFromStore(): Promise<Payment[]> {
  console.log("simulate issues with talking to a real dependency");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return payments;
}

export async function checkForFraudulentPayments() {
  console.log("checking for sus payments...");
  await new Promise((resolve) => setTimeout(resolve, 2 * 1000));
  console.log("it's a very long and difficult process. trust.");
  await new Promise((resolve) => setTimeout(resolve, 2 * 1000));
  console.log("that was sweaty!");
}

export * as PaymentStore from "./paymentStore";
