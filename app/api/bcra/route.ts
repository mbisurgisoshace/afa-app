import { NextRequest, NextResponse } from "next/server";
import BcraDataParser, {
  BcraDataResponse,
  BcraResultChequesResponse,
} from "@/lib/bcra/BcraDataParser";

export async function GET(request: NextRequest) {
  let parsedData;
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  try {
    const UIF_SO_API = `${process.env.UIF_API_URL}/api/sujetoObligado/consulta/30548203445`;
    const BCRA_DATA_API = `${process.env.BCRA_API_URL}/centraldedeudores/v1.0/Deudas/20338992557`;
    const BCRA_DATA_HISTORICO_API = `${process.env.BCRA_API_URL}/centraldedeudores/v1.0/Deudas/Historicas/20338992557`;
    const BCRA_DATA_CHEQUES_HISTORICO_API = `${process.env.BCRA_API_URL}/centraldedeudores/v1.0/Deudas/ChequesRechazados/30548203445`;

    const uifRequest = await fetch(UIF_SO_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const bcraRequest = await fetch(BCRA_DATA_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const bcraHistoricoRequest = await fetch(BCRA_DATA_HISTORICO_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const chequesRequest = await fetch(BCRA_DATA_CHEQUES_HISTORICO_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const uifResponse = await uifRequest.json();
    const bcraResponse: BcraDataResponse = await bcraRequest.json();
    const bcraHistoricoResponse: BcraDataResponse =
      await bcraHistoricoRequest.json();
    const chequesResponse: BcraResultChequesResponse =
      await chequesRequest.json();

    const bcraDataParser = new BcraDataParser(
      bcraResponse,
      bcraHistoricoResponse,
      chequesResponse,
      uifResponse
    );

    parsedData = bcraDataParser.getParsedData();
  } catch (err) {
    console.log("err", err);
  }

  return NextResponse.json({ parsedData });
}
