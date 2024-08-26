import Header from "@/app/_components/header"
import PhoneItem from "@/app/_components/phone-item"
import Search from "@/app/_components/search"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }
  return (
    // DIV CENTRAL
    <>
      <div className="mobile:hidden laptop:block">
        <Header />
        <div className="absolute left-96 top-8 w-[40%]">
          <Search />
        </div>
      </div>
      <div className="flex laptop:mb-24 laptop:ml-32 laptop:mr-32 laptop:mt-10">
        {/* DIV CELULAR */}
        <div className="mobile:block laptop:hidden">
          <div className="relative h-[250px] w-full">
            <Image
              alt={barbershop?.name}
              src={barbershop?.imageUrl}
              fill
              className="object-cover"
            />

            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-4"
              asChild
            >
              <Link href={`/`}>
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-4"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SidebarSheet />
            </Sheet>
          </div>

          <div className="border-b border-solid p-5">
            <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>

            <div className="mb-2 flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm">{barbershop?.address}</p>
            </div>

            <div className="flex items-center gap-2">
              <StarIcon className="fill-primary text-primary" size={18} />
              <p className="text-sm">5,0 (900 avaliações)</p>
            </div>
          </div>

          <div className="space-y-3 border-b border-solid p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>

          <div className="space-y-3 border-b border-solid p-5">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="gap-2">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                  service={JSON.parse(JSON.stringify(service))}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 p-5">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>

        {/* DIV DESKTOP */}
        <div className="flex w-full flex-row mobile:hidden laptop:block">
          {/* DIV DIREITA */}
          <div className="w-1/2">
            <div className="relative h-[400px] laptop:w-[650px] desktop:w-[800px]">
              <Image
                alt={barbershop?.name}
                src={barbershop?.imageUrl}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex w-[98%] justify-between border-b border-solid p-5">
              <div className="flex flex-col">
                <h1 className="mb-3 text-2xl font-bold">{barbershop?.name}</h1>
                <div className="mb-2 flex items-center gap-2">
                  <MapPinIcon className="text-primary" size={18} />
                  <p className="text-base">{barbershop?.address}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row gap-2">
                  <StarIcon className="fill-primary text-primary" size={18} />
                  <p>5,0</p>
                </div>
                <p className="text-base"> 900 avaliações</p>
              </div>
            </div>
            <div className="space-y-3 p-5">
              <h2 className="text-base font-bold uppercase text-gray-400">
                Serviços
              </h2>
              <div className="grid w-full grid-cols-2 gap-2">
                {barbershop.services.map((service) => (
                  <div className="w-full" key={service.id}>
                    <ServiceItem
                      barbershop={JSON.parse(JSON.stringify(barbershop))}
                      service={JSON.parse(JSON.stringify(service))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* DIV ESQUERDA */}
          <Card className="absolute top-36 flex w-[27%] flex-col laptop:right-[330px] desktop:right-[380px]">
            <CardContent>
              <div className="relative mx-auto mt-10 flex h-[180px] w-[350px] items-end">
                <Image
                  alt="Mapa da barberia"
                  src="/map.png"
                  fill
                  className="rounded-xl object-cover"
                />
                <Card className="z-50 mx-5 mb-3 w-[100%] rounded-xl">
                  <CardContent className="flex items-center gap-3 px-5 py-3">
                    <Avatar>
                      <AvatarImage src={barbershop.imageUrl} />
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{barbershop.name}</h3>
                      <p className="text-sm">{barbershop.address}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-3 border-b border-solid p-5">
                <h2 className="text-lg font-bold uppercase text-gray-400">
                  Sobre nós
                </h2>
                <p className="text-justify text-base">
                  {barbershop?.description}
                </p>
              </div>
              <div className="space-y-3 p-5">
                {barbershop.phones.map((phone) => (
                  <PhoneItem key={phone} phone={phone} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default BarbershopPage
