import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { networkInterfaces } from "node:os";
import { resolve } from "node:path";
import type { ServerOptions } from "node:https";

const CERT_DIR = "certs";
const CERT_NAME = "localhost";

const getLocalIpSans = () =>
  Object.values(networkInterfaces())
    .flatMap(interfaces => interfaces ?? [])
    .filter(networkInterface => networkInterface.family === "IPv4" && !networkInterface.internal)
    .map(networkInterface => `IP:${networkInterface.address}`);

export const createLocalHttpsConfig = (projectRoot: string): ServerOptions => {
  const certDir = resolve(projectRoot, CERT_DIR);
  const keyPath = resolve(certDir, `${CERT_NAME}-key.pem`);
  const certPath = resolve(certDir, `${CERT_NAME}-cert.pem`);

  if (!existsSync(keyPath) || !existsSync(certPath)) {
    mkdirSync(certDir, { recursive: true });

    const subjectAltName = ["DNS:localhost", "IP:127.0.0.1", "IP:::1", ...getLocalIpSans()].join(
      ","
    );

    try {
      execFileSync(
        "openssl",
        [
          "req",
          "-x509",
          "-newkey",
          "rsa:2048",
          "-nodes",
          "-keyout",
          keyPath,
          "-out",
          certPath,
          "-days",
          "365",
          "-subj",
          "/CN=localhost",
          "-addext",
          `subjectAltName=${subjectAltName}`,
        ],
        { stdio: "ignore" }
      );
    } catch (error) {
      throw new Error(
        "Failed to generate local HTTPS certificate. Please install openssl and retry.",
        {
          cause: error,
        }
      );
    }
  }

  return {
    key: keyPath,
    cert: certPath,
  };
};
