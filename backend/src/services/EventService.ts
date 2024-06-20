import { AppDataSource } from "@/database";
import { Event } from "@/database/entity/Event";

interface CreatePayload {
  userId: number;
  title: string;
  date: string;
  bookId: number;
  duration: string;
}

export default class EventService {
  private static readonly repository = AppDataSource.getRepository(Event);

  public static async createEvent(payload: CreatePayload) {
    console.log(payload);
    // return await EventService.repository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Event)
    //   .values({
    //     title: payload.title,
    //     date: payload.date,
    //     author: payload.userId,
    //     duration: payload.duration,
    //     book: payload.bookId,
    //     members_count: 0,
    //   })
    //   .execute();
  }

  public static async getByBook(bookQuery: string | null) {
    if (!bookQuery) return [];

    return await EventService.repository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.book", "books")
      .where("LOWER(books.title) LIKE LOWER(:q)", { q: `%${bookQuery}%` })
      .getMany();
  }
}
