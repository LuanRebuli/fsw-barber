import BarbershopItem from "../_components/barbershop-item-mobile"
import BarbershopItemPc from "../_components/barbershop-item-pc"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.title || searchParams?.service}
          &quot;
        </h2>
        <div className="mobile:hidden laptop:block">
          <div className="mb-10 grid gap-4 mobile:grid-cols-2 laptop:grid-cols-3">
            {barbershops.map((barbershop) => (
              <BarbershopItemPc key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
        <div className="mobile:block laptop:hidden">
          <div className="mb-10 grid gap-4 mobile:grid-cols-2 laptop:grid-cols-3">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
