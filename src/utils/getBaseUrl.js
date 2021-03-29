export default function (req) {
  const protocol = req.headers["x-forwared-proto"] || "http";
  const host = req.headers.host;

  return `${protocol}://${host}`;
}
