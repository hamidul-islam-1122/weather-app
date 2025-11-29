import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "London";
  const days = parseInt(searchParams.get("days"), 10) || 0;
  const key = process.env.WEATHERAPI_KEY;

  const endpoint = days > 0 ? "forecast.json" : "current.json";
  const params = days > 0 ? `&days=${days}&aqi=no&alerts=no` : `&aqi=no`;
  const url = `https://api.weatherapi.com/v1/${endpoint}?key=${key}&q=${encodeURIComponent(city)}${params}`;

  const res = await fetch(url);
  const text = await res.text();
  const data = JSON.parse(text);
  return NextResponse.json(data);
}
