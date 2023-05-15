import { prisma } from "@/server/db";
import { env } from "@/env.mjs";
import { NextResponse } from "next/server";

interface Body {
  imdbId: string;
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

  async function getDetails(imdbId: string) {
    const url = `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`;
    const data = await fetch(url, options);
    return await data.json();
  }

  const res: Body[] = await request.json();

  const errors: string[] = [];

  res.forEach(async (title) => {
    const details = await getDetails(title.imdbId);

    console.log(details);
    if (details.tv_results.length > 0) {
      try {
        const data = await prisma.watchlist.create({
          data: {
            imdbId: String(title.imdbId),
            tmdbId: String(details.tv_results[0].id),
            title: details.tv_results[0].name,
            poster: `https://image.tmdb.org/t/p/original${details.tv_results[0].poster_path}`,
            year: details.tv_results[0].first_air_date,
            rating: details.tv_results[0].vote_average,
            description: details.tv_results[0].overview,
            type: "SERIES",
            status: title.status,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
        errors.push(title.imdbId);
      }
    } else if (details.movie_results.length > 0) {
      try {
        const data = await prisma.watchlist.create({
          data: {
            imdbId: String(title.imdbId),
            tmdbId: String(details.movie_results[0].id),
            title: details.movie_results[0].title,
            poster: `https://image.tmdb.org/t/p/original${details.movie_results[0].poster_path}`,
            year: details.movie_results[0].release_date,
            rating: details.movie_results[0].vote_average,
            description: details.movie_results[0].overview,
            type: "MOVIE",
            status: title.status,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
        errors.push(title.imdbId);
      }
    }
  });

  return NextResponse.json({
    success: true,
    errors,
  });
}
