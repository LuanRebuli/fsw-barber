import { db } from "./_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"

import BarbershopItemPc from "./_components/barbershop-item-pc"
import BarbershopItemMobile from "./_components/barbershop-item-mobile"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"

import Image from "next/image"
import Link from "next/link"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
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
    : []

  return (
    <div>
      {/* Header da Pagina */}
      <Header />

      <div className="relative p-5">
        {/* Imagem Desktop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner-03.jpeg"
            alt="Barbeiro Cortando Barba"
            width={1700}
            height={550}
            className="h-[550px] w-full object-cover grayscale mobile:hidden laptop:block"
            style={{ objectPosition: "70% 30%" }}
          />
        </div>

        <div className="laptop:ml-16">
          {/* Mensagem de Olá */}
          <div className="relative z-10 mobile:mt-2 laptop:mt-16">
            <h2 className="font-bold mobile:text-xl laptop:text-2xl">
              Olá, {session?.user ? session.user.name : "bem-vindo!"}
            </h2>
            <p className="mobile:text-base laptop:text-lg">
              <span className="capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              {format(new Date(), " 'de' MMMM", { locale: ptBR })}
            </p>

            <div className="flex">
              <div className="flex flex-col">
                {/* Menu de Pesquisa */}
                <div className="mobile:mt-2 mobile:w-full laptop:mt-12 laptop:w-[391px]">
                  <Search />
                </div>

                {/* Agendamentos Desktop*/}
                {confirmedBookings.length > 0 && (
                  <div className="mobile:hidden laptop:block">
                    <h2 className="mt-10 text-sm font-bold uppercase text-gray-400">
                      Agendamentos
                    </h2>

                    <Carousel className="flex gap-3">
                      <CarouselContent>
                        {confirmedBookings.map((booking) => (
                          <>
                            <CarouselItem key={booking.id} className="w-full">
                              <BookingItem
                                key={booking.id}
                                booking={JSON.parse(JSON.stringify(booking))}
                              />
                            </CarouselItem>
                          </>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />

                      {confirmedBookings.length > 1 && <CarouselNext />}
                    </Carousel>
                  </div>
                )}
              </div>
              {/* Recomendados da parte Desktop */}
              <div className="relative bottom-28 ml-32 mobile:hidden laptop:block">
                <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400 mobile:invisible laptop:visible">
                  Recomendados
                </h2>
                <Carousel className="flex w-[830px] mobile:invisible laptop:visible">
                  <CarouselContent>
                    {barbershops.map((barbershop) => (
                      <>
                        <CarouselItem className="ml-3 flex basis-1/3">
                          <BarbershopItemPc
                            key={barbershop.id}
                            barbershop={barbershop}
                          />
                        </CarouselItem>
                      </>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>

          <div>
            {/* Quick Search Mobile */}
            <div className="mt-5 flex gap-3 overflow-x-scroll mobile:visible laptop:hidden [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button
                  className="gap-2 laptop:h-[36px] laptop:w-[40px]"
                  variant="secondary"
                  key={option.title}
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      width={16}
                      height={16}
                      alt={option.title}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            {/* IMAGEM MOBILE */}
            <div className="relative mt-6 h-[150px] w-full mobile:block laptop:hidden">
              <Image
                alt="Agende nos melhores com FSW Barber"
                src="/banner-01.png"
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {/* Agendamentos Mobile*/}
            {confirmedBookings.length > 0 && (
              <div className="mobile:block laptop:hidden">
                <h2 className="mt-6 text-xs font-bold uppercase text-gray-400">
                  Agendamentos
                </h2>
                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TODO: componentizar esses itens de Recomendação, Populares, Mais Visitados */}
            <div className="mobile:block laptop:hidden">
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Recomendados
              </h2>
              <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) => (
                  <BarbershopItemMobile
                    key={barbershop.id}
                    barbershop={barbershop}
                  />
                ))}
              </div>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Populares
              </h2>
              <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                {popularBarbershops.map((barbershop) => (
                  <BarbershopItemMobile
                    key={barbershop.id}
                    barbershop={barbershop}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
