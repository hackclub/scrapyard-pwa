import { basePath } from "@/next.config";
import API from "@api-blueprints/pathmaker";

export default new API({
  baseUrl: "/api",
  headers: {
    ["X-API-Client"]: "scrapyard-web|lib/api",
    ["Content-Type"]: "application/json"
  }
});
