export function validateEnvironment() {
  const criticalVars = {
    development: ["MONGODB_URI", "NEXT_PUBLIC_STRAPI_URL"],
    production: ["MONGODB_URI", "NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_STRAPI_URL", "STRAPI_TOKEN"],
  };

  const env = process.env.NODE_ENV || "development";
  const requiredVars = criticalVars[env] || criticalVars.development;

  console.log(`Validating environment variables for ${env} environment...`);
  console.log(`Required variables: ${requiredVars.join(", ")}`);
  console.log(
    `Current values: ${requiredVars.map(varName => (process.env[varName] ? "set" : "unset")).join(", ")}`
  );
  // console.log(`Missing variables: ${missing.join(", ")}`);

  const missing = requiredVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    console.error(`Missing critical environment variables: ${missing.join(", ")}`);
    if (env === "production") {
      throw new Error("Missing critical environment variables");
    }
  }
}
