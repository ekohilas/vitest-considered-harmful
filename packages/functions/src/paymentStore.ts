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
