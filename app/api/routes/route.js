import { NextResponse } from "next/server"
export async function GET(request) {
const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "London";
  const key = process.env.WEATHERAPI_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(city)}&aqi=no`

    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json( data )
}
