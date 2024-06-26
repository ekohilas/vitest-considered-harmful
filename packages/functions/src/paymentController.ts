import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import FeatureFlags from "./flags/featureFlags";
import { PaymentService } from "./paymentService";
import { PaymentStore } from "./paymentStore";
import { getFlagsFromStore } from "./flags/flagsStore";
import Flags from "./flags/flags";

export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private featureFlags: Flags 
  ) {}

  async getPayment(id: string) {
    // Some additional security logic.
    return await this.paymentService.findPayment(id);
  }

  async getPayments() {
    const getPaymentsEnabled = await this.featureFlags.isFeatureFlagEnabled(
      "disabledFlag"
    );
    if (!getPaymentsEnabled) {
      throw new Error("Get payments feature is disabled.");
    }
    return await this.paymentService.getAllPayments();
  }

  async handleEvent(
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
      const payment = await this.getPayment(paymentId);
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

    const payments = await this.getPayments();
    return Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(payments),
    });
  }

  static buildController() {
    const featureFlags = new FeatureFlags(getFlagsFromStore);
    const paymentStore = new PaymentStore();
    const paymentService = new PaymentService(paymentStore);
    const paymentController = new PaymentController(
      paymentService,
      featureFlags
    );
    return paymentController;
  }
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const paymentController = PaymentController.buildController();
  return paymentController.handleEvent(event);
};
