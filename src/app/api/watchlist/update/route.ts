import { Watchlist } from "@prisma/client";
import { NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

interface Body {
  tmdbId: string;
  type: "MOVIE" | "SERIES";
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
      const data = await prisma.watchlist.update({
        where: {
          tmdbId: res.tmdbId,
        },
        data: {
          imdbId: String(details.imdb_id),
          tmdbId: String(details.id),
          title: details.title,
          poster: `https://image.tmdb.org/t/p/original${details.poster_path}`,
          year: details.release_date,
          rating: details.vote_average,
          description: details.overview,
          genres: details.genres.map((genre: { id: number; name: string }) =>
            String(genre.id)
          ),
        },
      });

      return NextResponse.json({
        success: true,
        data,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        error,
      });
    }
  } else if (res.type === "SERIES") {
    const { imdb_id: imdbId } = await getIMDbId(res.tmdbId, res.type);

    try {
      const data = await prisma.watchlist.update({
        where: {
          tmdbId: res.tmdbId,
        },
        data: {
          imdbId: String(imdbId),
          tmdbId: String(details.id),
          title: details.name,
          poster: `https://image.tmdb.org/t/p/original${details.poster_path}`,
          year: details.first_air_date,
          rating: details.vote_average,
          description: details.overview,
          genres: details.genres.map((genre: { id: number; name: string }) =>
            String(genre.id)
          ),
        },
      });

      return NextResponse.json({
        data,
        success: true,
      });
    } catch (error) {
      return NextResponse.json({
        error,
        success: false,
      });
    }
  } else {
    return NextResponse.json({
      success: false,
      error: "Please provide a valid type (MOVIE or SERIES)",
    });
  }
}
