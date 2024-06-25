import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { findPayment } from "./paymentService";

export async function getPayment(id: string) {
  // Some additional security logic.
  return await findPayment(id);
}

async function handleEvent(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  if (event.queryStringParameters === undefined) {
    return Promise.resolve({
      statusCode: 200,
      body: "No query parameters provided.",
    });
  }

  const paymentId = event.queryStringParameters["paymentId"];
  if (paymentId !== undefined) {
    const payment = await getPayment(paymentId);
    if (payment === undefined) {
      return {
        statusCode: 401,
        body: "Payment not found.",
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(payment),
    };
  }

  return Promise.resolve({
    statusCode: 200,
    body: "Unsupported query.",
  });
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return handleEvent(event);
};

export * as PaymentController from "./paymentController";
