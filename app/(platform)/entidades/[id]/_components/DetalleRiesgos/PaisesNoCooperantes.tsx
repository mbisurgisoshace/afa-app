import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

export default function PaisesNoCooperantes() {
  return (
    <div className="w-[500px]">
      <Card>
        <CardHeader>
          <CardTitle>
            Cantidad de Vinculaciones con Paises No Cooperantes
          </CardTitle>
        </CardHeader>
        <CardContent className="flex  justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-red-500">2</span>
            <span className="text-xs text-muted-foreground">
              Fecha ultimo cotejo: 01/01/2024
            </span>
          </div>
          <Button size={"xs"} className="self-end">
            Cotejar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
