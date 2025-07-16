export function decodeJwt(token: string) {
  const [ payload] = token.split(".");

  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload.email || null;
}
