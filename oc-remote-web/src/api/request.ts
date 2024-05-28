import axios, { HttpStatusCode } from "axios";
import type { Method } from "axios";
import { Result } from "./types/entity";
import { ElMessage } from "element-plus";
const instance = axios.create({
  baseURL: "http://localhost:125/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000,
});

export async function request<T>(
  method: Method,
  url: string,
  data?: Object
): Promise<Result<T>> {
  let Result: Result<T> = {
    success: false,
    message: "网络错误",
    data: null,
  };
  try {
    let response = await instance.request({
      url: url,
      method: method,
      params: method == "GET" ? data : {},
      data: method != "GET" ? data : {},
    });
    if (response.status == HttpStatusCode.Ok) {
      Result.success = true;
      Result.data = response.data;
      Result.message = "OK";
    }
  } catch (err) {
    console.error(err);
  }
  if (!Result.success) {
    ElMessage({
      type: "error",
      message: "网络错误!",
    });
  }
  return Result;
}
export function getInstance() {
  return instance;
}
