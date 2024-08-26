import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signOut } from "next-auth/react"
import { LogOutIcon } from "lucide-react"

const LogoutDialog = () => {
  const handleLogoutClick = () => signOut()
  return (
    <>
      <DialogHeader className="flex items-center justify-center">
        <DialogTitle>Sair da Conta</DialogTitle>
        <DialogDescription>Quer realmente sair da sua conta?</DialogDescription>

        <Button className="w-[50%]" onClick={handleLogoutClick}>
          <LogOutIcon className="mr-2" />
          Sair
        </Button>
      </DialogHeader>
    </>
  )
}

export default LogoutDialog
