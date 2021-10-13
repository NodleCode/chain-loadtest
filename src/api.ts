import { ApiPromise, WsProvider } from "@polkadot/api";

export async function getApi(ws: string): Promise<ApiPromise> {
  const provider = new WsProvider(ws);

  return await ApiPromise.create({
    provider,
    types: {
      CertificateId: "AccountId",
      Application: {
        candidate: "AccountId",
        candidate_deposit: "Balance",
        metadata: "Vec<u8>",
        challenger: "Option<AccountId>",
        challenger_deposit: "Balance",
        votes_for: "Balance",
        voters_for: "Vec<(AccountId, Balance)>",
        votes_against: "Balance",
        voters_against: "Vec<(AccountId, Balance)>",
        created_block: "BlockNumber",
        challenged_block: "BlockNumber",
      },
      RootCertificate: {
        owner: "AccountId",
        key: "CertificateId",
        created: "BlockNumber",
        renewed: "BlockNumber",
        revoked: "bool",
        validity: "BlockNumber",
        child_revocations: "Vec<CertificateId>",
      },
      Amendment: "Call",
      VestingScheduleOf: {
        start: "BlockNumber",
        period: "BlockNumber",
        period_count: "u32",
        per_period: "Balance",
      },
      VestingSchedule: {
        start: "BlockNumber",
        period: "BlockNumber",
        period_count: "u32",
        per_period: "Balance",
      },
    },
    rpc: {
      rootOfTrust: {
        isRootCertificateValid: {
          description: "Verify if a root certificate is valid",
          params: [
            {
              name: "cert",
              type: "CertificateId",
            },
          ],
          type: "bool",
        },
        isChildCertificateValid: {
          description: "Verify if a child and root certificates are valid",
          params: [
            {
              name: "root",
              type: "CertificateId",
            },
            {
              name: "child",
              type: "CertificateId",
            },
          ],
          type: "bool",
        },
      },
    },
  });
}
