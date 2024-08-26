import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel"
import Search from "../_components/search"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    // TODO: Redirect to login page
    return notFound()
  }
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
  return (
    <>
      <div>
        <Header />
        <div className="absolute left-96 top-8 w-[40%] mobile:hidden laptop:block">
          <Search />
        </div>
      </div>
      <div className="mobile:p-5 laptop:p-24">
        <h1 className="text-center text-xl font-bold">Agendamentos</h1>
        <div className="flex flex-col items-center justify-center">
          {confirmedBookings.length > 0 && (
            <div className="mobile:hidden laptop:block">
              <h2 className="mt-10 text-sm font-bold uppercase text-gray-400">
                Confirmados
              </h2>

              <Carousel className="flex max-h-[350px] w-[400px]">
                <CarouselContent>
                  {confirmedBookings.map((booking) => (
                    <>
                      <CarouselItem key={booking.id}>
                        <BookingItem
                          key={booking.id}
                          booking={JSON.parse(JSON.stringify(booking))}
                        />
                      </CarouselItem>
                    </>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
          {concludedBookings.length > 0 && (
            <div className="mobile:hidden laptop:block">
              <h2 className="mt-10 text-sm font-bold uppercase text-gray-400">
                Concluidos
              </h2>

              <Carousel className="flex w-[400px]">
                <CarouselContent>
                  {concludedBookings.map((booking) => (
                    <>
                      <CarouselItem>
                        <BookingItem
                          key={booking.id}
                          booking={JSON.parse(JSON.stringify(booking))}
                        />
                      </CarouselItem>
                    </>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </div>

        {confirmedBookings.length > 0 && (
          <div className="w-[350px] mobile:block laptop:hidden">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}

        {concludedBookings.length > 0 && (
          <div className="w-[350px] mobile:block laptop:hidden">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Bookings
