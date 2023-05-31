import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";

interface Body {
  tmdbId: string;
  type: "MOVIE" | "SERIES";
  status: "UPCOMING" | "PENDING" | "WATCHING" | "UNFINISHED" | "FINISHED";
}

export async function POST(request: Request) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.MOVIEDB_ACCESS_KEY}`,
    },
  };

  async function getDetails(tmdbId: string, type: "MOVIE" | "SERIES") {
    const movie_url = `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`;
    const series_url = `https://api.themoviedb.org/3/tv/${tmdbId}?language=en-US`;

    const data = await fetch(
      type === "MOVIE" ? movie_url : series_url,
      options
    );

    return await data.json();
  }

  async function getIMDbId(tmdbId: string, type: "MOVIE" | "SERIES") {
    const movie_url = `https://api.themoviedb.org/3/movie/${tmdbId}/external_ids`;
    const series_url = `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids`;

    const data = await fetch(
      type === "MOVIE" ? movie_url : series_url,
      options
    );

    return await data.json();
  }

  const res: Body = await request.json();

  if (!res.tmdbId) {
    return NextResponse.json({
      success: false,
      error: "Please provide a valid tmdbid",
    });
  }

  const details = await getDetails(res.tmdbId, res.type);

  if (res.type === "MOVIE") {
    try {
      const data = await prisma.watchlist.create({
        data: {
          imdbId: String(details.imdb_id),
          tmdbId: String(details.id),
          title: details.title,
          poster: `https://image.tmdb.org/t/p/original${details.poster_path}`,
          year: details.release_date,
          rating: details.vote_average,
          description: details.overview,
          type: res.type,
          status: res.status,
          genres: details.genres.map((genre: { id: number; name: string }) =>
            String(genre.id)
          ),
        },
      });
      return NextResponse.json({
        data,
      });
    } catch (error) {
      return NextResponse.json({
        error,
      });
    }
  } else if (res.type === "SERIES") {
    const { imdb_id: imdbId } = await getIMDbId(res.tmdbId, res.type);

    try {
      const data = await prisma.watchlist.create({
        data: {
          imdbId: String(imdbId),
          tmdbId: String(details.id),
          title: details.name,
          poster: `https://image.tmdb.org/t/p/original${details.poster_path}`,
          year: details.first_air_date,
          rating: details.vote_average,
          description: details.overview,
          type: res.type,
          status: res.status,
          genres: details.genres.map((genre: { id: number; name: string }) =>
            String(genre.id)
          ),
        },
      });
      return NextResponse.json({
        data,
      });
    } catch (error) {
      return NextResponse.json({
        error,
      });
    }
  } else {
    return NextResponse.json({
      success: false,
      error: "Please provide a valid type (MOVIE or SERIES)",
    });
  }
}
