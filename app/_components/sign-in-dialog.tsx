import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>

        <Button
          variant="outline"
          className="gap-1 font-bold"
          onClick={handleLoginWithGoogleClick}
        >
          <Image src="/Google.svg" alt="google icon" width={18} height={18} />
          Google
        </Button>
      </DialogHeader>
    </>
  )
}

export default SignInDialog
