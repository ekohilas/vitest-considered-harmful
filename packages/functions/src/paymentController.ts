import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import FeatureFlags from "./flags/featureFlags";
import { PaymentService } from "./paymentService";

export async function getPayment(id: string) {
  // Some additional security logic.
  return await PaymentService.findPayment(id);
}

export async function getPayments() {
  const featureFlags = FeatureFlags.getInstance();
  const getPaymentsEnabled = await featureFlags.isFeatureFlagEnabled(
    "disabledFlag"
  );
  if (!getPaymentsEnabled) {
    throw new Error("Get payments feature is disabled.");
  }
  return await PaymentService.getAllPayments();
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

  const payments = await getPayments();
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(payments),
  });
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  return handleEvent(event);
};

export * as PaymentController from "./paymentController";
