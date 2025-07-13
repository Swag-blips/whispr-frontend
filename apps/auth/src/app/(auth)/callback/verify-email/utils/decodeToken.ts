export function decodeJwt(token: string) {
  const [header, payload, signature] = token.split(".");
  const decodedHeader = JSON.parse(atob(header));
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload.email || null;
}
