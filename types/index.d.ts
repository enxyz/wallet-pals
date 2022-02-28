type Startup = {
  id: number;
  minter: string;
  _hash: string;
  salt: string;
  name?: string; // Empty until revealed
  revealed: boolean;
  accepted: boolean;
  createdAt: number;
};

type Recommendation = {
  minter: string;
  tokenId: number;
  startupId: number;
  season: number;
  betAmount: number;
  createdAt: number;
};

type BalanceResponseData = {
  balance: number;
};

type RecommendationResponseData = {
  recommendations: Recommendation[];
};

type TransactionResponseData = {
  transaction: string;
};

type StartupResponseData = {
  startups: Startup[];
};

type AlumniResponseData = {
  alumni: boolean;
};

type SuccessResponse = {
  success: true;
  data:
    | AlumniResponseData
    | BalanceResponseData
    | TransactionResponseData
    | StartupResponseData
    | RecommendationResponseData;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ContractResponse = SuccessResponse | ErrorResponse;
