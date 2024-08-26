"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Calendar, CircleUserRound, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import { useSession } from "next-auth/react"
import LogoutDialog from "./logout-dialog"

const Header = () => {
  const { data } = useSession()

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between mobile:p-5 laptop:p-8">
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
          <SheetTrigger className="flex justify-center mobile:block laptop:hidden">
            {/* Apenas um ícone para o menu */}
            <div className="flex items-center justify-center">
              <MenuIcon className="relative left-2 cursor-pointer" />
            </div>
          </SheetTrigger>

          <SidebarSheet />

          <div className="flex items-center justify-between mobile:hidden laptop:block">
            {/* Botão de perfil Desktop*/}
            <div className="flex items-center justify-between gap-3">
              {data?.user ? (
                <>
                  {/* Botão de Agendamentos Desktop */}
                  <Link href={"/bookings"}>
                    <Button
                      size="default"
                      variant="secondary"
                      className="mr-6 items-center mobile:hidden laptop:flex"
                    >
                      <Calendar className="mr-2" />
                      <span>Agendamentos</span>
                    </Button>
                  </Link>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="mr-4 flex items-center gap-2"
                        variant={"ghost"}
                      >
                        <Avatar>
                          <AvatarImage src={data?.user?.image ?? ""} />
                        </Avatar>

                        <div>
                          <p className="font-bold">{data.user.name}</p>
                          <p className="text-xs">{data.user.email}</p>
                        </div>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%]">
                      <LogoutDialog />
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <>
                  {/* Logar na Conta */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="default"
                        variant="default"
                        className="mr-32 items-center mobile:hidden laptop:flex"
                      >
                        <CircleUserRound className="mr-2" />
                        <h2 className="font-bold">Perfil</h2>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%]">
                      <SignInDialog />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
