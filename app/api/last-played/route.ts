import { NextResponse } from "next/server";
import { getSpotifyLastSong } from "../../spotify-last-song";

export async function GET() {
  const spotifyLastPlayedSong = await getSpotifyLastSong();

  if (!spotifyLastPlayedSong) {
    return new NextResponse("", { status: 500 });
  }

  return NextResponse.json(spotifyLastPlayedSong);
}
