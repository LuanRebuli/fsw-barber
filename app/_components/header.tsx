import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Calendar, CircleUserRound, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="laptop:p-9 mobile:p-5 flex flex-row items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            className="laptop:ml-32"
            height={22}
            width={132}
            alt="FSW Barber"
          />
        </Link>
        <Sheet>
          <SheetTrigger className="flex justify-center">
            {/* Apenas um botão para o menu */}
            <Button
              size="icon"
              variant="outline"
              className="mobile:block laptop:hidden"
            >
              <MenuIcon />
            </Button>
            <Link href={"/bookings"}>
              <Button
                size="default"
                variant="secondary"
                className="mobile:hidden laptop:flex mr-6 items-center"
              >
                <Calendar className="mr-2" />
                <span>Agendamentos</span>
              </Button>
            </Link>
            {/* Botão de perfil */}
            <Button
              size="default"
              variant="default"
              className="mobile:hidden laptop:flex mr-32 items-center"
            >
              <CircleUserRound className="mr-2" />
              <span>Perfil</span>
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
