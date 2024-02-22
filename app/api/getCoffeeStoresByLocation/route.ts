import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const longLat = searchParams.get("longLat") || " ";
  const limit = searchParams.get("limit") || " ";
  try {
    if (longLat) {
      const response = await fetchCoffeeStores(longLat, Number(limit));
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(`Error: ${error}`);
  }
}
