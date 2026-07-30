import api from "./api";

export interface Alert {
  id: number;
  symbol: string;
  condition: string;
  target_price: number;
}

export interface CreateAlertRequest {
  symbol: string;
  condition: string;
  target_price: number;
}

export const getAlerts = async (): Promise<Alert[]> => {
  console.log("➡️ GET /alerts");

  const response = await api.get("/alerts");

  console.log(response.data);

  return response.data;
};

export const createAlert = async (
  data: CreateAlertRequest
): Promise<Alert> => {

  console.log("➡️ POST /alerts");
  console.log(data);

  const response = await api.post("/alerts", data);

  console.log(response.data);

  return response.data;
};

export const deleteAlert = async (id: number) => {

  console.log("➡️ DELETE /alerts/" + id);

  await api.delete(`/alerts/${id}`);
};