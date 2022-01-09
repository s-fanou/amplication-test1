import { ResidentWhereInput } from "./ResidentWhereInput";
import { ResidentOrderByInput } from "./ResidentOrderByInput";

export type ResidentFindManyArgs = {
  where?: ResidentWhereInput;
  orderBy?: ResidentOrderByInput;
  skip?: number;
  take?: number;
};
