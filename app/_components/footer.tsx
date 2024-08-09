import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="textgray-400 text-sm">© 2023 Copyright FSW Barber</p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
